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
<<<<<<< HEAD
  },
  'Maharashtra': {
    name: 'Maharashtra',
    nameHi: 'महाराष्ट्र',
    districts: {
      'Pune': {
        name: 'Pune',
        nameHi: 'पुणे',
        blocks: ['Haveli', 'Baramati', 'Khed', 'Shirur', 'Junner'],
        primaryMandis: ['Gultekdi Market Yard Pune', 'Baramati APMC'],
        majorCrops: ['Sugarcane', 'Onion', 'Pomegranate', 'Grapes'],
        ruralZone: 'Zone B Semi-Urban',
        powerTariffPerUnit: 5.80,
      },
      'Nagpur': {
        name: 'Nagpur',
        nameHi: 'नागपुर',
        blocks: ['Nagpur Rural', 'Katol', 'Kalmeshwar', 'Saoner', 'Umred'],
        primaryMandis: ['Kalamna Market Yard Nagpur', 'Katol Orange Mandi'],
        majorCrops: ['Orange / Citrus', 'Cotton', 'Soybean', 'Paddy'],
        ruralZone: 'Zone A Rural',
        powerTariffPerUnit: 5.50,
      },
      'Nashik': {
        name: 'Nashik',
        nameHi: 'नासिक',
        blocks: ['Nashik', 'Niphad', 'Lasalgaon', 'Sinnar', 'Yeola'],
        primaryMandis: ['Lasalgaon Onion Mandi (Asia Largest)', 'Pimpalgaon APMC'],
        majorCrops: ['Onion', 'Grapes', 'Tomato', 'Maize'],
        ruralZone: 'Zone A Rural',
        powerTariffPerUnit: 5.60,
      }
    }
  },
  'Gujarat': {
    name: 'Gujarat',
    nameHi: 'गुजरात',
    districts: {
      'Ahmedabad': {
        name: 'Ahmedabad',
        nameHi: 'अहमदाबाद',
        blocks: ['Daskroi', 'Sanand', 'Dholka', 'Bavla', 'Viramgam'],
        primaryMandis: ['APMC Jamalpur', 'Bavla Rice & Cotton Market Yard'],
        majorCrops: ['Cotton', 'Wheat', 'Castor', 'Paddy'],
        ruralZone: 'Zone B Semi-Urban',
        powerTariffPerUnit: 5.40,
      },
      'Rajkot': {
        name: 'Rajkot',
        nameHi: 'राजकोट',
        blocks: ['Rajkot', 'Gondal', 'Jetpur', 'Dhoraji', 'Jasdan'],
        primaryMandis: ['Gondal APMC (Largest Groundnut Mandi)', 'Bedi Yard Rajkot'],
        majorCrops: ['Groundnut / Peanut', 'Cotton', 'Sesame', 'Chilli'],
        ruralZone: 'Zone A Rural',
        powerTariffPerUnit: 5.20,
      }
    }
  },
  'Bihar': {
    name: 'Bihar',
    nameHi: 'बिहार',
    districts: {
      'Patna': {
        name: 'Patna',
        nameHi: 'पटना',
        blocks: ['Phulwari Sharif', 'Bikram', 'Danapur', 'Bakhtiarpur', 'Bihta'],
        primaryMandis: ['Mithapur Wholesale Market', 'Bihta Grain Yard'],
        majorCrops: ['Paddy', 'Wheat', 'Maize', 'Vegetables'],
        ruralZone: 'Zone B Semi-Urban',
        powerTariffPerUnit: 5.00,
      },
      'Muzaffarpur': {
        name: 'Muzaffarpur',
        nameHi: 'मुजफ्फरपुर',
        blocks: ['Mushahari', 'Kanti', 'Motipur', 'Sakra', 'Minapur'],
        primaryMandis: ['Khabra Bazar Samiti', 'Motipur Mandi'],
        majorCrops: ['Shahi Litchi', 'Mango', 'Paddy', 'Maize'],
        ruralZone: 'Zone A Rural',
        powerTariffPerUnit: 4.90,
      }
    }
  },
  'Punjab': {
    name: 'Punjab',
    nameHi: 'पंजाब',
    districts: {
      'Ludhiana': {
        name: 'Ludhiana',
        nameHi: 'लुधियाना',
        blocks: ['Ludhiana-1', 'Jagraon', 'Samrala', 'Khanna', 'Payal'],
        primaryMandis: ['Khanna Grain Market (Asia Largest)', 'Ludhiana New Grain Yard'],
        majorCrops: ['Wheat', 'Paddy', 'Maize', 'Dairy Feed'],
        ruralZone: 'Zone A Rural',
        powerTariffPerUnit: 5.10,
      }
    }
  },
  'Karnataka': {
    name: 'Karnataka',
    nameHi: 'कर्नाटक',
    districts: {
      'Bengaluru Urban': {
        name: 'Bengaluru Urban',
        nameHi: 'बेंगलुरु अर्बन',
        blocks: ['Bengaluru North', 'Bengaluru South', 'Bengaluru East', 'Anekal'],
        primaryMandis: ['Yeshwanthpur APMC Yard', 'K.R. Market'],
        majorCrops: ['Vegetables', 'Flowers', 'Ragi', 'Silk / Mulberry'],
        ruralZone: 'Zone B Semi-Urban',
        powerTariffPerUnit: 5.90,
      }
    }
  },
  'Delhi': {
    name: 'Delhi',
    nameHi: 'दिल्ली',
    districts: {
      'New Delhi': {
        name: 'New Delhi',
        nameHi: 'नई दिल्ली',
        blocks: ['Chanakyapuri', 'Connaught Place', 'Vasant Vihar'],
        primaryMandis: ['Azadpur Sabzi Mandi (Asia Largest)', 'Okhla Mandi'],
        majorCrops: ['Urban Agro Processing', 'Hydroponics', 'Food Packaging'],
        ruralZone: 'Zone B Semi-Urban',
        powerTariffPerUnit: 6.20,
      }
    }
=======
>>>>>>> f1737c756f8b193a0cc271a663e4f23a85f6dcb7
  }
};
