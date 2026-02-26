import { Container } from '@/components/shared/container';
import { Filters } from '@/components/shared/filters';
import { Title } from '@/components/shared/Title';
import { TopBar } from '@/components/shared/top-bar';

export default function Home() {
  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>

      <TopBar />

      <Container className="mt-10 pb-14">
        <div className="flex gap-20">
          {/* Фильтрация */}
          <div className="w-62.5">
            <Filters />
          </div>

          {/* Список товаров */}
          <div>Товары</div>
        </div>
      </Container>
    </>
  );
}
