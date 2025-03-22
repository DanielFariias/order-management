import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-medium mb-6">Página Não Encontrada</h2>
      <p className="text-muted-foreground mb-8 text-center">
        A página que você está procurando não existe ou foi movida.
      </p>
      <Button asChild>
        <Link href="/">Voltar para Início</Link>
      </Button>
    </div>
  );
}
