const router = require('express').Router();
const userService = require('../services/user');

router.get('/', async (req, res) => {
  let { page, rows, sort, order } = req.query;
  let result = await userService.queryData(parseInt(page), parseInt(rows), sort, order);
  return res.json(result);
});

router.post('/', async (req, res) => {
  let result = await userService.insert(req.query);
  return res.json(result);
});

module.exports = router;