const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const { email, name, password } = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    email,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)

})

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('ips', { ip: 1, desc: 1, expirationDate: 1, createdAt: 1 })
  response.json(users)
})

module.exports = usersRouter