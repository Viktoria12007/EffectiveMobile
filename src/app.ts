import 'dotenv/config';
import express from 'express';
import "reflect-metadata";
import routes from "./routes";
import { AppDataSource } from "./data-source";
import cors from 'cors';
import cookieParser from "cookie-parser";
import errorHandler from "./middlewares/error-handler";

const app = express();
AppDataSource.initialize();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(routes);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`EffectiveMobile app listening on port ${process.env.PORT}`)
})

