import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmConfig } from "./config/typeorm.config";
import { UserModule } from "./modules/users/users.module";
import { ProvidersModule } from "./modules/providers/provider.module";
import { ContractorsModule } from "./modules/contractors/contractors.module";
import { DemandsModule } from "./modules/demands/demands.module";
import { CategoriesModule } from "./modules/categories/category.module";
import { ApplicationsModule } from "./modules/applications/application.module";
import { ContractsModule } from "./modules/contracts/contract.module";
import { EvaluationsModule } from "./modules/evaluations/evalution.module";
import { AuthModule } from "./modules/auth/auth.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: typeOrmConfig,
    }),
    AuthModule,
    UserModule,
    ProvidersModule,
    ContractorsModule,
    DemandsModule,
    CategoriesModule,
    ApplicationsModule,
    ContractsModule,
    EvaluationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
