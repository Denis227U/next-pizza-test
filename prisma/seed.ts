import 'dotenv/config';
import { PrismaClient } from '../app/generated/prisma/client';
import { hashSync } from 'bcrypt';
import pg from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

export const UserRole = {
  USER: 'USER',
  ADMIN: 'ADMIN',
} as const;

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

// 2. Обертываем его в адаптер Prisma
const adapter = new PrismaPg(pool);

// 3. Передаем адаптер в конструктор (используем as any для обхода типов Prisma 7)
const prisma = new PrismaClient({ adapter } as any);

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
