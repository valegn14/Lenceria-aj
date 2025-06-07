// Data from Kaggle dataset (example structure)
const rawData = [
 {
   year: 2022,
   solarConsumption: 5397.994,
   windGeneration: 2177.561,
   hydroConsumption: 4297.264,
   biofuelProduction: 2059.774,
   geothermalCapacity: 16.014,
 },
 // Add more years of data as needed
];

// Get the range of years from the dataset
export const getYearRange = () => {
 const years = rawData.map((d) => d.year);
 return {
   minYear: Math.min(...years),
   maxYear: Math.max(...years),
 };
};

// Get renewable production data for a range of years
export const getProductionData = (startYear, endYear) => {
 return rawData
   .filter((data) => data.year >= startYear && data.year <= endYear)
   .map((data) => ({
     year: data.year,
     wind: data.windGeneration,
     solar: data.solarConsumption,
     hydro: data.hydroConsumption,
     biofuel: data.biofuelProduction,
     geothermal: data.geothermalCapacity,
   }));
};

// Get renewable shares for a specific year
export const getShareData = (year) => {
 const yearData = rawData.find((d) => d.year === year);
 if (!yearData) throw new Error('Year not found');

 const total =
   yearData.solarConsumption +
   yearData.windGeneration +
   yearData.hydroConsumption +
   yearData.biofuelProduction +
   yearData.geothermalCapacity;

 return {
   wind: (yearData.windGeneration / total) * 100,
   solar: (yearData.solarConsumption / total) * 100,
   hydro: (yearData.hydroConsumption / total) * 100,
   total,
 };
};

// Calculate the renewable share based on consumption
export const calculateRenewableShare = (consumption) => {
 const latestYear = rawData[rawData.length - 1];
 const totalRenewable =
   latestYear.solarConsumption +
   latestYear.windGeneration +
   latestYear.hydroConsumption +
   latestYear.biofuelProduction;

 const renewablePercentage = 0.35; // 35% of total energy is renewable
 return consumption * renewablePercentage;
};

// Get capacity trends for a range of years
export const getCapacityTrends = (startYear, endYear) => {
 return rawData
   .filter((data) => data.year >= startYear && data.year <= endYear)
   .map((data) => ({
     year: data.year,
     wind: data.windGeneration,
     solar: data.solarConsumption,
     geothermal: data.geothermalCapacity,
   }));
};

// Get a comparison of renewable vs. conventional energy consumption
export const getConsumptionComparison = (startYear, endYear) => {
 return rawData
   .filter((data) => data.year >= startYear && data.year <= endYear)
   .map((data) => {
     const renewable =
       data.solarConsumption +
       data.windGeneration +
       data.hydroConsumption +
       data.biofuelProduction;
     const conventional = renewable * (1 / 0.35 - 1); // Based on 35% renewable share
     return {
       year: data.year,
       renewable,
       conventional,
     };
   });
};
