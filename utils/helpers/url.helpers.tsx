export function convertObjToURLQueryStr(urlQueryObj: any): string {
  const urlQueryStr: string = Object.entries(urlQueryObj)
    .map(([key, val]) => `${key}=${val}`)
    .join('&');
  return urlQueryStr ? '?' + urlQueryStr : '';
}  

export function createdURLQueryObj(tabID: string, page: number) {
  return {
    ...(() => {
      return tabID ? { food: tabID } : {}; // todo: check code structure from the clean code aspect
    })(),
    page: page,
  };
}  
