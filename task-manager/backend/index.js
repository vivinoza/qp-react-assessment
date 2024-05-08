const connectToMongo = require("./db.cjs");
connectToMongo();
const express = require("express");
const app = express();
const port = 4000;

app.use(express.json())

app.use("/api/tasks", require("./routes/tasks"));

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
