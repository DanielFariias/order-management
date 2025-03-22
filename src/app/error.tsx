'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-4xl font-bold mb-4">Algo deu errado</h1>
      <p className="text-muted-foreground mb-8 text-center">
        Ocorreu um erro ao carregar esta página.
      </p>
      <Button onClick={reset}>Tentar novamente</Button>
    </div>
  );
}
