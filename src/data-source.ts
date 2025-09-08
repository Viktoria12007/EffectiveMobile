import { DataSource } from "typeorm";
import { User } from "./entities/user";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST || "localhost",
  port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
  username: process.env.POSTGRES_USERNAME || "effective_mobile",
  password: process.env.POSTGRES_PASSWORD || "effective_mobile",
  database: process.env.POSTGRES_DATABASE || "effective_mobile",
  entities: [User],
  synchronize: true
});
