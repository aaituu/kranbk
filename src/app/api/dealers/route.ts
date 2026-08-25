import { NextRequest, NextResponse } from "next/server";
import { getDataSource } from "@/lib/db/data-source";
import { Dealer } from "@/lib/db/entities";
import { ILike } from "typeorm";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const search = searchParams.get("search") || "";
    const city = searchParams.get("city") || "";
    const showAll = searchParams.get("all") === "true"; // For admin - show inactive too
    const forLanding = searchParams.get("landing") === "true"; // For landing page - limited results

    const dataSource = await getDataSource();
    const dealerRepo = dataSource.getRepository(Dealer);

    // Build where conditions
    const whereConditions: Record<string, unknown> = {};
    
    if (!showAll) {
      whereConditions.isActive = true;
    }
    
    if (city) {
      whereConditions.city = city;
    }

    let where: Record<string, unknown> | Record<string, unknown>[] = whereConditions;
    
    if (search) {
      where = [
        { ...whereConditions, name: ILike(`%${search}%`) },
        { ...whereConditions, city: ILike(`%${search}%`) },
      ];
    }

    // For landing page, just return limited results without pagination meta
    if (forLanding) {
      const dealers = await dealerRepo.find({
        where: { isActive: true },
        order: { sortOrder: "ASC", createdAt: "DESC" },
        take: 8,
      });
      return NextResponse.json(dealers);
    }

    const skip = (page - 1) * limit;

    const [dealers, total] = await dealerRepo.findAndCount({
      where,
      order: { sortOrder: "ASC", createdAt: "DESC" },
      skip,
      take: limit,
    });
    
    return NextResponse.json({
      data: dealers,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching dealers:", error);
    return NextResponse.json({ error: "Failed to fetch dealers" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const dataSource = await getDataSource();
    const dealerRepo = dataSource.getRepository(Dealer);
    
    const dealer = dealerRepo.create(body);
    await dealerRepo.save(dealer);
    
    return NextResponse.json(dealer, { status: 201 });
  } catch (error) {
    console.error("Error creating dealer:", error);
    return NextResponse.json({ error: "Failed to create dealer" }, { status: 500 });
  }
}

