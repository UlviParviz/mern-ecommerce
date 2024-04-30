import express from "express";
import dotenv from "dotenv";

import productRoutes from "./routes/product.routes.js";
import { connectDatabase } from "./config/db.connect.js";

import errorMiddleware from "./middlewares/errors.js";

process.on('uncaughtException', (err) => {
    console.log(`Error: ${err}`);
    console.log('Shutting down due to uncaught exception');
    process.exit(1);
})

const app = express();
app.use(express.json());

dotenv.config({ path: "server/config/config.env" });

connectDatabase();

app.use("/api/v1", productRoutes);

app.use(errorMiddleware);

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server is running on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode`
  );
});

process.on("unhandledRejection", (err) => {
  console.log(`Error : ${err}`);
  console.log("Shutting down server due to unhandled promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
