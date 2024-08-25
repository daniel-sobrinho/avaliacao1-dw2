import { hash } from 'bcrypt'

import { prisma } from '../client'

export const seeder = async () => {
  const user = {
    name: 'admin',
    email: 'admin@admin.com',
    password: await hash('admin123', 8),
    age: 18
  }

  await prisma.users.upsert({
    where: {
      email: user.email
    },
    update: {},
    create: user
  })
}

seeder()
