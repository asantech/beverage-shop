const rootElements: any = {};

export function setRootElementCreator(rootElementObj: any) {
  const [[key, val]]: any = Object.entries(rootElementObj);

  rootElements[key] = {
    creatorFunc: val,
    element: val(),
  };
}

export function getRootElement(key: string) {
  rootElements[key].element.unmount();

  rootElements[key].element = rootElements[key].creatorFunc();
  return rootElements[key].element;
}
