import 'dotenv/config';
import { PrismaClient } from '../app/generated/prisma/client';
import { hashSync } from 'bcrypt';

export const UserRole = {
  USER: 'USER',
  ADMIN: 'ADMIN',
} as const;

// В Prisma 7 для этого типа клиента
// нужно передавать адаптер или строку через специальное поле
const prisma = new PrismaClient({
  // @ts-ignore
  adapter: null,
  // @ts-ignore
  errorFormat: 'pretty',
  // Передаем URL напрямую в обход старых структур
  // @ts-ignore
  datasourceUrl: process.env.POSTGRES_URL_NON_POOLING,
} as any);

async function main() {
  console.log('🌱 Начинается заполнение базы данных...');

  // 1. Создаем 5 фейковых пользователей
  const users = [
    {
      fullName: 'Admin Иван',
      email: 'admin@example.com',
      password: hashSync('12345', 10),
      role: UserRole.ADMIN,
      verified: new Date(),
    },
    {
      fullName: 'Мария Сидорова',
      email: 'user2@example.com',
      password: hashSync('12345', 10),
      role: UserRole.USER,
      verified: new Date(),
    },
    {
      fullName: 'Алексей Петров',
      email: 'user3@example.com',
      password: hashSync('12345', 10),
      role: UserRole.USER,
      verified: new Date(),
    },
    {
      fullName: 'Елена Козлова',
      email: 'user4@example.com',
      password: hashSync('12345', 10),
      role: UserRole.USER,
      verified: new Date(),
    },
    {
      fullName: 'Дмитрий Волков',
      email: 'user5@example.com',
      password: hashSync('12345', 10),
      role: UserRole.USER,
      verified: new Date(),
    },
  ];

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {}, // Если пользователь найден, ничего не меняем
      create: user,
    });
  }

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
