export default () => ({
    port: +process.env.APP_PORT! || 9090,
    host: process.env.APP_HOST,
    database: {
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT! || 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      db_name: process.env.DB_NAME,
      entities: ["dist/**/*.entity{.ts,.js}"],
      migrations: ['dist/migrations/**/*.ts'],
      db_sync: !process.env.DB_SYNCHRONIZE
    },
    redis: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT
    }
});
