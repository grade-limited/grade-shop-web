export type ICreateOrder = {
  product_list: string[];
  registered_from: string;
  recipient_name: string;
  recipient_number: string;
  recipient_email: string;
  recipient_address: string;
  delivery_fee: number;
  discount: number;
};
