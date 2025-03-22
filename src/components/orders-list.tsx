'use client';

import { useState, useEffect } from 'react';

import { IOrder } from '@/@types/order';
import { getOrders } from '@/lib/api';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

import { OrderCard } from './order-card';
import { OrderFilters } from './order-filters';
import { LoadingSpinner } from './loading-spinner';

import { AlertCircle } from 'lucide-react';

export function OrdersList() {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    customerName: '',
    status: '',
  });

  useEffect(() => {
    async function fetchOrders() {
      try {
        setLoading(true);
        const data = await getOrders();

        setOrders(data);
        setFilteredOrders(data);
      } catch (err) {
        setError('Falha ao carregar pedidos. Por favor, tente novamente.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  useEffect(() => {
    let result = orders;

    if (filters.customerName) {
      result = result.filter((order) =>
        order.customer.name.toLowerCase().includes(filters.customerName.toLowerCase()),
      );
    }

    if (filters.status && filters.status !== 'all') {
      result = result.filter(
        (order) => order.status.toLowerCase() === filters.status.toLowerCase(),
      );
    }

    setFilteredOrders(result);
  }, [filters, orders]);

  const handleFilterChange = (name: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Erro</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <OrderFilters
        filters={{
          customerName: filters.customerName,
          status: filters.status,
        }}
        onFilterChange={handleFilterChange}
        statusOptions={Array.from(new Set(orders.map((order) => order.status)))}
      />

      {filteredOrders.length === 0 && (
        <div className="text-center py-12 border rounded-lg">
          <h3 className="text-lg font-medium">Nenhum pedido encontrado</h3>
          <p className="text-muted-foreground">Tente ajustar seus filtros</p>
        </div>
      )}

      {filteredOrders.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}
