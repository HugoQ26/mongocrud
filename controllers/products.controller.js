const Products = require('../models/products.model');

exports.getAllProducts = async (req, res) => {
  try {
    res.json(await Products.find());
  } catch (error) {
    res.status(500).json({ message: err });
  }
};

exports.getRandomProduct = async (req, res) => {
  try {
    const count = await Products.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const prod = await Products.findOne().skip(rand);
    if (!prod) res.status(404).json({ message: 'Not found' });
    else res.json(prod);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const prod = await Products.findById(req.params.id);
    if (!prod) res.status(404).json({ message: 'Not found' });
    else res.json(prod);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.postProduct = async (req, res) => {
  try {
    const { name } = req.body;
    const newEmployee = new Products({ name: name });
    await newEmployee.save();
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.putProduct = async (req, res) => {
  const { name } = req.body;

  try {
    const prod = await Products.findById(req.params.id);
    if (prod) {
      prod.name = name;
      await prod.save();
      res.json({ message: 'OK', modified: prod });
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const prod = await Products.findById(req.params.id);
    if (prod) {
      await Products.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK', modified: prod });
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
