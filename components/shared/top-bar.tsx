import { cn } from '@/lib/utils';
import { Container } from './container';
import { Categories } from './categories';
import { SortPopup } from './sort-popup';

const CATEGORIES = [
  {
    id: 0,
    name: 'Комбо',
  },
  {
    id: 1,
    name: 'Пиццы',
  },
  {
    id: 2,
    name: 'Завтрак',
  },
  {
    id: 3,
    name: 'Коктейли',
  },
  {
    id: 4,
    name: 'Кофе',
  },
  {
    id: 5,
    name: 'Напитки',
  },
  {
    id: 6,
    name: 'Десерты',
  },
  {
    id: 7,
    name: 'Суши',
  },
];

interface Props {
  className?: string;
}

export const TopBar: React.FC<Props> = ({ className }) => {
  return (
    <div
      className={cn(
        'sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10',
        className,
      )}
    >
      <Container className="flex items-center justify-between ">
        <Categories items={CATEGORIES} />
        <SortPopup />
      </Container>
    </div>
  );
};
