export interface MenuItem {
  link: string[];
  queryParams?: any;
  label: string;
  class?: string;
}

export interface StepMenuItem {
  link: string[];
  queryParams?: any;
  label: string;
  valid: boolean;
}
