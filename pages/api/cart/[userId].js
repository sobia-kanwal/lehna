import dbConnect from "../../../database/dbConnect"
import Cart from "../../../database/models/cart"

export default async function handler(req, res) {
  const { method, query } = req
  const { userId, itemId, clearAll } = query

  try {
    await dbConnect()

    // find the cart belonging to the user
    const cart = await Cart.findOne({ userId })
    if (!cart) return res.status(404).json({ success: false, message: "No cart found" })

    if (method === "DELETE") {
      // clear just one item if clearAll didn't specified
      if (!clearAll) {
        const result = cart.products.filter((item) => itemId !== item._id.toString())
        cart.products = result
        await cart.save()
        return res.status(200).json({ success: true, message: "Item deleted" })
      } else {
        // clear all items in the cart, usually after user checked out
        cart.products = []
        await cart.save()
        return res.status(200).json({ success: true, message: "All items deleted" })
      }
    }

    // updating quantity of the item
    if (method === "PUT") {
      const { quantity } = req.body
      const result = cart.products.map((item) => {
        if (itemId === item._id.toString()) {
          item.quantity = quantity
        }
        return item
      })
      cart.products = result
      await cart.save()
      return res.status(200).json({ success: true, message: "Item updated" })
    }

    if (method === "GET") {
      // default, return the products in the cart
      return res.status(200).json(cart.products)
    }

    return res.status(405).json({ success: false, message: "Method not allowed" })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ success: false, message: "Internal server error" })
  }
}
