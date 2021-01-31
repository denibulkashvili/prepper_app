const testOptions = process.env.NODE_ENV === 'test' ? { database: 'test' } : {}

console.log({ testOptions })
module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'prepper',
  synchronize: false,
  logging: false,
  entities: ['dist/**/**/*.entity.js'],
  migrations: ['dist/migration/**/*.js'],
  cli: {
    migrationsDir: 'src/migration',
  },
  ...testOptions,
}
