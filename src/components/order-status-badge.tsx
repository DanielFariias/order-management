import { Badge } from '@/components/ui/badge';

interface OrderStatusBadgeProps {
  status: string;
}

export default function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pendente':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100';
      case 'em processamento':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-100';
      case 'enviado':
        return 'bg-purple-100 text-purple-800 hover:bg-purple-100';
      case 'entregue':
        return 'bg-green-100 text-green-800 hover:bg-green-100';
      case 'cancelado':
        return 'bg-red-100 text-red-800 hover:bg-red-100';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
    }
  };

  return (
    <Badge className={`${getStatusColor(status)} font-medium`} variant="outline">
      {status}
    </Badge>
  );
}
