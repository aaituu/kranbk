import { NextResponse } from "next/server";
import { getDataSource } from "@/lib/db/data-source";
import { Product, Dealer, ContactRequest } from "@/lib/db/entities";

export async function GET() {
  try {
    const dataSource = await getDataSource();
    
    const productRepo = dataSource.getRepository(Product);
    const dealerRepo = dataSource.getRepository(Dealer);
    const contactRepo = dataSource.getRepository(ContactRequest);

    const [productsCount, dealersCount, contactsCount] = await Promise.all([
      productRepo.count(),
      dealerRepo.count(),
      contactRepo.count(),
    ]);

    return NextResponse.json({
      products: productsCount,
      dealers: dealersCount,
      contacts: contactsCount,
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}

