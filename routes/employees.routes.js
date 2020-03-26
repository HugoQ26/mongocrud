const express = require('express');
const router = express.Router();
const Employees = require('../models/employees.model');

router.get('/employees', async (req, res) => {
  try {
    res.json(await Employees.find());
  } catch (error) {
    res.status(500).json({ message: err });
  }
});

router.get('/employees/random', async (req, res) => {
  try {
    const count = await Employees.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const empl = await Employees.findOne().skip(rand);
    if (!empl) res.status(404).json({ message: 'Not found' });
    else res.json(empl);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.get('/employees/:id', async (req, res) => {
  try {
    const empl = await Employees.findById(req.params.id);
    if (!empl) res.status(404).json({ message: 'Not found' });
    else res.json(empl);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.post('/employees', async (req, res) => {
  try {
    const { name } = req.body;
    const newEmployee = new Employees({ name: name });
    await newEmployee.save();
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.put('/employees/:id', async (req, res) => {
  const { name } = req.body;

  try {
    const empl = await Employees.findById(req.params.id);
    if (empl) {
      empl.name = name;
      await empl.save();
      res.json({ message: 'OK', modified: empl });
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.delete('/employees/:id', async (req, res) => {
  try {
    const empl = await Employees.findById(req.params.id);
    if (empl) {
      await Employees.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK', modified: empl });
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
