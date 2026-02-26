import { cn } from '@/lib/utils';
import { useState } from 'react';

interface Category {
  id: number;
  name: string;
}

interface Props {
  items: Category[];
  className?: string;
}

export const Categories: React.FC<Props> = ({ className, items }) => {
  const [categoryActiveId, setCategoryActiveId] = useState(items[0].id);

  return (
    <div
      className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl', className)}
    >
      {items.map(({ name, id }, index) => (
        <a
          className={cn(
            'flex items-center font-bold h-11 rounded-2xl px-5',
            categoryActiveId === id &&
              'bg-white shadow-md shadow-gray-200 text-primary',
          )}
          href={`/#${name}`}
          key={index}
          onClick={(e) => {
            e.preventDefault();

            setCategoryActiveId(id);
          }}
        >
          <button>{name}</button>
        </a>
      ))}
    </div>
  );
};
