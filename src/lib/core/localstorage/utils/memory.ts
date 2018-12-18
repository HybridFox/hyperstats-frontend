export const verifyStorageType = (storageType?: string, defaultValue: string = 'memory'): string => {
  const storageTypeExists = window.hasOwnProperty(storageType) && window[storageType] instanceof (window as any).Storage;

  if (storageTypeExists) {
    return storageType;
  }

  // if storage type does not exist, verify defaultValue until found or memory was set as default
  return storageType === 'memory' ? 'memory' : verifyStorageType(defaultValue);
};
