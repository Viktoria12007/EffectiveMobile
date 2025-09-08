import express from 'express';
import "reflect-metadata";
import routes from "./routes";
import { AppDataSource } from "./data-source";
import cors from 'cors';

const PORT = parseInt(process.env.PORT as string, 10) || 3000;
const app = express();
AppDataSource.initialize();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.listen(PORT, () => {
  console.log(`EffectiveMobile app listening on port ${PORT}`)
})

