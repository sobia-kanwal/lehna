import dbConnect from "../../../database/dbConnect"
import Order from "../../../database/models/order"

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" })
  }

  const { products } = req.body

  try {
    await dbConnect()

    // user cannot place order when their cart has no items
    if (!products || products.length === 0) {
      return res.status(400).json({ success: false, message: "No item in the cart" })
    }

    // otherwise, just save it to order collection database
    await Order.create(req.body)
    return res.status(200).json({ success: true, message: "Thank you for your order!" })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ success: false, message: "Something went wrong" })
  }
}
