import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { Roles } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private prismaService: PrismaService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request: Request = context.switchToHttp().getRequest();
        const token = request.headers['authorization']?.split(' ')[1]; // Extrai o token do header

        if (!token) {
            throw new UnauthorizedException('No token provided');
        }

        try {
            const payload = this.jwtService.verify<{
                name: string;
                email: string;
                role: Roles;
                sub: string;
            }>(token, {
                algorithms: ['HS256'],
            }); // Verifica a validade do token

            const user = await this.prismaService.user.findUnique({
                where: { id: payload.sub },
            });

            if (!user) {
                throw new UnauthorizedException('User not found');
            }
            request.user = user;
            return true;
        } catch (error) {
            console.error('Token verification failed:', error);
            throw new UnauthorizedException('Invalid token', { cause: error });
        }

        return true;
    }
}
