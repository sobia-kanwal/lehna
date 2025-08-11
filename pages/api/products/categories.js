import dbConnect from "../../../database/dbConnect"
import Product from "../../../database/models/product"

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    await dbConnect()
    // get all the category values along with first matched image distinctly
    const distinct = await Product.distinct("categories")
    const products = await Product.find()
    const categories = distinct.map((category) => {
      const item = products.find((item) => item.categories.includes(category))
      return [category, item?.image]
    })
    return res.status(200).json(categories)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: "Internal server error" })
  }
}
