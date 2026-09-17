export interface DistrictData {
  name: string;
  nameHi: string;
  blocks: string[];
  primaryMandis: string[];
  majorCrops: string[];
  ruralZone: 'Zone A Rural' | 'Zone B Semi-Urban';
  powerTariffPerUnit: number;
}

export interface StateData {
  name: string;
  nameHi: string;
  districts: Record<string, DistrictData>;
}

export const GEOGRAPHY_DATA: Record<string, StateData> = {
  'Madhya Pradesh': {
    name: 'Madhya Pradesh',
    nameHi: 'मध्य प्रदेश',
    districts: {
      'Bhopal': {
        name: 'Bhopal',
        nameHi: 'भोपाल',
        blocks: ['Phanda Kalan', 'Berasia', 'Huzur'],
        primaryMandis: ['Sehore Krishi Upaj Mandi (14km)', 'Karond Krishi Mandi Bhopal (18km)', 'Berasia Mandi (28km)'],
        majorCrops: ['Gram / Chana', 'Arhar / Tuvar', 'Soybean', 'Wheat Sharbati'],
        ruralZone: 'Zone A Rural',
        powerTariffPerUnit: 4.80, // Subsidized agricultural feeder rate
      },
      'Sehore': {
        name: 'Sehore',
        nameHi: 'सीहोर',
        blocks: ['Sehore', 'Ashta', 'Ichhawar', 'Budhni', 'Nasrullaganj'],
        primaryMandis: ['Ashta APMC Mandi', 'Sehore Main Grain Yard', 'Ichhawar Mandi'],
        majorCrops: ['Chana', 'Soybean', 'Moong', 'Garlic'],
        ruralZone: 'Zone A Rural',
        powerTariffPerUnit: 4.80,
      },
      'Raisen': {
        name: 'Raisen',
        nameHi: 'रायसेन',
        blocks: ['Gairatganj', 'Begamganj', 'Silwani', 'Obedullaganj'],
        primaryMandis: ['Begamganj Mandi', 'Gairatganj Mandi'],
        majorCrops: ['Paddy / Basmati', 'Chana', 'Lentil / Masoor'],
        ruralZone: 'Zone A Rural',
        powerTariffPerUnit: 4.80,
      },
      'Vidisha': {
        name: 'Vidisha',
        nameHi: 'विदिशा',
        blocks: ['Vidisha', 'Basoda', 'Kurwai', 'Sironj'],
        primaryMandis: ['Ganj Basoda APMC Yard', 'Vidisha Mandi'],
        majorCrops: ['Sharbati Wheat', 'Gram', 'Mustard'],
        ruralZone: 'Zone A Rural',
        powerTariffPerUnit: 4.80,
      }
    }
  },
  'Uttar Pradesh': {
    name: 'Uttar Pradesh',
    nameHi: 'उत्तर प्रदेश',
    districts: {
      'Varanasi': {
        name: 'Varanasi',
        nameHi: 'वाराणसी',
        blocks: ['Arajiline', 'Kashi Vidyapeeth', 'Pindra', 'Cholapur'],
        primaryMandis: ['Varanasi APMC Yard', 'Rohaniya Sabzi Mandi'],
        majorCrops: ['Vegetables', 'Paddy', 'Mustard', 'Silk Weaving'],
        ruralZone: 'Zone A Rural',
        powerTariffPerUnit: 5.20,
      },
      'Jhansi': {
        name: 'Jhansi',
        nameHi: 'झांसी',
        blocks: ['Mauranipur', 'Babina', 'Moth', 'Gursarai'],
        primaryMandis: ['Mauranipur Mandi Yard', 'Jhansi Main Mandi'],
        majorCrops: ['Pulses', 'Oilseeds', 'Groundnut'],
        ruralZone: 'Zone A Rural',
        powerTariffPerUnit: 5.10,
      }
    }
  },
  'Rajasthan': {
    name: 'Rajasthan',
    nameHi: 'राजस्थान',
    districts: {
      'Jaipur': {
        name: 'Jaipur',
        nameHi: 'जयपुर',
        blocks: ['Chaksu', 'Bassi', 'Govindgarh', 'Kotputli'],
        primaryMandis: ['Muhana Mandi Yard', 'Chaksu APMC'],
        majorCrops: ['Mustard', 'Bajra', 'Barley'],
        ruralZone: 'Zone A Rural',
        powerTariffPerUnit: 5.40,
      },
      'Kota': {
        name: 'Kota',
        nameHi: 'कोटा',
        blocks: ['Ladpura', 'Sangod', 'Itawa', 'Sultanpur'],
        primaryMandis: ['Bhamashah Mandi Kota', 'Itawa Yard'],
        majorCrops: ['Soybean', 'Coriander', 'Wheat', 'Mustard'],
        ruralZone: 'Zone A Rural',
        powerTariffPerUnit: 5.30,
      }
    }
  }
};
