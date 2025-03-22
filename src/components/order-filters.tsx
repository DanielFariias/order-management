'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';

interface OrderFiltersProps {
  filters: {
    customerName: string;
    status: string;
  };
  statusOptions: string[];
  onFilterChange: (name: string, value: string) => void;
}

export function OrderFilters({ filters, statusOptions, onFilterChange }: OrderFiltersProps) {
  const clearFilters = () => {
    onFilterChange('customerName', '');
    onFilterChange('status', '');
  };

  return (
    <div className="bg-muted/40 p-6 rounded-lg mb-6">
      <h2 className="text-lg font-medium mb-4">Filtrar Pedidos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label htmlFor="customerName">Nome do Cliente</Label>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="customerName"
              placeholder="Buscar por nome do cliente"
              className="pl-8"
              value={filters.customerName}
              onChange={(e) => onFilterChange('customerName', e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status do Pedido</Label>
          <Select value={filters.status} onValueChange={(value) => onFilterChange('status', value)}>
            <SelectTrigger id="status">
              <SelectValue placeholder="Todos os status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os status</SelectItem>
              {statusOptions.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-end">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={clearFilters}
            disabled={!filters.customerName && !filters.status}
          >
            <X size={16} />
            Limpar Filtros
          </Button>
        </div>
      </div>
    </div>
  );
}
