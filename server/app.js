import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import productRoutes from "./routes/product.routes.js";
import authRoutes from "./routes/auth.routes.js";
import orderRoutes from "./routes/order.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import bodyParser  from "body-parser";

import cookieParser from "cookie-parser";
import path from 'path'
import { connectDatabase } from "./config/db.connect.js";

import errorMiddleware from "./middlewares/errors.js";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err}`);
  console.log("Shutting down due to uncaught exception");
  process.exit(1);
});

const app = express();
app.use(express.json({ limit: "10mb" ,
  verify : (req,res,buf) => {
    req.rawBody = buf.toString()
  }
}));
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.raw({type: "*/*"}))
app.use(bodyParser.json())

dotenv.config({ path: "server/config/config.env" });

connectDatabase();

app.use("/api/v1", productRoutes);
app.use("/api/v1", authRoutes);
app.use("/api/v1", orderRoutes);
app.use("/api/v1", paymentRoutes);

if(process.env.NODE_ENV === "PRODUCTION"){
  app.use(express.static(path.join(__dirname, "../client/dist")))

  app.get('*', (req,res) => {
    res.sendFile(path.resolve(__dirname, "../client/dist/index.html"))
  })
}

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
