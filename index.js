const express = require("express");
const { getEnv } = require("./src/utils/general");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = getEnv("PORT") || 3008;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`)
});
