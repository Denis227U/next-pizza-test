import 'dotenv/config';
import { Prisma, PrismaClient } from '../app/generated/prisma/client';
import pg from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { carts, categories, ingredients, products, users } from './constants';

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

// 2. Обертываем его в адаптер Prisma
const adapter = new PrismaPg(pool);

// 3. Передаем адаптер в конструктор (используем as any для обхода типов Prisma 7)
const prisma = new PrismaClient({ adapter } as any);

const randomDecimalNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};

const generateProductItem = ({
  productId,
  pizzaType,
  size,
}: {
  productId: number;
  pizzaType?: 1 | 2;
  size?: 20 | 30 | 40;
}) => {
  return {
    productId,
    price: randomDecimalNumber(190, 600),
    pizzaType,
    size,
  } as Prisma.ProductItemUncheckedCreateInput;
};

async function main() {
  console.log('--- Очистка базы данных ---');
  // Трюк для PostgreSQL: очищаем все таблицы одной командой и сбрасываем счетчики ID
  // Очищаем таблицы в порядке, который не нарушает Foreign Key constraints
  // Сначала связующие таблицы и корзины
  await prisma.$executeRaw`TRUNCATE TABLE
    "User",
    "CartItem",
    "Cart",
    "Order",
    "VerificationCode",
    "ProductItem",
    "Product",
    "Category",
    "Ingredient",
    "_IngredientToProduct",
    "_CartItemToIngredient"
    RESTART IDENTITY CASCADE;`;

  console.log('🌱 Начинается заполнение базы данных...');

  console.log('Генерация категорий...');
  for (const category of categories) {
    await prisma.category.create({ data: category });
  }

  console.log('Генерация пользоватеелй...');
  // for (const user of users) {
  //   await prisma.user.upsert({
  //     where: { email: user.email },
  //     update: {}, // Если пользователь найден, ничего не меняем
  //     create: user,
  //   });
  // }
  const createdUsers = [];
  for (const user of users) {
    const dbUser = await prisma.user.create({
      data: user,
    });
    createdUsers.push(dbUser);
  }

  console.log('Генерация ингредиентов...');
  for (const ingredient of ingredients) {
    await prisma.ingredient.create({ data: ingredient });
  }

  console.log('Генерация продуктов...');
  for (const product of products) {
    await prisma.product.create({ data: product });
  }

  console.log('Генерация пицц...');
  const pizza1 = await prisma.product.create({
    data: {
      name: 'Пепперони фреш',
      imageUrl:
        'https://media.dodostatic.net/image/r:233x233/11EE7D61304FAF5A98A6958F2BB2D260.webp',
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(0, 5),
      },
    },
  });

  const pizza2 = await prisma.product.create({
    data: {
      name: 'Сырная',
      imageUrl:
        'https://media.dodostatic.net/image/r:233x233/11EE7D610CF7E265B7C72BE5AE757CA7.webp',
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(5, 10),
      },
    },
  });

  const pizza3 = await prisma.product.create({
    data: {
      name: 'Чоризо фреш',
      imageUrl:
        'https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp',
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(10, 40),
      },
    },
  });

  console.log('Генерация вариаций пицц и остальных продуктов...');
  await prisma.productItem.createMany({
    data: [
      // Пицца "Пепперони фреш"
      generateProductItem({ productId: pizza1.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 40 }),

      // Пицца "Сырная"
      generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 30 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 40 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 20 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 40 }),

      // Пицца "Чоризо фреш"
      generateProductItem({ productId: pizza3.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 40 }),

      // Остальные продукты
      // Создаем для остальных продуктов, т.к. в модели Product не все данные о продукте, цена находится в ProductItem
      generateProductItem({ productId: 1 }),
      generateProductItem({ productId: 2 }),
      generateProductItem({ productId: 3 }),
      generateProductItem({ productId: 4 }),
      generateProductItem({ productId: 5 }),
      generateProductItem({ productId: 6 }),
      generateProductItem({ productId: 7 }),
      generateProductItem({ productId: 8 }),
      generateProductItem({ productId: 9 }),
      generateProductItem({ productId: 10 }),
      generateProductItem({ productId: 11 }),
      generateProductItem({ productId: 12 }),
      generateProductItem({ productId: 13 }),
      generateProductItem({ productId: 14 }),
      generateProductItem({ productId: 15 }),
      generateProductItem({ productId: 16 }),
      generateProductItem({ productId: 17 }),
    ],
  });

  console.log('Генерация корзин...');
  // for (const cart of carts) {
  //   await prisma.cart.create({ data: cart });
  // }
  for (let i = 0; i < carts.length; i++) {
    await prisma.cart.create({
      data: {
        userId: createdUsers[i].id, // Берем ID из базы!
        token: carts[i]?.token || `token-${createdUsers[i].id}`,
        totalAmount: carts[i]?.totalAmount || 0,
      },
    });
  }

  console.log('Генерация товаров для корзины...');
  // for (const cartItem of cartItems) {
  //   await prisma.cartItem.create({ data: cartItem });
  // }
  const dbFirstCart = await prisma.cart.findFirst();
  const dbProductFirstItem = await prisma.productItem.findFirst();
  await prisma.cartItem.create({
    data: {
      productItemId: dbProductFirstItem?.id ?? 1,
      cartId: dbFirstCart?.id ?? 1,
      quantity: 2,
      ingredients: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
      },
    },
  });

  console.log('✅ База данных успешно заполнена!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Ошибка при заполнении базы:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
