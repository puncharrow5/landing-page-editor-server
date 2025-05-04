import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const defaultRole: Prisma.RoleCreateInput[] = [
  {
    name: '0레벨',
    description: '승인 대기',
  },
  {
    name: '1레벨',
    description: '조회 가능',
  },
  {
    name: '2레벨',
    description: '조회 및 수정 가능',
  },
  { name: '3레벨', description: '조회 및 수정 / 회원 관리 가능' },
];

const masterAdmin = {
  email: 'admin@admin.com',
  password:
    '$argon2id$v=19$m=65536,t=3,p=4$9xYBMufeiNkV3Td8o8xl/Q$ZRGZEIj/idt1HH+6/T8Tj5tcDl0l/RKJy01YWStlJoI',
  name: '관리자',
};

async function main() {
  console.log('Seeding...');

  const [roleCount, adminCount] = await Promise.all([
    prisma.role.count(),
    prisma.admin.count(),
  ]);

  if (roleCount === 0) {
    /// --------- Role ---------------
    for (let i = 0; i < defaultRole.length; i++) {
      await prisma.role.create({
        data: defaultRole[i],
      });
    }
  }

  if (adminCount === 0) {
    /// --------- Admin ---------------
    await prisma.admin.create({
      data: {
        ...masterAdmin,
        role: {
          connect: {
            id: 4,
          },
        },
      },
    });
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    console.log('Seeding Complete...');

    await prisma.$disconnect();
  });
