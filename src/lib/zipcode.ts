import data from '../data/zipcodes.json';

export const randomZipCodePeru = () => {
  const zipCodes = data as Array<{ latitude: string; longitude: string }>;
  const index = Math.floor(Math.random() * zipCodes.length);
  const randomZipCode = zipCodes[index];
  return `${randomZipCode.latitude},${randomZipCode.longitude}`;
};
