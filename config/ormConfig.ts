require('dotenv').config();
import { DataSource } from 'typeorm';

const customDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT! || 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: ["src/**/*.entity{.ts,.js}"],
    migrations: ['migrations/**/*.ts'],
    synchronize: !process.env.DB_SYNCHRONIZE
})

export default customDataSource;
