export interface MarketPin {
  id: string;
  name: string;
  nameHi: string;
  type: 'unit' | 'competitor' | 'mandi' | 'retail_hub';
  distanceKm: number;
  lat: number;
  lng: number;
  details: string;
  metric: string;
}

export interface MarketTelemetry {
  radiusKm: number;
  unmetDemandMt: number;
  competitorsCount: number;
  mandiPricePerKg: number;
  retailPricePerKg: number;
  retailMarginSpread: number;
  pins: MarketPin[];
  mandiArrivalsTodayQuintals: number;
  monthlyClusterConsumptionQuintals: number;
}

export class MarketService {
  /**
   * Returns cluster market intelligence for a given radius and location
   */
  static getClusterTelemetry(radiusKm: number = 15, district: string = 'Bhopal'): MarketTelemetry {
    // Dynamically calculate metrics based on chosen radius
    let unmetDemand = 14.5;
    let competitorsCount = 1;
    let clusterConsumption = 480;

    if (radiusKm <= 5) {
      unmetDemand = 6.2;
      competitorsCount = 0;
      clusterConsumption = 180;
    } else if (radiusKm <= 10) {
      unmetDemand = 9.8;
      competitorsCount = 1;
      clusterConsumption = 310;
    } else if (radiusKm <= 15) {
      unmetDemand = 14.5;
      competitorsCount = 1;
      clusterConsumption = 480;
    } else {
      unmetDemand = 28.4;
      competitorsCount = 3;
      clusterConsumption = 820;
    }

    const pins: MarketPin[] = [
      {
        id: 'pin-proposed',
        name: 'Proposed Unit (Shree Ganesh Dal Mill)',
        nameHi: 'प्रस्तावित इकाई (फंदा कलां)',
        type: 'unit',
        distanceKm: 0,
        lat: 23.2599,
        lng: 77.2144,
        details: 'Optimal location on SH-18 corridor with 3-phase feeder power access.',
        metric: 'Zero Comp in 3.5km'
      },
      {
        id: 'pin-comp-1',
        name: 'Patidar Dal Mill',
        nameHi: 'पाटीदार दाल मिल (प्रतिस्पर्धी)',
        type: 'competitor',
        distanceKm: 3.8,
        lat: 23.2800,
        lng: 77.2400,
        details: 'Running at 100% capacity; focuses on loose wholesale gunny bags only.',
        metric: '3.8km away (Full Capacity)'
      },
      {
        id: 'pin-mandi-1',
        name: 'Sehore APMC Mandi Depot',
        nameHi: 'सीहोर कृषि उपज मंडी',
        type: 'mandi',
        distanceKm: 14.2,
        lat: 23.2000,
        lng: 77.0800,
        details: 'Daily Chana/Arhar auction arrivals: 340 Quintals. Direct gate price ₹74/kg.',
        metric: 'Procurement ₹74.00/kg'
      },
      {
        id: 'pin-retail-1',
        name: '42 Kirana Retail Hub (Bairagarh Belt)',
        nameHi: '42 किराना दुकान क्लस्टर (बैरागढ़)',
        type: 'retail_hub',
        distanceKm: 9.4,
        lat: 23.2700,
        lng: 77.3400,
        details: 'Aggregated consumer retail demand for 1kg branded packaged pulse.',
        metric: 'Retail ₹118.00/kg'
      }
    ];

    if (radiusKm >= 25) {
      pins.push({
        id: 'pin-comp-2',
        name: 'Kisan Agro Products',
        nameHi: 'किसान एग्रो (अष्टा)',
        type: 'competitor',
        distanceKm: 22.5,
        lat: 23.0200,
        lng: 76.5500,
        details: 'Secondary regional processor.',
        metric: '22.5km away'
      });
    }

    return {
      radiusKm,
      unmetDemandMt: unmetDemand,
      competitorsCount,
      mandiPricePerKg: 74.0,
      retailPricePerKg: 118.0,
      retailMarginSpread: 44.0,
      pins,
      mandiArrivalsTodayQuintals: 340,
      monthlyClusterConsumptionQuintals: clusterConsumption
    };
  }
}
