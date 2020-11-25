const express = require("express");

const app = express();
app.use(express.static("public"));
const port = 3001;
app.listen(port, () => {
  console.log("server listen to " + port);
});
