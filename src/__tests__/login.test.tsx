import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import LoginPage from '@/app/login/page';

vi.mock('next/navigation', () => {
  return {
    useRouter: () => ({
      push: vi.fn(),
    }),
  };
});

describe('LoginPage', () => {
  it('renderiza o formulário de login corretamente', () => {
    render(<LoginPage />);

    expect(screen.getByTestId('login-button')).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Senha/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Entrar/i })).toBeInTheDocument();
    expect(screen.getByText(/Esqueceu a senha/i)).toBeInTheDocument();
  });

  it('exibe erro quando os campos estão vazios', async () => {
    render(<LoginPage />);

    const botaoEntrar = screen.getByRole('button', { name: /Entrar/i });
    fireEvent.click(botaoEntrar);

    await waitFor(() => {
      expect(screen.getByText('Por favor, preencha todos os campos')).toBeInTheDocument();
    });
  });

  it('exibe erro para credenciais inválidas', async () => {
    render(<LoginPage />);

    const emailInput = screen.getByLabelText(/Email/i);
    const senhaInput = screen.getByLabelText(/Senha/i);
    const botaoEntrar = screen.getByRole('button', { name: /Entrar/i });

    fireEvent.change(emailInput, { target: { value: 'usuario@exemplo.com' } });
    fireEvent.change(senhaInput, { target: { value: 'senhaerrada' } });
    fireEvent.click(botaoEntrar);

    await waitFor(() => {
      expect(screen.getByTestId('error-alert-description')).toBeInTheDocument();
    });
  });

  it('mostra estado de carregamento durante o login', async () => {
    render(<LoginPage />);

    const emailInput = screen.getByLabelText(/Email/i);
    const senhaInput = screen.getByLabelText(/Senha/i);
    const botaoEntrar = screen.getByRole('button', { name: /Entrar/i });

    fireEvent.change(emailInput, { target: { value: 'admin@exemplo.com' } });
    fireEvent.change(senhaInput, { target: { value: 'senha123' } });
    fireEvent.click(botaoEntrar);

    expect(screen.getByText('Entrando...')).toBeInTheDocument();

    await waitFor(
      () => {
        expect(screen.queryByText('Entrando...')).not.toBeInTheDocument();
      },
      { timeout: 2000 },
    );
  });
});
