import { hash, compare } from 'bcrypt'
import { Router } from 'express'

import { ensureAuthenticated } from '@middlewares/ensureAuthenticated'
import { prisma } from '@models/client'

const mainRouter = Router()

mainRouter.get('/', async (request, response) => {
  return response.redirect('/dashboard')
})

mainRouter.get('/login', async (request, response) => {
  return response.render('login')
})

mainRouter.post('/login', async (request, response) => {
  const { email, password } = request.body
  console.log('🚀 ~ mainRouter.post ~ email, password:', email, password)

  const user = await prisma.users.findFirst({
    where: {
      email
    }
  })
  console.log('🚀 ~ mainRouter.post ~ user:', user)

  if (!user) {
    return response.redirect('/login')
  }

  const passwordMatch = await compare(password, user.password)
  console.log('🚀 ~ mainRouter.post ~ passwordMatch:', passwordMatch)

  if (!passwordMatch) {
    return response.redirect('/login')
  }

  request.session.user = {
    email: user.email,
    name: user.name
  }
  return response.redirect('/dashboard')
})

mainRouter.get('/logout', ensureAuthenticated, async (request, response) => {
  request.session.destroy(() => {
    return response.redirect('/login')
  })
})

mainRouter.get('/dashboard', ensureAuthenticated, async (request, response) => {
  const users = await prisma.users.findMany()

  return response.render('dashboard', {
    users
  })
})

mainRouter.get('/adicionar', ensureAuthenticated, async (request, response) => {
  return response.render('adicionar')
})

mainRouter.post(
  '/adicionar',
  ensureAuthenticated,
  async (request, response) => {
    const { nome, email, idade } = request.body

    if (!nome || !email || !idade) {
      return response.redirect('/dashboard')
    }

    const password = await hash(`${String(email).split('@')[0]}123`, 8)

    await prisma.users.create({
      data: {
        name: nome,
        email,
        password,
        age: Number(idade)
      }
    })

    return response.redirect('/dashboard')
  }
)

mainRouter.get(
  '/deletar/:id',
  ensureAuthenticated,
  async (request, response) => {
    const { id } = request.params

    const user = await prisma.users.findFirst({
      where: {
        id: Number(id)
      }
    })

    await prisma.users.delete({
      where: {
        id: Number(id)
      }
    })

    if (user?.email === request.session.user.email) {
      request.session.destroy(() => {
        return response.redirect('/login')
      })
    }

    return response.redirect('/dashboard')
  }
)

export { mainRouter }
