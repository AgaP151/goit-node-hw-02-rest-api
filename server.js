const mongoose = require("mongoose");
const app = require("./app");

const PORT = process.env.PORT || 3000;
const uriDb = process.env.DB_HOST;

mongoose.set("strictQuery", true);

mongoose
  .connect(uriDb)
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`Server not running. Error message: ${error.message}`);
    process.exit(1);
  });
