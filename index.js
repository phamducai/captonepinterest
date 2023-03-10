const fs = require("fs");
// fs.writeFile(process.cwd() + "/test.txt", "Hello world", (err) => {});
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const rootRouter = require("./routes/rootRouter");
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("."));

app.use("/api", rootRouter);

app.listen(3003, () => {
  console.log("listening on port 3003");
});
