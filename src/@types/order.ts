export interface IOrder {
  uuid: string;
  id: string;
  status: string;
  total: number;
  delivery_cost: number;
  shipping_method: string;
  delivery_estimated: string;
  customer: {
    name: string;
    address: string;
  };
  items: {
    imagem: string;
    name: string;
    quantity: number;
    price: number;
  }[];
}
