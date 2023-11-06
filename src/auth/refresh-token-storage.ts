import { Injectable, OnApplicationBootstrap, OnApplicationShutdown } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import Redis from "ioredis";

export class InvalidatedRefreshTokenError extends Error {}

@Injectable()
export class RefreshTokenStorage implements OnApplicationBootstrap, OnApplicationShutdown {
    private redisClient: Redis;

    constructor(private configService: ConfigService) {}
    onApplicationBootstrap() {
        this.redisClient = new Redis({
            host: this.configService.get('redis.REDIS_HOST'),
            port: this.configService.get('redis.REDIS_PORT')
        })
    }

    onApplicationShutdown(signal?: string | undefined) {
        return this.redisClient.quit()
    }

    async insert(customer_id: string, token: string): Promise<void> {
        await this.redisClient.set(this.getKey(customer_id), token);
    }

    async validate(customer_id: string, token: string): Promise<boolean> {
        const storedToken = await this.redisClient.get(this.getKey(customer_id));
        if (storedToken !== token) throw new InvalidatedRefreshTokenError();
        return storedToken !== token;
    }

    async invalidate(customer_id: string): Promise<void> {
        await this.redisClient.del(this.getKey(customer_id));
    }

    private getKey(customer_id: string): string {
        return `customer-${customer_id}`;
    }
}