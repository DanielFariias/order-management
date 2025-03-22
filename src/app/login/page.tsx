'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

import { AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [forgotPassword, setForgotPassword] = useState(false);

  async function handleSubmit(e: React.FormEvent | React.MouseEvent) {
    e.preventDefault();

    setError(null);
    setLoading(true);

    if (!email || !password) {
      setError('Por favor, preencha todos os campos');
      setLoading(false);
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (email === 'admin@exemplo.com' && password === 'senha123') {
        document.cookie = 'auth=true; path=/; max-age=3600';
        router.push('/orders');
      } else {
        setError('Email ou senha inválidos');
      }
    } catch (err) {
      setError('Erro ao fazer login. Tente novamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/30">
      {!forgotPassword && (
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Entrar</CardTitle>
              <CardDescription>Digite suas credenciais para acessar o sistema</CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-4 flex gap-3 items-center">
                  <div className="h-4 w-4">
                    <AlertCircle size={16} />
                  </div>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Senha</Label>
                    <Button
                      variant="link"
                      className="p-0 h-auto text-xs"
                      type="button"
                      onClick={() => setForgotPassword(true)}
                    >
                      Esqueceu a senha?
                    </Button>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={handleSubmit}
                disabled={loading}
                data-testid="login-button"
                type="submit"
              >
                {loading ? 'Entrando...' : 'Entrar'}
              </Button>
            </CardFooter>
          </Card>
        </form>
      )}

      {forgotPassword && <ForgotPasswordCard onChangeForgotPassword={setForgotPassword} />}
    </div>
  );
}

function ForgotPasswordCard({
  onChangeForgotPassword,
}: {
  onChangeForgotPassword: (value: boolean) => void;
}) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Dica de Acesso</CardTitle>
        <CardDescription>Use as credenciais abaixo para acessar o sistema.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-1">
          <Label>Email</Label>
          <p className="text-muted-foreground">admin@exemplo.com</p>
        </div>
        <div className="space-y-1">
          <Label>Senha</Label>
          <p className="text-muted-foreground">senha123</p>
        </div>
      </CardContent>
      <CardFooter className="mt-4">
        <Button className="w-full" onClick={() => onChangeForgotPassword(false)}>
          Voltar para Login
        </Button>
      </CardFooter>
    </Card>
  );
}
