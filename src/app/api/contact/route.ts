import { NextRequest, NextResponse } from "next/server";
import { getDataSource } from "@/lib/db/data-source";
import { ContactRequest } from "@/lib/db/entities";
import { ILike } from "typeorm";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status"); // "read" | "unread" | null (all)
    
    const skip = (page - 1) * limit;

    const dataSource = await getDataSource();
    const contactRepo = dataSource.getRepository(ContactRequest);
    
    // Build where conditions
    const where: Record<string, unknown>[] = [];
    
    if (status === "read") {
      where.push({ isRead: true });
    } else if (status === "unread") {
      where.push({ isRead: false });
    }

    // Search by name or email
    let whereCondition: Record<string, unknown> | Record<string, unknown>[] | undefined;
    if (search) {
      const searchConditions = [
        { name: ILike(`%${search}%`) },
        { email: ILike(`%${search}%`) },
      ];
      if (status === "read") {
        whereCondition = searchConditions.map(cond => ({ ...cond, isRead: true }));
      } else if (status === "unread") {
        whereCondition = searchConditions.map(cond => ({ ...cond, isRead: false }));
      } else {
        whereCondition = searchConditions;
      }
    } else if (where.length > 0) {
      whereCondition = where[0];
    }

    const [contacts, total] = await contactRepo.findAndCount({
      where: whereCondition,
      order: { createdAt: "DESC" },
      skip,
      take: limit,
    });
    
    return NextResponse.json({
      data: contacts,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return NextResponse.json({ error: "Failed to fetch contacts" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const dataSource = await getDataSource();
    const contactRepo = dataSource.getRepository(ContactRequest);
    
    const contact = contactRepo.create(body);
    await contactRepo.save(contact);
    
    return NextResponse.json(contact, { status: 201 });
  } catch (error) {
    console.error("Error creating contact:", error);
    return NextResponse.json({ error: "Failed to create contact" }, { status: 500 });
  }
}

