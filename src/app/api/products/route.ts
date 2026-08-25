import { NextRequest, NextResponse } from "next/server";
import { getDataSource } from "@/lib/db/data-source";
import { Product } from "@/lib/db/entities";
import { ILike } from "typeorm";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const showAll = searchParams.get("all") === "true"; // For admin - show inactive too
    const forLanding = searchParams.get("landing") === "true"; // For landing page - limited results

    const dataSource = await getDataSource();
    const productRepo = dataSource.getRepository(Product);

    // Build where conditions
    const whereConditions: Record<string, unknown> = {};
    
    if (!showAll) {
      whereConditions.isActive = true;
    }
    
    if (category) {
      whereConditions.category = category;
    }

    let where: Record<string, unknown> | Record<string, unknown>[] = whereConditions;
    
    if (search) {
      where = [
        { ...whereConditions, name: ILike(`%${search}%`) },
        { ...whereConditions, description: ILike(`%${search}%`) },
      ];
    }

    // For landing page, just return limited results without pagination meta
    if (forLanding) {
      const products = await productRepo.find({
        where: { isActive: true },
        order: { sortOrder: "ASC", createdAt: "DESC" },
        take: 6,
      });
      return NextResponse.json(products);
    }

    const skip = (page - 1) * limit;

    const [productsResult, categoriesResult] = await Promise.all([
      productRepo.findAndCount({
        where,
        order: { sortOrder: "ASC", createdAt: "DESC" },
        skip,
        take: limit,
      }),
      productRepo
        .createQueryBuilder("product")
        .select("DISTINCT product.category", "category")
        .where("product.category IS NOT NULL")
        .andWhere("product.category != ''")
        .andWhere(showAll ? "1=1" : "product.isActive = :isActive", { isActive: true })
        .orderBy("product.category", "ASC")
        .getRawMany<{ category: string }>(),
    ]);
    const [products, total] = productsResult;
    const categories = categoriesResult.map((row) => row.category);
    
    return NextResponse.json({
      data: products,
      categories,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const dataSource = await getDataSource();
    const productRepo = dataSource.getRepository(Product);
    
    const product = productRepo.create(body);
    await productRepo.save(product);
    
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}

