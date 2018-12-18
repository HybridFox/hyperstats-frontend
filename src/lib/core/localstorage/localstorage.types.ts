export enum LocalstorageType {
  localStorage = 'localStorage',
  sessionStorage = 'sessionStorage',
  memory = 'memory',
}

export interface LocalstorageConfig {
  storageType?: LocalstorageType;
  identifier?: string;
}

export type PropertySelector = string | number;
export type PathSelector = Array<string| number>;
export type FunctionSelector = (storage: any) => boolean;
export type Comparator = (x: any, y: any) => boolean;
export type Selector = PropertySelector | PathSelector | FunctionSelector;
export type PropertyDecorator = (target: any, propertyKey: string) => void;
