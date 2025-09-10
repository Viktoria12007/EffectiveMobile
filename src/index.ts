import 'dotenv/config';
import express from 'express';
import "reflect-metadata";
import routes from "./routes";
import { AppDataSource } from "./data-source";
import cors from 'cors';
import cookieParser from "cookie-parser";

const app = express();
AppDataSource.initialize();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(routes);

app.listen(process.env.PORT, () => {
  console.log(`EffectiveMobile app listening on port ${process.env.PORT}`)
})

