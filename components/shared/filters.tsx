import { Input } from '../ui/input';
import { CheckboxFiltersGroup } from './checkbox-filters-group';
import { RangeSlider } from './range-slider';
import { Title } from './Title';

interface Props {
  className?: string;
}

const INGRIGIENTS = [
  {
    text: 'Сырный соус',
    value: '1',
  },
  {
    text: 'Моццарелла',
    value: '2',
  },
  {
    text: 'Чеснок',
    value: '3',
  },
  {
    text: 'Соленые огурчики',
    value: '4',
  },
  {
    text: 'Красный лук',
    value: '5',
  },
  {
    text: 'Томаты',
    value: '6',
  },
  {
    text: 'Соус песто',
    value: '7',
  },
];

export const Filters: React.FC<Props> = ({ className }) => {
  return (
    <div className={className}>
      <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />

      {/* Верхние чекбоксы */}
      <CheckboxFiltersGroup
        title="Тип теста"
        name="pizzaTypes"
        className="mb-5"
        items={[
          { text: 'Тонкое', value: '1' },
          { text: 'Традиционное', value: '2' },
        ]}
      />

      <CheckboxFiltersGroup
        title="Размеры"
        name="sizes"
        className="mb-5"
        items={[
          { text: '20 см', value: '20' },
          { text: '30 см', value: '30' },
          { text: '40 см', value: '40' },
        ]}
      />

      {/* Фильтр цен */}
      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Цена от и до:</p>

        <div className="flex gap-3 mb-5">
          <Input type="number" placeholder="0" min={0} max={1000} />
          <Input type="number" min={100} max={1000} placeholder="1000" />
        </div>

        <RangeSlider min={0} max={1000} step={10} value={[0, 1000]} />
      </div>

      <CheckboxFiltersGroup
        title="Ингредиенты"
        name="ingredients"
        className="mt-5"
        limit={6}
        defaultItems={INGRIGIENTS}
        items={INGRIGIENTS}
      />
    </div>
  );
};
