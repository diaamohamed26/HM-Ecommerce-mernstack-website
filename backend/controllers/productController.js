import Product from '../models/Product.js';

// GET /api/products?search=jeans&sort=price-asc&page=2
export const getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = 8;

    const search = req.query.search || '';
    const sort = req.query.sort || '';

    // Filters
    const keyword = search
      ? { name: { $regex: search, $options: 'i' } }
      : {};

    // Sorting
    let sortOption = {};
    if (sort === 'price-asc') sortOption = { price: 1 };
    else if (sort === 'price-desc') sortOption = { price: -1 };

    const total = await Product.countDocuments(keyword);
    const products = await Product.find(keyword)
      .sort(sortOption)
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    res.json({
      products,
      currentPage: page,
      totalPages: Math.ceil(total / pageSize),
      totalProducts: total,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// GET /api/products/:slug
export const getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching product' });
  }
};
