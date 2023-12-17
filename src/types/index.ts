export type IUserId = number | null;

export interface IOption {
  value?: string | number | null;
  label: string;
  children?: IOption[];
  data?: any;
}
