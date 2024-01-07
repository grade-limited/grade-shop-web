export type IUserId = number | null;
export type ICartId = string | number | undefined;
export interface IOption {
  value?: string | number | null;
  label: string;
  children?: IOption[];
  data?: any;
}
