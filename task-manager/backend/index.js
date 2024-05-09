const connectToMongo = require("./db.cjs");
const express = require("express");
var cors = require('cors')
connectToMongo();

const app = express();
const port = 4000;

app.use(cors())
app.use(express.json())

app.use("/api/tasks", require("./routes/tasks"));

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
