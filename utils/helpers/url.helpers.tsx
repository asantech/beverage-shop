export function convertObjToURLQueryStr(urlQueryObj: any) {
  const urlQueryStr = Object.entries(urlQueryObj)
    .map(([key, val]) => `${key}=${val}`)
    .join('&');
  return urlQueryStr ? '?' + urlQueryStr : '';
}

export function createdURLQueryObj(tabID: string, page: number) {
  return {
    ...(() => {
      return tabID ? { food: tabID } : {}; // todo: check code strucuture from the clean code aspect
    })(),
    page: page,
  };
}
