const express = require("express");
const { getEnv } = require("./src/utils/general");
const UsersRoute = require("./src/routes/user");
const { User } = require("./src/models");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = getEnv("PORT") || 3008;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/users", UsersRoute);

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
