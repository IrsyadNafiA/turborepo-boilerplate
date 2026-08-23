import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { DataSource } from 'typeorm';
import { User } from '../modules/auth/entities/user.entity';
import { Role } from '../modules/auth/entities/role.entity';
import { Permission } from '../modules/auth/entities/permission.entity';
import * as bcrypt from 'bcrypt';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get(DataSource);

  const roleRepo = dataSource.getRepository(Role);
  const permRepo = dataSource.getRepository(Permission);
  const userRepo = dataSource.getRepository(User);

  console.log('Seeding database...');

  // Create ADMIN role
  let adminRole = await roleRepo.findOne({ where: { name: 'ADMIN' } });
  if (!adminRole) {
    adminRole = roleRepo.create({ name: 'ADMIN' });
    await roleRepo.save(adminRole);
  }

  // Create permissions
  const permissions = [{ resource: 'ALL', action: 'ALL' }];

  for (const p of permissions) {
    let perm = await permRepo.findOne({
      where: { resource: p.resource, action: p.action },
    });
    if (!perm) {
      perm = permRepo.create(p);
      await permRepo.save(perm);
    }

    if (!adminRole.permissions) {
      adminRole.permissions = [];
    }

    if (!adminRole.permissions.some((existing) => existing.id === perm?.id)) {
      adminRole.permissions.push(perm);
      await roleRepo.save(adminRole);
    }
  }

  // Create Admin user
  const adminEmail = 'admin@admin.com';
  let adminUser = await userRepo.findOne({ where: { email: adminEmail } });
  if (!adminUser) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    adminUser = userRepo.create({
      email: adminEmail,
      password: hashedPassword,
      roles: [adminRole],
    });
    await userRepo.save(adminUser);
    console.log('Admin user created successfully: admin@admin.com / admin123');
  } else {
    console.log('Admin user already exists');
  }

  await app.close();
}

bootstrap().catch((err) => {
  console.error('Seeder failed', err);
  process.exit(1);
});
