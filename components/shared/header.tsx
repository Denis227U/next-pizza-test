import React from 'react';
import { Container } from './container';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { User } from 'lucide-react';
import { CartButton } from './cart-button';

interface Props {
  className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
  return (
    <header className={cn('border-b', className)}>
      <Container className="flex items-center justify-between py-8">
        {/* Левая часть */}
        <div className="flex items-center gap-4">
          <img src="/logo.png" alt="Logo" width={35} height={35} />
          <div>
            <h1 className="text-2xl uppercase font-black">Next Pizza</h1>
            <p className="text-sm text-gray-400 leading-3">
              вкусней уже некуда
            </p>
          </div>
        </div>

        {/* Правая часть */}
        <div className="flex items-center gap-3">
          <Button variant={'outline'}>
            <User />
            Войти
          </Button>

          <CartButton />
        </div>
      </Container>
    </header>
  );
};
