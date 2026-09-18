/**
 * Lightweight Zero-Dependency Supabase Auth & REST Client
 * Interacts with Supabase Auth REST APIs directly with JWT session management in localStorage.
 */

export interface SupabaseUser {
  id: string;
  email?: string;
  phone?: string;
  user_metadata?: {
    full_name?: string;
    enterprise_name?: string;
    state?: string;
    district?: string;
    phone?: string;
  };
  created_at?: string;
}

export interface SupabaseSession {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  user: SupabaseUser;
}

export interface AuthResponse {
  user: SupabaseUser | null;
  session: SupabaseSession | null;
  error: { message: string } | null;
}

const STORAGE_KEY = 'udhyamsetu_supabase_session';

class SupabaseAuthClient {
  private url: string;
  private anonKey: string;
  private currentSession: SupabaseSession | null = null;
  private listeners: Array<(session: SupabaseSession | null) => void> = [];

  constructor() {
    const env = (import.meta as any).env || {};
    this.url = (env.VITE_SUPABASE_URL || '').replace(/\/$/, '');
    this.anonKey = env.VITE_SUPABASE_ANON_KEY || '';

    // 1. Check for OAuth redirect hash params (#access_token=...&refresh_token=...)
    try {
      if (typeof window !== 'undefined' && window.location.hash.includes('access_token')) {
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');
        const expiresIn = parseInt(hashParams.get('expires_in') || '3600', 10);
        const tokenType = hashParams.get('token_type') || 'bearer';

        if (accessToken) {
          // Immediately fetch real Google user details from Supabase
          fetch(`${this.url}/auth/v1/user`, {
            headers: {
              'apikey': this.anonKey,
              'Authorization': `Bearer ${accessToken}`
            }
          })
            .then((res) => res.json())
            .then((realUser) => {
              const session: SupabaseSession = {
                access_token: accessToken,
                token_type: tokenType,
                expires_in: expiresIn,
                refresh_token: refreshToken || '',
                user: {
                  id: realUser.id || 'usr_' + Date.now(),
                  email: realUser.email || '',
                  phone: realUser.phone || '',
                  user_metadata: {
                    full_name:
                      realUser.user_metadata?.full_name ||
                      realUser.user_metadata?.name ||
                      realUser.email?.split('@')[0] ||
                      'Google User',
                    avatar_url: realUser.user_metadata?.avatar_url || realUser.user_metadata?.picture || '',
                    ...realUser.user_metadata
                  },
                  created_at: realUser.created_at || new Date().toISOString()
                }
              };
              this.setSession(session);
              window.history.replaceState(null, '', window.location.pathname);
            })
            .catch((err) => {
              console.warn('Failed to fetch real Google user profile from Supabase:', err);
              const session: SupabaseSession = {
                access_token: accessToken,
                token_type: tokenType,
                expires_in: expiresIn,
                refresh_token: refreshToken || '',
                user: {
                  id: 'usr_oauth',
                  email: '',
                  user_metadata: { full_name: 'Google User' }
                }
              };
              this.setSession(session);
              window.history.replaceState(null, '', window.location.pathname);
            });
        }
      }
    } catch (e) {
      console.warn('OAuth hash parse error:', e);
    }

    // 2. Reset session on page refresh so user is automatically logged out
    const isOAuthRedirect = typeof window !== 'undefined' && window.location.hash.includes('access_token');
    if (!isOAuthRedirect) {
      try {
        localStorage.removeItem(STORAGE_KEY);
        sessionStorage.removeItem(STORAGE_KEY);
      } catch (e) {
        // ignore storage errors
      }
      this.currentSession = null;
    }
  }

  /**
   * Google OAuth Login / Signup (Redirects to real Supabase Google OAuth)
   */
  async signInWithOAuth(provider: 'google' = 'google'): Promise<void> {
    const redirectUri = encodeURIComponent(window.location.origin + '/dashboard');
    const authUrl = `${this.url}/auth/v1/authorize?provider=${provider}&redirect_to=${redirectUri}`;
    window.location.href = authUrl;
  }

  public get isConfigured(): boolean {
    return Boolean(
      this.url &&
        this.url.startsWith('https://') &&
        !this.url.includes('your-project') &&
        this.anonKey &&
        !this.anonKey.includes('your-anon-key')
    );
  }

  public getSession(): SupabaseSession | null {
    return this.currentSession;
  }

  public getUser(): SupabaseUser | null {
    return this.currentSession?.user || null;
  }

  public onAuthStateChange(callback: (session: SupabaseSession | null) => void) {
    this.listeners.push(callback);
    callback(this.currentSession);
    return () => {
      this.listeners = this.listeners.filter(l => l !== callback);
    };
  }

  private notifyListeners() {
    this.listeners.forEach(cb => cb(this.currentSession));
  }

  private setSession(session: SupabaseSession | null) {
    this.currentSession = session;
    if (session) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
    this.notifyListeners();
  }

  /**
   * Sign Up with Email and Password
   */
  async signUp(
    email: string,
    password: string,
    metadata: Record<string, any> = {}
  ): Promise<AuthResponse> {
    if (!this.isConfigured) {
      // Demo / Mock Mode fallback for local testing when keys are pending
      const mockUser: SupabaseUser = {
        id: 'usr_' + Date.now(),
        email,
        user_metadata: metadata,
        created_at: new Date().toISOString()
      };
      const mockSession: SupabaseSession = {
        access_token: 'mock_jwt_token_' + Math.random().toString(36).substring(2),
        token_type: 'bearer',
        expires_in: 3600,
        refresh_token: 'mock_refresh_' + Math.random().toString(36).substring(2),
        user: mockUser
      };
      this.setSession(mockSession);
      return { user: mockUser, session: mockSession, error: null };
    }

    try {
      const res = await fetch(`${this.url}/auth/v1/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': this.anonKey,
          'Authorization': `Bearer ${this.anonKey}`
        },
        body: JSON.stringify({
          email,
          password,
          data: metadata
        })
      });

      const data = await res.json();
      if (!res.ok) {
        return { user: null, session: null, error: { message: data.msg || data.error_description || data.message || 'Signup failed' } };
      }

      if (data.session) {
        this.setSession(data.session);
      }
      return { user: data.user, session: data.session || null, error: null };
    } catch (err: any) {
      return { user: null, session: null, error: { message: err.message || 'Network error during signup' } };
    }
  }

  /**
   * Sign In with Email and Password
   */
  async signInWithPassword(email: string, password: string): Promise<AuthResponse> {
    if (!this.isConfigured) {
      // Demo / Mock Mode fallback for local testing
      const mockUser: SupabaseUser = {
        id: 'usr_demo_101',
        email,
        user_metadata: {
          full_name: email.split('@')[0] || 'Entrepreneur User',
          enterprise_name: 'Shree Ganesh Enterprises',
          district: 'Bhopal',
          state: 'Madhya Pradesh'
        },
        created_at: new Date().toISOString()
      };
      const mockSession: SupabaseSession = {
        access_token: 'mock_jwt_' + Math.random().toString(36).substring(2),
        token_type: 'bearer',
        expires_in: 3600,
        refresh_token: 'mock_refresh_' + Math.random().toString(36).substring(2),
        user: mockUser
      };
      this.setSession(mockSession);
      return { user: mockUser, session: mockSession, error: null };
    }

    try {
      const res = await fetch(`${this.url}/auth/v1/token?grant_type=password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': this.anonKey,
          'Authorization': `Bearer ${this.anonKey}`
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (!res.ok) {
        return {
          user: null,
          session: null,
          error: { message: data.error_description || data.msg || data.message || 'Invalid email or password' }
        };
      }

      const session: SupabaseSession = {
        access_token: data.access_token,
        token_type: data.token_type,
        expires_in: data.expires_in,
        refresh_token: data.refresh_token,
        user: data.user
      };

      this.setSession(session);
      return { user: session.user, session, error: null };
    } catch (err: any) {
      return { user: null, session: null, error: { message: err.message || 'Network error during login' } };
    }
  }

  /**
   * 1-Click Demo / Evaluator Instant Login
   */
  loginDemoUser(name: string = 'Ramesh Patel', email: string = 'ramesh.patel@udhyamsetu.in'): SupabaseSession {
    const demoUser: SupabaseUser = {
      id: 'usr_sih_demo_evaluator',
      email,
      user_metadata: {
        full_name: name,
        enterprise_name: 'Shree Ganesh Agro & Dal Mill',
        district: 'Bhopal',
        state: 'Madhya Pradesh',
        phone: '+91 98765 43210'
      },
      created_at: new Date().toISOString()
    };
    const session: SupabaseSession = {
      access_token: 'demo_token_sih_2026',
      token_type: 'bearer',
      expires_in: 86400,
      refresh_token: 'demo_refresh_token',
      user: demoUser
    };
    this.setSession(session);
    return session;
  }

  /**
   * Sign Out
   */
  async signOut(): Promise<void> {
    if (this.isConfigured && this.currentSession?.access_token) {
      try {
        await fetch(`${this.url}/auth/v1/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            apikey: this.anonKey,
            Authorization: `Bearer ${this.currentSession.access_token}`
          }
        });
      } catch (e) {
        console.warn('Supabase logout API error:', e);
      }
    }
    this.setSession(null);
  }
}

export const supabase = new SupabaseAuthClient();
