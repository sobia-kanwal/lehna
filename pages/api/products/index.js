import dbConnect from "../../../database/dbConnect"
import Product from "../../../database/models/product"

export default async function handler(req, res) {
  const { search, category } = req.query
  const limitNum = req.query.limit ? parseInt(req.query.limit, 10) : undefined

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    await dbConnect()

    let products = []
    if (category) {
      // find products that match the specified category
      products = await Product.find({
        categories: { $in: [category] },
      }).limit(limitNum)
    } else if (search) {
      // find products by name that match the search query
      const regex = new RegExp(search, "i")
      products = await Product.find({ name: regex }).limit(limitNum)
    } else {
      // default, return all products
      products = await Product.find().limit(limitNum)
    }
    return res.status(200).json(products)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: "Internal server error" })
  }
}
