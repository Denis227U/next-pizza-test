import { Container } from '@/components/shared/container';
import { Filters } from '@/components/shared/filters';
import { ProductsGroupList } from '@/components/shared/products-group-list';
import { Title } from '@/components/shared/Title';
import { TopBar } from '@/components/shared/top-bar';
import DeleteForm from './delete-user';

export default async function Home() {
  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>

      {/* нужна т.к. это единственный способ удалить юзера для меня */}
      <DeleteForm />

      <TopBar />

      <Container className="mt-10 pb-14">
        <div className="flex gap-20">
          {/* Фильтрация */}
          <div className="w-62.5">
            <Filters />
          </div>

          {/* Список товаров */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              <ProductsGroupList
                title={'Пиццы'}
                categoryId={1}
                items={[
                  {
                    id: 1,
                    name: 'Чизбургер-пицца',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:233x233/0198bf47733e787a98ed55d13e9a2251.avif',
                    price: 550,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 2,
                    name: 'Чизбургер-пицца',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:233x233/0198bf47733e787a98ed55d13e9a2251.avif',
                    price: 550,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 3,
                    name: 'Чизбургер-пицца',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:233x233/0198bf47733e787a98ed55d13e9a2251.avif',
                    price: 550,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 4,
                    name: 'Чизбургер-пицца',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:233x233/0198bf47733e787a98ed55d13e9a2251.avif',
                    price: 550,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 5,
                    name: 'Чизбургер-пицца',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:233x233/0198bf47733e787a98ed55d13e9a2251.avif',
                    price: 550,
                    items: [{ price: 550 }],
                  },
                ]}
              />

              <ProductsGroupList
                title={'Завтрак'}
                categoryId={2}
                items={[
                  {
                    id: 1,
                    name: 'Чизбургер-пицца',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:233x233/0198bf47733e787a98ed55d13e9a2251.avif',
                    price: 550,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 2,
                    name: 'Чизбургер-пицца',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:233x233/0198bf47733e787a98ed55d13e9a2251.avif',
                    price: 550,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 3,
                    name: 'Чизбургер-пицца',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:233x233/0198bf47733e787a98ed55d13e9a2251.avif',
                    price: 550,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 4,
                    name: 'Чизбургер-пицца',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:233x233/0198bf47733e787a98ed55d13e9a2251.avif',
                    price: 550,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 5,
                    name: 'Чизбургер-пицца',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:233x233/0198bf47733e787a98ed55d13e9a2251.avif',
                    price: 550,
                    items: [{ price: 550 }],
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
