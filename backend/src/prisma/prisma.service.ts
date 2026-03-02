import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import 'dotenv/config';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    // Instancia o adapter usando as variáveis do .env
    const adapter = new PrismaMariaDb({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      connectionLimit: 5,
    });

    // Passa o adapter para o construtor do PrismaClient
    super({ adapter });
  }

  async onModuleInit() {
    // Com o adapter, o $connect valida a conexão com as credenciais
    await this.$connect();
  }
}