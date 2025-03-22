import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ImageIcon } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
  fallbackIconSize?: number;
}

export function Image({
  src,
  alt,
  className,
  fallbackIconSize = 32,
  ...props
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div className={cn('flex items-center justify-center bg-muted border rounded-md', className)}>
        <ImageIcon className="text-muted-foreground" size={fallbackIconSize} />
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={cn('object-cover rounded-md', className)}
      onError={() => setHasError(true)}
      {...props}
    />
  );
}
