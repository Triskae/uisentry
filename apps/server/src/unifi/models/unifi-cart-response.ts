export interface UnifiCartResponse {
  errors: UnifiError[];
  data: null;
}

export interface UnifiError {
  message: string;
  extensions: UnifiExtensions;
}

export interface UnifiExtensions {
  limitationReasons: LimitationReasons[];
  code: UnifiLimitationCode;
}

export enum UnifiLimitationCode {
  LIMITATION_ERROR = 'LIMITATION_ERROR',
}

export interface LimitationReasons {
  isPerClient: boolean;
  requires: unknown[];
  type: string;
  appliesTo: string[];
  quantityAllowed: number;
  quantityGiven: number;
}
