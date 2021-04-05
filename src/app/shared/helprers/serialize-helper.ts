export const serialize = (obj: { [key: string]: any }) =>
Object.keys(obj)
  .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`)
  .join('&');
