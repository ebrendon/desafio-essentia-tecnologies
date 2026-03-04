import { PrismaClient } from '../generated/prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import * as bcrypt from 'bcrypt';
import 'dotenv/config';

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaMariaDb(connectionString);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('Iniciando o db seed...');

    // A senha será "123456" para todos os usuários para facilitar o teste
    const passwordHash = await bcrypt.hash('123456', 10);

    // Criando o Administrador
    const admin = await prisma.user.upsert({
        where: { email: 'admin@techx.com' },
        update: {},
        create: {
            name: 'Administrador TechX',
            email: 'admin@techx.com',
            password: passwordHash,
            role: 'ADMIN',
            taks: {
                create: [
                    {
                        title: 'Revisar projeto de teste',
                        description:
                            'Avaliar o código do Desafio Essentia Tecnologies.',
                        completed: false,
                    },
                    {
                        title: 'Aprovar candidato',
                        description:
                            'Enviar feedback positivo após testar a interface e a API.',
                        completed: true,
                    },
                ],
            },
        },
    });

    // Criando Usuário Comum 1
    const user1 = await prisma.user.upsert({
        where: { email: 'joao@techx.com' },
        update: {},
        create: {
            name: 'João Silva',
            email: 'joao@techx.com',
            password: passwordHash,
            role: 'USER',
            taks: {
                create: [
                    {
                        title: 'Reunião de Alinhamento',
                        description:
                            'Reunião diária com o time de desenvolvimento (Daily).',
                        completed: false,
                    },
                ],
            },
        },
    });

    // Criando Usuário Comum 2
    const user2 = await prisma.user.upsert({
        where: { email: 'maria@techx.com' },
        update: {},
        create: {
            name: 'Maria Souza',
            email: 'maria@techx.com',
            password: passwordHash,
            role: 'USER',
            taks: {
                create: [
                    {
                        title: 'Estudar NestJS',
                        description:
                            'Revisar a documentação do framework e preparar a arquitetura do novo módulo.',
                        completed: false,
                    },
                    {
                        title: 'Atualizar documentação',
                        description:
                            'Atualizar os metadados do Swagger da API.',
                        completed: false,
                    },
                ],
            },
        },
    });

    console.log('Seed concluído com sucesso!');
    console.log('-------------------------------------------');
    console.log('Credenciais geradas para teste:');
    console.log('Senha padrão para todos: 123456');
    console.log('-------------------------------------------');
    console.log(`ADMIN: ${admin.email}`);
    console.log(`USER 1: ${user1.email}`);
    console.log(`USER 2: ${user2.email}`);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
