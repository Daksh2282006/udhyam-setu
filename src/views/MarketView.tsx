<<<<<<< HEAD
import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { MarketService, MarketPin, PinType, RadiusBand } from '../services/marketService';

declare global {
  interface Window {
    L: any;
  }
}

export const MarketView: React.FC = () => {
  const { profile } = useApp();
  const [radiusKm, setRadiusKm] = useState<number>(15);
  const [selectedPinId, setSelectedPinId] = useState<string | null>('pin-user-unit');
  const [categoryFilter, setCategoryFilter] = useState<PinType | 'all'>('all');
  const [mapLoaded, setMapLoaded] = useState(false);
  const [isSatellite, setIsSatellite] = useState(false);

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<any>(null);
  const circlesGroupRef = useRef<any>(null);
  const markersGroupRef = useRef<any>(null);
  const markerObjMapRef = useRef<Record<string, any>>({});

  // Center coordinates from profile or fallback
  const centerLat = profile.location.latitude || 23.2599;
  const centerLng = profile.location.longitude || 77.4126;
  const districtName = profile.location.district || 'Bhopal';
  const categoryName = profile.category?.titleEn || 'Mini Dal Mill';

  // Fetch cluster telemetry
  const telemetry = MarketService.getClusterTelemetry(
    radiusKm,
    districtName,
    centerLat,
    centerLng,
    categoryName
  );

  // Dynamic Leaflet Loader
  useEffect(() => {
    let isMounted = true;

    const loadLeaflet = async () => {
      // 1. Inject Leaflet CSS if missing
      if (!document.getElementById('leaflet-css')) {
        const link = document.createElement('link');
        link.id = 'leaflet-css';
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(link);
      }

      // 2. Inject Leaflet JS if missing
      if (!window.L) {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement('script');
          script.id = 'leaflet-js';
          script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
          script.onload = () => resolve();
          script.onerror = () => reject(new Error('Failed to load Leaflet script'));
          document.body.appendChild(script);
        });
      }

      if (isMounted) {
        setMapLoaded(true);
      }
    };

    loadLeaflet().catch(err => {
      console.warn('Leaflet load error, falling back:', err);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  // Initialize & Render Leaflet Map
  useEffect(() => {
    if (!mapLoaded || !window.L || !mapContainerRef.current) return;

    const L = window.L;

    // Destroy existing instance if any
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // Initialize Map
    const map = L.map(mapContainerRef.current, {
      center: [centerLat, centerLng],
      zoom: radiusKm <= 5 ? 13 : radiusKm <= 10 ? 12 : radiusKm <= 15 ? 11 : 10,
      zoomControl: true,
      scrollWheelZoom: true
    });

    mapInstanceRef.current = map;

    // Tile Layer: Standard OpenStreetMap or Satellite imagery
    const streetTiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    streetTiles.addTo(map);

    // Feature Groups for circles and markers
    const circlesGroup = L.featureGroup().addTo(map);
    const markersGroup = L.featureGroup().addTo(map);
    circlesGroupRef.current = circlesGroup;
    markersGroupRef.current = markersGroup;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [mapLoaded, centerLat, centerLng]);

  // Update Concentric Circles & Pins on Map when state changes
  useEffect(() => {
    if (!mapInstanceRef.current || !window.L) return;
    const L = window.L;
    const map = mapInstanceRef.current;
    const circlesGroup = circlesGroupRef.current;
    const markersGroup = markersGroupRef.current;

    if (!circlesGroup || !markersGroup) return;

    circlesGroup.clearLayers();
    markersGroup.clearLayers();
    markerObjMapRef.current = {};

    // 1. Draw 4 Concentric Radar Rings (5km, 10km, 15km, 25km)
    const rings = [
      { radiusM: 25000, color: '#EF4444', label: '🔴 25 KM Macro District & Mandi Ring', fill: 0.03, weight: 1.5 },
      { radiusM: 15000, color: '#F97316', label: '🟠 15 KM Wholesale Catchment Ring', fill: 0.04, weight: 2 },
      { radiusM: 10000, color: '#F59E0B', label: '🟡 10 KM Core Cluster Ring', fill: 0.06, weight: 2 },
      { radiusM: 5000, color: '#10B981', label: '🟢 5 KM Hyper-Local Monopoly Ring', fill: 0.10, weight: 2.5 }
    ];

    rings.forEach(ring => {
      const circle = L.circle([centerLat, centerLng], {
        radius: ring.radiusM,
        color: ring.color,
        fillColor: ring.color,
        fillOpacity: ring.fill,
        weight: ring.weight,
        dashArray: '5, 5'
      });

      circle.bindTooltip(ring.label, {
        sticky: true,
        className: 'radar-ring-tooltip text-[11px] font-bold'
      });

      circlesGroup.addLayer(circle);
    });

    // 2. Filter pins by active Category & Radius
    const displayPins = telemetry.allPins.filter(pin => {
      const withinRadius = pin.distanceKm <= radiusKm;
      const matchesCategory = categoryFilter === 'all' || pin.type === categoryFilter;
      return withinRadius && matchesCategory;
    });

    // 3. Render Custom Pins
    displayPins.forEach(pin => {
      const isSelected = selectedPinId === pin.id;
      const isUser = pin.type === 'unit';
      const isComp = pin.type === 'competitor';
      const isMandi = pin.type === 'mandi';
      const isRetail = pin.type === 'retail_hub';
      const isMachinery = pin.type === 'machinery';

      const pinBg = isUser
        ? 'bg-purple-600 ring-4 ring-purple-300 animate-pulse'
        : isComp
        ? 'bg-red-500 ring-2 ring-red-200'
        : isMandi
        ? 'bg-emerald-600 ring-2 ring-emerald-200'
        : isRetail
        ? 'bg-blue-600 ring-2 ring-blue-200'
        : 'bg-amber-600 ring-2 ring-amber-200';

      const pinIcon = isUser
        ? 'store'
        : isComp
        ? 'factory'
        : isMandi
        ? 'agriculture'
        : isRetail
        ? 'local_mall'
        : 'precision_manufacturing';

      const customHtml = `
        <div class="relative flex flex-col items-center group cursor-pointer">
          <div class="w-8 h-8 rounded-full flex items-center justify-center text-white shadow-xl ${pinBg} transition-transform hover:scale-125">
            <span class="material-symbols-outlined text-[17px] leading-none">${pinIcon}</span>
          </div>
          <div class="mt-1 px-2 py-0.5 rounded bg-white/95 border border-slate-300 shadow text-[10px] font-bold text-slate-800 whitespace-nowrap">
            ${pin.name.length > 18 ? pin.name.substring(0, 18) + '...' : pin.name} (${pin.distanceKm}km)
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        html: customHtml,
        className: 'custom-map-pin',
        iconSize: [32, 48],
        iconAnchor: [16, 24],
        popupAnchor: [0, -26]
      });

      const marker = L.marker([pin.lat, pin.lng], { icon: customIcon });

      const popupHtml = `
        <div class="p-2 space-y-1 font-sans min-w-[200px]">
          <div class="flex items-center justify-between gap-2 border-b pb-1">
            <span class="font-bold text-slate-900 text-[13px]">${pin.name}</span>
            <span class="text-[11px] font-bold px-1.5 py-0.5 rounded ${
              isUser ? 'bg-purple-100 text-purple-700' : isComp ? 'bg-red-100 text-red-700' : isMandi ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
            }">${pin.distanceKm} KM</span>
          </div>
          <div class="text-[11px] text-slate-600 font-semibold">${pin.nameHi}</div>
          <p class="text-[11px] text-slate-700 leading-tight pt-1">${pin.details}</p>
          <div class="pt-1 text-[10px] font-bold text-emerald-700">✓ ${pin.metric}</div>
          ${pin.capacity ? `<div class="text-[10px] text-slate-500">क्षमता: ${pin.capacity}</div>` : ''}
        </div>
      `;

      marker.bindPopup(popupHtml);
      marker.on('click', () => {
        setSelectedPinId(pin.id);
      });

      markersGroup.addLayer(marker);
      markerObjMapRef.current[pin.id] = marker;

      if (isSelected) {
        marker.openPopup();
      }
    });

    // Auto-adjust map zoom according to selected radius
    const targetZoom = radiusKm <= 5 ? 13 : radiusKm <= 10 ? 12 : radiusKm <= 15 ? 11 : 10;
    map.setView([centerLat, centerLng], targetZoom, { animate: true });
  }, [radiusKm, categoryFilter, centerLat, centerLng, telemetry.allPins, selectedPinId]);

  // Handle entity list click
  const handleSelectEntity = (pin: MarketPin) => {
    setSelectedPinId(pin.id);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([pin.lat, pin.lng], 13, { animate: true });
      const marker = markerObjMapRef.current[pin.id];
      if (marker) {
        marker.openPopup();
      }
    }
  };

  const activeStats = telemetry.radiusBreakdown;
=======
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MarketService } from '../services/marketService';

export const MarketView: React.FC = () => {
  const { profile } = useApp();
  const [radiusKm, setRadiusKm] = useState(15);
  const [selectedPin, setSelectedPin] = useState<string | null>(null);

  const telemetry = MarketService.getClusterTelemetry(radiusKm, profile.location.district);
>>>>>>> f1737c756f8b193a0cc271a663e4f23a85f6dcb7

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header & Radius Selector */}
      <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 card-shadow flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
<<<<<<< HEAD
          <div className="flex items-center gap-2">
            <span className="text-bilingual-indicator font-bilingual-indicator text-secondary font-semibold uppercase">
              भू-स्थानिक बाजार रडार • Live OpenStreetMap Geospatial Radar
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping"></span>
              Live Geocoded Map
            </span>
          </div>
          <h2 className="font-headline-md text-headline-md text-primary font-bold mt-1">
            Real Geospatial Market Radar ({districtName} Cluster)
          </h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Live OpenStreetMap competitor density, APMC Mandi auction rates, and raw material procurement across 5km, 10km, 15km, and 25km radius rings.
          </p>
        </div>

        {/* Radius Selector Pills */}
        <div className="flex items-center gap-2 bg-surface-container-low p-1.5 rounded-xl border border-outline-variant/30 self-start md:self-auto flex-wrap">
          <span className="text-[12px] font-bold text-primary pl-2 pr-1">Radius:</span>
          {[
            { r: 5, label: '5 KM Ring', color: 'bg-emerald-600' },
            { r: 10, label: '10 KM Ring', color: 'bg-amber-600' },
            { r: 15, label: '15 KM Ring', color: 'bg-orange-600' },
            { r: 25, label: '25 KM Ring', color: 'bg-red-600' }
          ].map(({ r, label, color }) => (
            <button
              key={r}
              onClick={() => setRadiusKm(r)}
              className={`px-3 py-1.5 rounded-lg text-[12px] font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                radiusKm === r
                  ? `${color} text-white shadow-md scale-105`
                  : 'bg-surface text-on-surface-variant hover:text-primary hover:bg-surface-container-high'
              }`}
            >
              <span>{r} km</span>
=======
          <span className="text-bilingual-indicator font-bilingual-indicator text-secondary font-semibold uppercase">
            स्थानीय बाजार विश्लेषण • Geospatial Cluster Telemetry
          </span>
          <h2 className="font-headline-md text-headline-md text-primary font-bold">
            Hyper-Local Market Intelligence
          </h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Live APMC Mandi price discovery, competitor radar, and supply-demand gap in {profile.location.block} cluster.
          </p>
        </div>

        {/* Radius Pills */}
        <div className="flex items-center gap-2 bg-surface-container-low p-1 rounded-xl border border-outline-variant/30 self-start md:self-auto">
          <span className="text-[12px] font-semibold text-on-surface-variant pl-2 pr-1">Radius:</span>
          {[5, 10, 15, 25].map((r) => (
            <button
              key={r}
              onClick={() => setRadiusKm(r)}
              className={`px-3 py-1 rounded-lg text-[12px] font-semibold transition-all cursor-pointer ${
                radiusKm === r
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              {r} km
>>>>>>> f1737c756f8b193a0cc271a663e4f23a85f6dcb7
            </button>
          ))}
        </div>
      </div>

<<<<<<< HEAD
      {/* 4 Multi-Radius Density Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { key: '0-5km' as RadiusBand, ring: '0 – 5 KM', desc: 'हाइपर-लोकल एकाधिकार' },
          { key: '5-10km' as RadiusBand, ring: '5 – 10 KM', desc: 'प्राथमिक क्लस्टर दायरा' },
          { key: '10-15km' as RadiusBand, ring: '10 – 15 KM', desc: 'थोक कैचमेंट व मंडी' },
          { key: '15-25km' as RadiusBand, ring: '15 – 25 KM', desc: 'मैक्रो जिला स्तर' }
        ].map(({ key, ring, desc }) => {
          const stat = activeStats[key];
          const isSelectedRadius =
            (key === '0-5km' && radiusKm === 5) ||
            (key === '5-10km' && radiusKm === 10) ||
            (key === '10-15km' && radiusKm === 15) ||
            (key === '15-25km' && radiusKm === 25);

          return (
            <div
              key={key}
              onClick={() => {
                const targetKm = key === '0-5km' ? 5 : key === '5-10km' ? 10 : key === '10-15km' ? 15 : 25;
                setRadiusKm(targetKm);
              }}
              className={`p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
                isSelectedRadius
                  ? 'bg-surface-container-lowest border-secondary shadow-lg ring-2 ring-secondary/20'
                  : 'bg-surface-container-lowest border-outline-variant/30 hover:border-secondary/40'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-label-md font-bold text-primary flex items-center gap-1.5">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: stat.circleColor }}
                  ></span>
                  {ring}
                </span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${stat.statusColor}`}>
                  {stat.competitors === 0 ? '🏆 0 Competitor' : `${stat.competitors} Competitor${stat.competitors > 1 ? 's' : ''}`}
                </span>
              </div>

              <div className="mt-3 flex items-baseline justify-between">
                <div>
                  <div className="text-[11px] text-on-surface-variant font-medium">Unmet Demand</div>
                  <div className="text-[20px] font-bold text-secondary font-numeric-data">
                    {stat.unmetDemandMt} MT/mo
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] text-on-surface-variant font-medium">Entities</div>
                  <div className="text-[13px] font-bold text-primary">
                    {stat.mandis > 0 ? `🌾 ${stat.mandis} Mandi ` : ''}
                    {stat.retailHubs > 0 ? `🏪 ${stat.retailHubs} Hub ` : ''}
                    {stat.machineryDepots > 0 ? `🚚 ${stat.machineryDepots} Depot` : ''}
                  </div>
                </div>
              </div>

              <div className="mt-2.5 pt-2 border-t border-outline-variant/20 text-[11px] font-semibold text-on-surface-variant flex items-center justify-between">
                <span>{desc}</span>
                <span className="text-secondary">क्लिक करें →</span>
              </div>
            </div>
          );
        })}
=======
      {/* 4 Market KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/30 card-shadow">
          <div className="text-label-md text-on-surface-variant">Unmet Monthly Demand</div>
          <div className="font-display-lg-mobile text-display-lg-mobile font-bold text-secondary mt-1">
            {telemetry.unmetDemandMt} MT
          </div>
          <div className="text-[12px] text-on-surface-variant mt-1">
            Across {radiusKm}km cluster radius
          </div>
        </div>

        <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/30 card-shadow">
          <div className="text-label-md text-on-surface-variant">APMC Mandi Arrival Price</div>
          <div className="font-display-lg-mobile text-display-lg-mobile font-bold text-primary mt-1">
            ₹{telemetry.mandiPricePerKg.toFixed(2)}/kg
          </div>
          <div className="text-[12px] text-secondary font-semibold mt-1">
            Direct gate procurement rate
          </div>
        </div>

        <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/30 card-shadow">
          <div className="text-label-md text-on-surface-variant">Retail Kirana Realization</div>
          <div className="font-display-lg-mobile text-display-lg-mobile font-bold text-primary mt-1">
            ₹{telemetry.retailPricePerKg.toFixed(2)}/kg
          </div>
          <div className="text-[12px] text-on-surface-variant mt-1">
            Packaged 1kg/2kg pouches
          </div>
        </div>

        <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/30 card-shadow">
          <div className="text-label-md text-on-surface-variant">Gross Value-Add Spread</div>
          <div className="font-display-lg-mobile text-display-lg-mobile font-bold text-secondary mt-1">
            +₹{telemetry.retailMarginSpread.toFixed(2)}/kg
          </div>
          <div className="text-[12px] text-secondary font-semibold mt-1">
            Processing & packaging margin
          </div>
        </div>
>>>>>>> f1737c756f8b193a0cc271a663e4f23a85f6dcb7
      </div>

      {/* Interactive Map & Competitor Detail Cluster */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
<<<<<<< HEAD
        {/* Real OpenStreetMap View (8 cols) */}
        <div className="lg:col-span-8 bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/30 card-shadow space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-headline-sm text-headline-sm text-primary font-bold">
                  Geospatial Radar Map ({radiusKm} KM Range)
                </h3>
                <span className="text-[11px] text-secondary font-bold bg-secondary-container/40 px-2 py-0.5 rounded-md">
                  Active Radius: {radiusKm} km
                </span>
              </div>
              <p className="text-[12px] text-on-surface-variant mt-0.5">
                📍 Center: {profile.location.village || profile.location.block}, {districtName} (PIN: {profile.location.pincode || '462030'})
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {[
                { type: 'all' as const, label: 'All', icon: 'apps' },
                { type: 'competitor' as const, label: 'Competitors', icon: 'factory' },
                { type: 'mandi' as const, label: 'Mandis', icon: 'agriculture' },
                { type: 'retail_hub' as const, label: 'Kirana', icon: 'local_mall' },
                { type: 'machinery' as const, label: 'Machinery', icon: 'precision_manufacturing' }
              ].map(f => (
                <button
                  key={f.type}
                  onClick={() => setCategoryFilter(f.type)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
                    categoryFilter === f.type
                      ? 'bg-primary text-white shadow-xs'
                      : 'bg-surface-container-low text-on-surface-variant hover:text-primary hover:bg-surface-container-high'
                  }`}
                >
                  <span className="material-symbols-outlined text-[14px]">{f.icon}</span>
                  <span>{f.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Leaflet Real Map Container */}
          <div className="relative w-full h-[460px] rounded-xl overflow-hidden border border-outline-variant/40 shadow-inner">
            <div ref={mapContainerRef} className="w-full h-full z-0" />

            {/* Floating Map Legend Overlay */}
            <div className="absolute bottom-3 left-3 z-[400] bg-white/90 backdrop-blur-md p-2.5 rounded-xl border border-slate-300/80 shadow-lg text-[11px] space-y-1 font-medium pointer-events-auto">
              <div className="font-bold text-slate-900 border-b pb-1 text-[10px] uppercase tracking-wider">Map Legend (संकेतिका)</div>
              <div className="flex items-center gap-2 text-slate-800">
                <span className="w-3 h-3 rounded-full bg-purple-600 ring-2 ring-purple-300 inline-block"></span>
                <span>📍 आपकी प्रस्तावित इकाई (Your Unit)</span>
              </div>
              <div className="flex items-center gap-2 text-slate-800">
                <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
                <span>🏭 प्रतिस्पर्धी मिलें (Competitors)</span>
              </div>
              <div className="flex items-center gap-2 text-slate-800">
                <span className="w-3 h-3 rounded-full bg-emerald-600 inline-block"></span>
                <span>🌾 APMC कृषि उपज मंडी (Mandi)</span>
              </div>
              <div className="flex items-center gap-2 text-slate-800">
                <span className="w-3 h-3 rounded-full bg-blue-600 inline-block"></span>
                <span>🏪 किराना व थोक हब (Retail Hub)</span>
              </div>
            </div>

            {/* Floating Radius Quick Switcher on Map */}
            <div className="absolute top-3 right-3 z-[400] bg-white/90 backdrop-blur-md p-1.5 rounded-xl border border-slate-300 shadow-md flex items-center gap-1">
              {[5, 10, 15, 25].map(r => (
                <button
                  key={r}
                  onClick={() => setRadiusKm(r)}
                  className={`px-2 py-0.5 text-[11px] font-bold rounded-lg transition-colors ${
                    radiusKm === r ? 'bg-secondary text-white' : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {r}km
                </button>
              ))}
            </div>
=======
        {/* Map View (8 cols) */}
        <div className="lg:col-span-8 bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 card-shadow space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-headline-sm text-headline-sm text-primary font-bold">
              Cluster Geospatial Radar ({radiusKm} KM)
            </h3>
            <span className="text-[11px] text-secondary font-semibold bg-secondary-container/40 px-2 py-0.5 rounded">
              Active Range: {radiusKm} km
            </span>
          </div>

          <div className="relative w-full h-96 bg-slate-100 rounded-xl overflow-hidden border border-outline-variant/40">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-70"></div>

            {/* Simulated Radar Circle */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className="rounded-full border-2 border-dashed border-secondary/30 bg-secondary/5 transition-all duration-300"
                style={{
                  width: `${Math.min(360, radiusKm * 18)}px`,
                  height: `${Math.min(360, radiusKm * 18)}px`
                }}
              ></div>
            </div>

            {/* Highway Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              <path d="M 40 320 Q 300 220 750 140 T 1200 60" fill="none" stroke="#CBD5E1" strokeLinecap="round" strokeWidth="12" />
              <path d="M 40 320 Q 300 220 750 140 T 1200 60" fill="none" stroke="#94A3B8" strokeDasharray="6,6" strokeWidth="2" />
              <text fill="#64748B" fontFamily="Inter" fontSize="11" fontWeight="600" x="380" y="190">
                SH-18 State Highway Corridor
              </text>
            </svg>

            {/* Pins */}
            {telemetry.pins.map((pin, i) => (
              <div
                key={pin.id}
                onClick={() => setSelectedPin(pin.id)}
                className="absolute cursor-pointer group"
                style={{
                  top: `${40 + (i * 18)}%`,
                  left: `${25 + (i * 20)}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 ${
                    pin.type === 'unit'
                      ? 'bg-secondary text-white ring-4 ring-secondary/20 animate-pulse'
                      : pin.type === 'competitor'
                      ? 'bg-error text-white'
                      : pin.type === 'mandi'
                      ? 'bg-primary-container text-white'
                      : 'bg-on-tertiary-container text-white'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {pin.type === 'unit'
                      ? 'store'
                      : pin.type === 'competitor'
                      ? 'factory'
                      : pin.type === 'mandi'
                      ? 'agriculture'
                      : 'local_convenience_store'}
                  </span>
                </div>
                <div className="absolute top-10 -left-16 bg-white px-2 py-0.5 rounded shadow text-center whitespace-nowrap text-[10px] text-on-surface border border-outline-variant/30 pointer-events-none">
                  {pin.name} ({pin.distanceKm}km)
                </div>
              </div>
            ))}
>>>>>>> f1737c756f8b193a0cc271a663e4f23a85f6dcb7
          </div>
        </div>

        {/* Competitor & Market Telemetry List (4 cols) */}
<<<<<<< HEAD
        <div className="lg:col-span-4 bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/30 card-shadow space-y-4 flex flex-col h-full">
          <div className="flex items-center justify-between">
            <h3 className="font-headline-sm text-headline-sm text-primary font-bold">
              Nearby Entities ({telemetry.pins.length})
            </h3>
            <span className="text-[11px] font-bold text-secondary">
              ≤ {radiusKm} KM
            </span>
          </div>

          {/* List of Entities within selected Radius */}
          <div className="space-y-3 overflow-y-auto max-h-[480px] pr-1">
            {telemetry.pins.map(pin => {
              const isSelected = selectedPinId === pin.id;
              const isUser = pin.type === 'unit';
              const isComp = pin.type === 'competitor';
              const isMandi = pin.type === 'mandi';
              const isRetail = pin.type === 'retail_hub';

              return (
                <div
                  key={pin.id}
                  onClick={() => handleSelectEntity(pin)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-secondary bg-secondary-container/25 shadow-md ring-1 ring-secondary/40'
                      : 'border-outline-variant/30 hover:bg-surface-container-low hover:border-secondary/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[16px]">
                        {isUser ? '📍' : isComp ? '🏭' : isMandi ? '🌾' : isRetail ? '🏪' : '🚚'}
                      </span>
                      <span className="font-bold text-primary text-[13px]">{pin.name}</span>
                    </div>
                    <span className="text-[11px] font-bold text-secondary bg-secondary-container/30 px-1.5 py-0.5 rounded">
                      {pin.distanceKm} km
                    </span>
                  </div>

                  <div className="text-[11px] text-on-surface-variant font-bilingual-indicator mt-0.5">
                    {pin.nameHi}
                  </div>

                  <p className="text-[12px] text-on-surface-variant mt-1 leading-relaxed">
                    {pin.details}
                  </p>

                  <div className="mt-2 flex items-center justify-between text-[11px]">
                    <span className="font-bold text-emerald-700">✓ {pin.metric}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-surface border border-outline-variant/40 font-semibold text-on-surface-variant">
                      {pin.radiusBand}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Value Proposition Note */}
          <div className="p-3 bg-secondary-container/20 rounded-xl border border-secondary/20 text-body-sm text-[12px] text-on-surface-variant mt-auto">
            <strong className="text-secondary block mb-0.5">💡 Strategic Market Insight:</strong>
            {radiusKm <= 5
              ? '5 किमी के दायरे में 0 प्रतिस्पर्धी हैं! स्थानीय किराना स्टोर्स और ग्रामीण मांग का 100% लाभ आपकी यूनिट को मिलेगा।'
              : radiusKm <= 10
              ? '10 किमी में 1 प्रतिस्पर्धी पूर्ण क्षमता पर कार्यरत है। उच्च गुणवत्ता वाले 1kg ब्रांडेड पैकेट्स से बड़ा मार्केट शेयर हासिल किया जा सकता है।'
              : 'मंडी से डायरेक्ट 13.8 किमी पर कच्चा माल खरीद और 14 किमी के भीतर थोक सप्लाई नेटवर्क स्थापित करने के लिए यह क्लस्टर अत्यंत उपयुक्त है।'}
=======
        <div className="lg:col-span-4 bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 card-shadow space-y-4">
          <h3 className="font-headline-sm text-headline-sm text-primary font-bold">
            Nearby Entities ({telemetry.pins.length})
          </h3>

          <div className="space-y-3">
            {telemetry.pins.map((pin) => (
              <div
                key={pin.id}
                onClick={() => setSelectedPin(pin.id)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                  selectedPin === pin.id
                    ? 'border-secondary bg-secondary-container/20 shadow-sm'
                    : 'border-outline-variant/30 hover:bg-surface-container-low'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-primary text-[13px]">{pin.name}</span>
                  <span className="text-[11px] font-semibold text-secondary">{pin.distanceKm} km</span>
                </div>
                <div className="text-[11px] text-on-surface-variant font-bilingual-indicator mt-0.5">
                  {pin.nameHi}
                </div>
                <p className="text-[12px] text-on-surface-variant mt-1.5 leading-relaxed">
                  {pin.details}
                </p>
                <div className="mt-2 text-[11px] font-semibold text-secondary">
                  ✓ {pin.metric}
                </div>
              </div>
            ))}
          </div>

          {/* Supplier Directory Note */}
          <div className="p-3 bg-surface-container-low rounded-xl border border-outline-variant/30 text-body-sm text-[12px] text-on-surface-variant">
            <strong className="text-primary block mb-1">Certified NSIC Machinery Depots:</strong>
            Indore Industrial Area (Sanwer Road) & Dewas Cluster. 3-day doorstep delivery available for 2HP-5HP units.
>>>>>>> f1737c756f8b193a0cc271a663e4f23a85f6dcb7
          </div>
        </div>
      </div>
    </div>
  );
};
<<<<<<< HEAD

=======
>>>>>>> f1737c756f8b193a0cc271a663e4f23a85f6dcb7
