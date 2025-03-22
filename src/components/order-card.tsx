import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import type { IOrder } from '@/@types/order';
import { formatCurrency, formatDate } from '@/lib/utils';
import OrderStatusBadge from './order-status-badge';
import { Calendar, MapPin } from 'lucide-react';

interface OrderCardProps {
  order: IOrder;
}

export function OrderCard({ order }: OrderCardProps) {
  return (
    <Link href={`/orders/${order.id}`}>
      <Card className="h-full transition-all hover:shadow-md">
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
          <div>
            <h3 className="font-bold">Pedido #{order.id}</h3>
            <p className="text-sm text-muted-foreground">{order.customer.name}</p>
          </div>
          <OrderStatusBadge status={order.status} />
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <MapPin size={16} className="text-muted-foreground" />
              <span className="text-muted-foreground truncate">{order.customer.address}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar size={16} className="text-muted-foreground" />
              <span className="text-muted-foreground">
                Entrega estimada: {formatDate(order.delivery_estimated)}
              </span>
            </div>
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Itens:</h4>
              <ul className="space-y-1">
                {order.items.map((item, index) => (
                  <li key={index} className="text-sm flex justify-between">
                    <span className="truncate mr-2">{item.name}</span>
                    <span className="text-muted-foreground">x{item.quantity}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-4">
          <div className="flex justify-between w-full">
            <span className="text-sm text-muted-foreground">Entrega:</span>
            <span className="font-medium">{order.shipping_method}</span>
          </div>
        </CardFooter>
        <CardFooter className="pt-0">
          <div className="flex justify-between w-full">
            <span className="text-sm text-muted-foreground">Total:</span>
            <span className="font-bold">{formatCurrency(order.total)}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
