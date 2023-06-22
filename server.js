const app = require("./app");
const mongoConnect = require("./db/connection");
const { PORT } = process.env;
const startServer = async () => {
  try {
    await mongoConnect();
    app.listen(PORT, (err) => {
      if (err) {
        console.log("Server launch error", err);
        return;
      }
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (error) {
    console.error(`Failed to launch application with error ${error.message}`);
  }
};

startServer();
