import { OrderFilters } from '@/components/order-filters';
import { render, screen, fireEvent } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('OrderFilters', () => {
  const mockStatusOptions = ['Pendente', 'Entregue', 'Em Processamento'];
  const mockFilters = {
    customerName: '',
    status: '',
  };
  const mockOnFilterChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders filter inputs correctly', () => {
    render(
      <OrderFilters
        filters={mockFilters}
        statusOptions={mockStatusOptions}
        onFilterChange={mockOnFilterChange}
      />,
    );

    expect(screen.getByLabelText(/Nome do Cliente/i)).toBeInTheDocument();
    expect(screen.getByText(/Todos os status/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Limpar Filtros/i })).toBeInTheDocument();
  });

  it('calls onFilterChange when customer name input changes', () => {
    render(
      <OrderFilters
        filters={mockFilters}
        statusOptions={mockStatusOptions}
        onFilterChange={mockOnFilterChange}
      />,
    );

    const input = screen.getByLabelText(/Nome do Cliente/i);
    fireEvent.change(input, { target: { value: 'John' } });

    expect(mockOnFilterChange).toHaveBeenCalledWith('customerName', 'John');
  });

  it('disables clear filters button when no filters are applied', () => {
    render(
      <OrderFilters
        filters={mockFilters}
        statusOptions={mockStatusOptions}
        onFilterChange={mockOnFilterChange}
      />,
    );

    const clearButton = screen.getByRole('button', { name: /Limpar Filtros/i });
    expect(clearButton).toBeDisabled();
  });

  it('enables clear filters button when filters are applied', () => {
    render(
      <OrderFilters
        filters={{ customerName: 'John', status: '' }}
        statusOptions={mockStatusOptions}
        onFilterChange={mockOnFilterChange}
      />,
    );

    const clearButton = screen.getByRole('button', { name: /Limpar Filtros/i });
    expect(clearButton).not.toBeDisabled();
  });

  it('clears all filters when clear button is clicked', () => {
    render(
      <OrderFilters
        filters={{ customerName: 'John', status: 'Pendente' }}
        statusOptions={mockStatusOptions}
        onFilterChange={mockOnFilterChange}
      />,
    );

    const clearButton = screen.getByRole('button', { name: /Limpar Filtros/i });
    fireEvent.click(clearButton);

    expect(mockOnFilterChange).toHaveBeenCalledWith('customerName', '');
    expect(mockOnFilterChange).toHaveBeenCalledWith('status', '');
  });
});
