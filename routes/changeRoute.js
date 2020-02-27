const { Router } = require("express");
const { validationResult, body } = require("express-validator");
const path = require("path");

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
      if (!err.isEmpty()) {
        return res
          .status(400)
          .json({ message: "Ошибка валидации:" + err.array() });
      }

      const { title, text, parts } = req.body;
      const id = path.basename(req.headers.referer);
      const old = await Recipe.findById(id);
      const image = req.file ? req.file.path : old.image;
      let history = [
        {
          parts: old.parts,
          title: old.title,
          text: old.text,
          date: old.date,
          image: old.image
        },
        ...old.history
      ];

      const updated = await Recipe.findByIdAndUpdate(
        id,
        {
          image: image || old.image,
          parts,
          title,
          text,
          date: Date.now(),
          history
        },
        { new: true }
      );

      res.json(updated);
    } catch (e) {
      res.status(500).json({ message: "Ошибка при изменении рецепта" });
    }
  }
);

module.exports = router;
