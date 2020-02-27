const { Router } = require("express");
const { validationResult, body } = require("express-validator");

const Recipe = require("../models/Recipe");
const upload = require("../middlewares/imageMiddleware");
const router = Router();

router.post(
  "/",
  [
    upload,
    body("title", "Название не может быть пустым").notEmpty(),
    body("parts", "Поле 'нгридиенты' не может быть пустым").notEmpty(),
    body("text", "Описание не может быть пустым").notEmpty()
  ],
  async (req, res) => {
    try {
      const err = validationResult(req);
      if (!err.isEmpty())
        return res
          .status(400)
          .json({ message: "Ошибка валидации: " + err.array() });

      const image = req.file ? req.file.path : "uploads/default.png";
      const { title, text, parts } = req.body;

      const item = new Recipe({ title, text, parts, image });
      const saved = await item.save();

      res.json(saved);
    } catch (e) {
      res.status(500).json({ message: "Ошибка при сохранении рецепта" });
    }
  }
);

module.exports = router;
