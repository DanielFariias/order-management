import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import type { IOrder } from '@/@types/order';
import { OrderCard } from '@/components/order-card';

vi.mock('next/link', () => {
  return {
    __esModule: true,
    default: ({ children, href }: { children: React.ReactNode; href: string }) => {
      return <a href={href}>{children}</a>;
    },
  };
});

describe('OrderCard', () => {
  const mockOrder: IOrder = {
    uuid: '123',
    id: '456',
    status: 'Pendente',
    total: 100.5,
    delivery_cost: 10,
    shipping_method: 'Entrega Expressa',
    delivery_estimated: '2025-02-17',
    customer: {
      name: 'John Doe',
      address: '123 Main St',
    },
    items: [
      {
        imagem: 'https://via.placeholder.com/150',
        name: 'Test Product',
        quantity: 2,
        price: 45.25,
      },
    ],
  };

  it('renders order information correctly', () => {
    render(<OrderCard order={mockOrder} />);

    expect(screen.getByText(/Pedido #456/i)).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('123 Main St')).toBeInTheDocument();
    expect(screen.getByText('Entrega Expressa')).toBeInTheDocument();

    expect(screen.getByText('Pendente')).toBeInTheDocument();

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('x2')).toBeInTheDocument();

    expect(screen.getByText('R$ 100,50')).toBeInTheDocument();
  });

  it('links to the order details page', () => {
    render(<OrderCard order={mockOrder} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/orders/456');
  });
});
