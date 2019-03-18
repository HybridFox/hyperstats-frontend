export interface Toggle {
    id: string;
    isActivated: boolean;
}

export interface Remove {
  stepIndex: number;
  input: String;
}

export interface Process {
  data: {
    name: string,
    steps: any[];
  };
  meta: object;
  _id: string;
}

export const PROCESS_REPORT_STATE = {
    SAVED: 'SAVED',
    FILED: 'FILED',
    NOT_USED: 'NOT_USED',
};
