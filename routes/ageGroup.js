const router = require('express').Router();
const ageGroupServices = require('./../services/ageGroup');

router.post('/', async (req, res) => {
  const ageGroup = ageGroupServices.ageGroupObject(req.body);
  try {
    const saveAgeGroup = await ageGroupServices.saveAgeGroup(ageGroup);
    res.status(201).json({ message: saveAgeGroup });
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.get('/', async (req, res) => {
  try {
    const ageGroup = await ageGroupServices.getAllAgeGroups();
    if (!ageGroup) {
      return res.status(400).json({ message: 'ageGroup not found..' });
    }
    res.status(200).json({ message: ageGroup });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
