import { writeFile, unlink, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { randomUUID } from "crypto";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "products");

/**
 * Ensures the upload directory exists
 */
export async function ensureUploadDir(): Promise<void> {
  if (!existsSync(UPLOAD_DIR)) {
    await mkdir(UPLOAD_DIR, { recursive: true });
  }
}

/**
 * Saves an uploaded file and returns the public URL path
 */
export async function saveProductImage(file: File): Promise<string> {
  await ensureUploadDir();
  
  const buffer = Buffer.from(await file.arrayBuffer());
  const ext = path.extname(file.name) || ".jpg";
  const filename = `${randomUUID()}${ext}`;
  const filepath = path.join(UPLOAD_DIR, filename);
  
  await writeFile(filepath, buffer);
  
  return `/api/uploads/products/${filename}`;
}

/**
 * Deletes a product image from the filesystem
 * @param imagePath - The public URL path (e.g., /uploads/products/xxx.jpg)
 */
export async function deleteProductImage(imagePath: string | null | undefined): Promise<void> {
  if (!imagePath) return;
  
  // Only delete files from our uploads directory
  if (!imagePath.startsWith("/uploads/products/") && !imagePath.startsWith("/api/uploads/products/")) return;
  
  const filename = path.basename(imagePath);
  const filepath = path.join(UPLOAD_DIR, filename);
  
  try {
    if (existsSync(filepath)) {
      await unlink(filepath);
    }
  } catch (error) {
    console.error("Error deleting image:", error);
  }
}

