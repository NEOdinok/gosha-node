import Product from "../models/product.js";

/**
 * GET /products
 * get, render in a page
 */
export const render_products_page = async (req, res) => {
  try {
    const { category, priceMin, priceMax, name } = req.query;

    const filter = {};

    if (category) filter.category = category;
    if (priceMin || priceMax) {
      filter.price = {};
      if (priceMin) filter.price.$gte = Number(priceMin);
      if (priceMax) filter.price.$lte = Number(priceMax);
    }
    if (name) {
      filter.name = { $regex: name, $options: "i" };
    }

    const products = await Product.find(filter);

    res.render("products", { products }); // Pass products to EJS template
  } catch (err) {
    console.error(err);
    res.status(500).send("Error rendering product page.");
  }
};

/**
 * GET /products/:id
 */
export const product_get_by_id = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Product.findById(id);

    if (!result) {
      return res.status(404).send("Product not found.");
    }

    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong finding product.");
  }
};

/**
 * GET /add-product
 */
export const product_create_example = async (req, res) => {
  try {
    const product = new Product({
      name: "Ecco shoe",
      description: "Everyday regular shoe",
      price: 144,
      category: "shoes",
    });

    const result = await product.save();
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong while saving the product.");
  }
};

/**
 * GET /products
 * api only
 */
export const product_filter = async (req, res) => {
  try {
    const { category, priceMin, priceMax, name } = req.query;

    const filter = {};

    if (category) {
      filter.category = category;
    }

    if (priceMin || priceMax) {
      filter.price = {};
      if (priceMin) filter.price.$gte = Number(priceMin);
      if (priceMax) filter.price.$lte = Number(priceMax);
    }

    if (name) {
      filter.name = { $regex: name, $options: "i" };
    }

    const products = await Product.find(filter);

    res.send(products);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error while filtering products.");
  }
};
