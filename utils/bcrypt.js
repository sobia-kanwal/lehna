import bcryptjs from "bcryptjs"

async function hash(password) {
  const hashedPassword = await bcryptjs.hash(password, 10)
  return hashedPassword
}

async function compare(formPassword, dbPassword) {
  return await bcryptjs.compare(formPassword, dbPassword)
}

module.exports = { hash, compare }
