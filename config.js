const env = process.env;

const config = {
  db: { /* do not put password or any sensitive info here, done only for demo */
    host: env.DB_HOST || 'postgresDB',
    port: env.DB_PORT || '5432',
    user: env.DB_USER || 'docker',
    password: env.DB_PASSWORD || 'password',
    database: env.DB_NAME || 'epigram',
  }
};

module.exports = config;
