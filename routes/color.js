const router = require('express').Router();
const colorServices = require('./../services/color');

router.post('/', async (req, res) => {
  if (!req.body.name) res.status(400).json({message: "color is required"});
  const color = colorServices.colorObject(req.body);
  try {
    const saveColor = await colorServices.saveColor(color);
    res.status(201).json({ message: saveColor });
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.get('/', async (req, res) => {
  try {
    const color = await colorServices.getAllColors();
    if (!color) {
      return res.status(400).json({ message: 'color not found..' });
    }
    res.status(200).json({ message: color });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
