const express = require("express");
const config = require("config");
const path = require("path");
const mongoose = require("mongoose");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json({ extended: true }));
app.use("/api/list", require("./routes/listRoute"));
app.use("/api/create", require("./routes/createRoute"));
app.use("/api/change", require("./routes/changeRoute"));
app.use((err, req, res, next) => {
  if (err) {
    res.status(500).json({
      message:
        err.message || "Ошибка в работе сервера. Проверьте отправляемые данные"
    });
  }
});
app.get("/(*/)?uploads/:file", (req, res) => {
  res.sendFile(path.resolve(__dirname, "uploads", req.params.file));
});

// app.use("/", express.static(path.join(__dirname, "client", "build")));
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
// });

mongoose
  .connect(config.get("mongoUri"), {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
  })
  .then(() => app.listen(PORT, () => console.log("Start on port:", PORT)))
  .catch(e => {
    console.error("Promise failed: ", e);
    process.exit(1);
  });
