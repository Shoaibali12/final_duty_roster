const dotenv = require("dotenv");
dotenv.config();

const app = require("./src/app");

const connectDb = require("./src/config/db");

const PORT = process.env.PORT || 5000;

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
  });
});
