export const env = {
  port: process.env.PORT || 3333,
  databaseUrl:
    process.env.DATABASE_URL || 'postgres://uniesbam:uniesbam123@localhost:5432/uniesbam',
  jwtSecret: process.env.JWT_SECRET || 'dev-secret',
  adminEmail: process.env.ADMIN_EMAIL || 'admin@uniesbam.edu.br',
  adminPassword: process.env.ADMIN_PASSWORD || 'admin123'
};
