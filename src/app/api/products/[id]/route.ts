import { NextRequest, NextResponse } from "next/server";
import { getDataSource } from "@/lib/db/data-source";
import { Product } from "@/lib/db/entities";
import { deleteProductImage } from "@/lib/file-utils";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const dataSource = await getDataSource();
    const productRepo = dataSource.getRepository(Product);
    const product = await productRepo.findOneBy({ id });
    
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    
    return NextResponse.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const dataSource = await getDataSource();
    const productRepo = dataSource.getRepository(Product);
    
    // Get existing product to check for image change
    const existingProduct = await productRepo.findOneBy({ id });
    
    // If image is being changed, delete the old one
    if (existingProduct && body.image !== undefined && body.image !== existingProduct.image) {
      await deleteProductImage(existingProduct.image);
    }
    
    await productRepo.update(id, body);
    const product = await productRepo.findOneBy({ id });
    
    return NextResponse.json(product);
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const dataSource = await getDataSource();
    const productRepo = dataSource.getRepository(Product);
    
    // Get product to delete its image
    const product = await productRepo.findOneBy({ id });
    if (product) {
      await deleteProductImage(product.image);
    }
    
    await productRepo.delete(id);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}

