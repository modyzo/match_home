import { detailsReesponse } from '@app/shared/constants/variables';
export const adaptDataToNormalizedInfo = (
  data: any,
  currency: string = '$'
) => {
  const adaptedData = [];
  for (const iterator of data) {
    const translate = detailsReesponse[iterator.id];
    if (iterator.type === 'year' || iterator.type === 'int') {
      adaptedData.push(`${translate}: ${iterator.value}`);
    }
    if (iterator.type === 'yes/no') {
      adaptedData.push(`${translate}: ${iterator.value ? 'Ja' : 'Nee'}`);
    }
    if (iterator.type === 'length') {
      adaptedData.push(`${translate}: ${iterator.value} m`);
    }
    if (iterator.type === 'price') {
      adaptedData.push(`${translate}: ${iterator.value} ${currency}`);
    }
    if (iterator.type === 'surface') {
      adaptedData.push(`${translate}: ${iterator.value} м²`);
    }
  }
  return data;
};
