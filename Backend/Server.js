const app = require("./src/app");
require("dotenv").config();
const ConnectDB = require("./src/db/db");

const PORT = process.env.PORT || 3000;

ConnectDB();

app.listen(PORT, () => {
  console.log(`[ZeroBugX] Server running on port ${PORT} | ${process.env.NODE_ENV || "development"}`);
});