import express from "express";
import Product from "../models/Product.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const {
      search,
      category,
      minPrice,
      maxPrice,
      sort,
    } = req.query;

    let query = {};

    // Search
    if (search) {
      query.name = {
        $regex: search,
        $options: "i",
      };
    }

    // Category
    if (category && category !== "All") {
      query.category = category;
    }

    // Price Filter
    if (minPrice || maxPrice) {
      query.price = {};

      if (minPrice)
        query.price.$gte = Number(minPrice);

      if (maxPrice)
        query.price.$lte = Number(maxPrice);
    }

    let products = Product.find(query);

    // Sorting
    if (sort === "low")
      products = products.sort({ price: 1 });

    if (sort === "high")
      products = products.sort({ price: -1 });

    if (sort === "latest")
      products = products.sort({
        createdAt: -1,
      });

    res.json(await products);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

router.post(
  "/",
  upload.single("image"),
  async (req, res) => {
    try {
      const product = await Product.create({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: req.file?.path || req.body.image || "",
      });

      res.status(201).json(product);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: error.message,
      });
    }
  }
);
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    res.json({
      message: "Product Deleted",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
});
export default router;