import ordersJson from './orders.json';

import { IOrder } from '@/@types/order';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getOrders(): Promise<IOrder[]> {
  await sleep(800);
  return ordersJson.orders;
}

export async function getOrderById(id: string): Promise<IOrder> {
  await sleep(600);

  const order = ordersJson.orders.find((order) => order.id === id);

  if (!order) {
    throw new Error(`Pedido com ID ${id} não encontrado`);
  }

  return order;
}
