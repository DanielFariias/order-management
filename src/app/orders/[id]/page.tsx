'use client';

import { useEffect, useState } from 'react';

import { useParams, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { LoadingSpinner } from '@/components/loading-spinner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { IOrder } from '@/@types/order';

import { getOrderById } from '@/lib/api';
import { formatCurrency, formatDate } from '@/lib/utils';

import { ArrowLeft, Calendar, Truck } from 'lucide-react';
import OrderStatusBadge from '@/components/order-status-badge';
import { Image } from '@/components/image';

export default function OrderDetailsPage() {
  const router = useRouter();

  const { id } = useParams();
  const [order, setOrder] = useState<IOrder | null>(null);

  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    const getOrder = async () => {
      try {
        setLoading(true);
        const dados = await getOrderById(id as string);
        setOrder(dados);
      } catch (err) {
        setErro('Falha ao carregar detalhes do pedido. Por favor, tente novamente.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      getOrder();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (erro || !order) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Erro</h2>
          <p className="mb-6">{erro || 'Pedido não encontrado'}</p>
          <Button onClick={() => router.push('/orders')}>Voltar para Pedidos</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="ghost"
        className="mb-6 flex items-center gap-2"
        onClick={() => router.push('/orders')}
      >
        <ArrowLeft size={16} />
        Voltar para Pedidos
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-2xl">Pedido #{order.id}</CardTitle>
                <p className="text-muted-foreground">UUID: {order.uuid}</p>
              </div>
              <OrderStatusBadge status={order.status} />
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Informações do Cliente</h3>
                  <p className="text-lg font-medium">{order.customer.name}</p>
                  <p className="text-muted-foreground">{order.customer.address}</p>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Informações de Entrega</h3>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <Truck size={18} className="text-muted-foreground" />
                      <span>{order.shipping_method}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={18} className="text-muted-foreground" />
                      <span>Entrega estimada: {formatDate(order.delivery_estimated)}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-4">Itens do Pedido</h3>
                  <div className="space-y-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                          <Image
                            src={item.imagem || '/placeholder.svg'}
                            alt={item.name}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Quantidade: {item.quantity}
                          </p>
                        </div>
                        <p className="font-medium">{formatCurrency(item.price)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Resumo do Pedido</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatCurrency(order.total - order.delivery_cost)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Entrega</span>
                  <span>{formatCurrency(order.delivery_cost)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium text-lg">
                  <span>Total</span>
                  <span>{formatCurrency(order.total)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
