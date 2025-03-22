import { OrdersList } from '@/components/orders-list';

export default function ManagementOrdersPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Gerenciamento de Pedidos</h1>
      <div className="space-y-6">
        <OrdersList />
      </div>
    </main>
  );
}
