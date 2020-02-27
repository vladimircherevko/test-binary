const { Router } = require("express");

const Recipe = require("../models/Recipe");
const router = Router();

router.get("/", async (req, res) => {
  try {
    const list = await Recipe.find();
    if (!list) res.status(400).json({ message: "Список рецептов пустой" });

    res.json(list);
  } catch (e) {
    res
      .status(500)
      .json({ message: e.message || "Ошибка при поисе списка рецептов" });
  }
});

module.exports = router;
