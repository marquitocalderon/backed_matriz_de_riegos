import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PerfilesModule } from "./admin/perfiles/perfiles.module";
import { UsuariosModule } from "./admin/usuarios/usuarios.module";
import { AuthModule } from "./admin/auth/auth.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { StripeModule } from './admin/stripe/stripe.module';
import { ModulosModule } from './admin/modulos/modulos.module';
import { AccesosController } from './admin/accesos/accesos.controller';
import { AccesosModule } from "./admin/accesos/accesos.module";
import { EmpresasModule } from './admin/empresas/empresas.module';
import { SucursalesModule } from './admin/sucursales/sucursales.module';
import { EventosModule } from './admin/eventos/eventos.module';
import { MatrizModule } from './admin/matriz/matriz.module';
import { IsoModule } from "./admin/iso/iso.module";



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.POSTGRES_HOST,
      port: 5432,
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities:[__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      ssl: process.env.POSTGRES_SSL === "true",
      extra: {
        ssl:
          process.env.POSTGRES_SSL === "true"
            ? {
              rejectUnauthorized: false,
            }
            : null,
      },
    }),
    PerfilesModule,
    UsuariosModule,
    AuthModule,
    StripeModule,
    ModulosModule,
    AccesosModule,
    EmpresasModule,
    SucursalesModule,
    EventosModule,
    MatrizModule,
    IsoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
