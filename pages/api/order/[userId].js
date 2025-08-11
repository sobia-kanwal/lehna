import dbConnect from "../../../database/dbConnect"
import Order from "../../../database/models/order"

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const { userId } = req.query
  try {
    await dbConnect()

    // return the latest form data that user's used when he ordered
    const order = await Order.findOne({ userId }).sort({ createdAt: -1 })

    if (!order) {
      // return null, so the default values use the empty string
      return res.status(200).json(null)
    }

    return res.status(200).json(order.shippingInfo)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: "Internal server error" })
  }
}
