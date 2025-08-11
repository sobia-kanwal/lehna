import dbConnect from "../../database/dbConnect"
import User from "../../database/models/user"
import { hash } from "../../utils/bcrypt"

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" })
  }

  try {
    await dbConnect()

    const { password, rePassword, ...others } = req.body || {}

    // check if passwords has matched
    if (password !== rePassword) {
      return res.status(400).json({
        success: false,
        message: "Password didn't match",
      })
    }

    // hash the password and save the user to database
    const hashed = await hash(password)
    const userData = { ...others, password: hashed }
    await User.create(userData)
    return res.status(200).json({ success: true, message: "Account registered" })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ success: false, message: "Email already exists or server error" })
  }
}
