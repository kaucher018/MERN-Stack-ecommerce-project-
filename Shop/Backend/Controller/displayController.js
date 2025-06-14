import Product from '../Models/Product.js';
import Category  from '../Models/Category.js';
import Brand  from '../Models/Brand.js';

export const showProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 }).limit(10);
    res.json({ status: 200, products });
  } catch (err) {
    res.status(500).json({ status: 500, error: err.message });
  }
};

export const bestProducts = async (req, res) => {
  try {
    const products = await Product.find({ is_featured: 1 }).sort({ createdAt: -1 }).limit(5);
    res.json({ status: 200, products });
  } catch (err) {
    res.status(500).json({ status: 500, error: err.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const data = await Category.find({ status: 1 }).sort({ createdAt: 1 });
    res.json({ status: 200, data });
  } catch (err) {
    res.status(500).json({ status: 500, error: err.message });
  }
};

export const getBrands = async (req, res) => {
  try {
    const data = await Brand.find({ status: 1 }).sort({ createdAt: 1 });
    res.json({ status: 200, data });
  } catch (err) {
    res.status(500).json({ status: 500, error: err.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const query = { status: 1 };

    if (req.query.category) {
      query.category_id = { $in: req.query.category.split(',') };
    }

    if (req.query.brand) {
      query.brand_id = { $in: req.query.brand.split(',') };
    }

    const data = await Product.find(query).sort({ createdAt: -1 });

    res.json({ status: 200, data });
  } catch (err) {
    res.status(500).json({ status: 500, error: err.message });
  }
};
