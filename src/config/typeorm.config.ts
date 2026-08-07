// import { registerAs } from "@nestjs/config";
// import { TypeOrmModuleOptions } from "@nestjs/typeorm";

// export default registerAs("database", (): TypeOrmModuleOptions => ({
//   type: "postgres",
//   host: process.env.DB_HOST ?? "localhost",
//   port: parseInt(process.env.DB_PORT ?? "5432", 10),
//   username: process.env.DB_USER ?? "postgres",
//   password: process.env.DB_PASSWORD ?? "",
//   database: process.env.DB_NAME ?? "mydb",
//   entities: [__dirname + "/../**/*.entity{.ts,.js}"],
//   migrations: [__dirname + "/../database/migrations/*{.ts,.js}"],
//   synchronize: false,
//   logging: process.env.NODE_ENV === "development",
//   ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false,
// }));
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
  type: "postgres",
  host: configService.get<string>("DB_HOST"),
  port: configService.get<number>("DB_PORT"),
  username: configService.get<string>("DB_USER"),
  password: configService.get<string>("DB_PASSWORD"),
  database: configService.get<string>("DB_NAME"),
  entities: [__dirname + "/../**/*.entity{.ts,.js}"],
  migrations: [__dirname + "/../database/migrations/*{.ts,.js}"],
  synchronize: true,
  autoLoadEntities: true,
});
