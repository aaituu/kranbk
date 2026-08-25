import "reflect-metadata";
import { DataSource } from "typeorm";
import bcrypt from "bcryptjs";
import { Product } from "./entities/Product";
import { Dealer } from "./entities/Dealer";
import { ContactRequest } from "./entities/ContactRequest";
import { User } from "./entities/User";

const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: true, // Set to false in production
  logging: process.env.NODE_ENV === "development",
  entities: [Product, Dealer, ContactRequest, User],
  migrations: [],
  subscribers: [],
  extra: {
    timezone: "UTC",
  },
});

let initialized = false;

/**
 * Seeds the default admin user if none exists.
 * Uses ADMIN_EMAIL and ADMIN_PASSWORD from environment variables.
 * This runs automatically on first DB connection - no public API needed.
 */
async function seedAdminUser(dataSource: DataSource): Promise<void> {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  // Only seed if credentials are provided in ENV
  if (!adminEmail || !adminPassword) {
    console.warn("[DB] ADMIN_EMAIL or ADMIN_PASSWORD not set - skipping admin seed");
    return;
  }

  const userRepo = dataSource.getRepository(User);

  // Check if any admin exists
  const existingAdmin = await userRepo.findOneBy({ role: "admin" });
  if (existingAdmin) {
    return; // Admin already exists, nothing to do
  }

  // Create admin user
  const hashedPassword = await bcrypt.hash(adminPassword, 12);
  const admin = userRepo.create({
    email: adminEmail,
    password: hashedPassword,
    name: "Administrator",
    role: "admin",
  });

  await userRepo.save(admin);
  console.log("[DB] Admin user created successfully");
}

export async function getDataSource(): Promise<DataSource> {
  if (!initialized) {
    await AppDataSource.initialize();
    await seedAdminUser(AppDataSource);
    initialized = true;
  }
  return AppDataSource;
}

export { AppDataSource };
