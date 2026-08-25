import { NextRequest, NextResponse } from "next/server";
import { getDataSource } from "@/lib/db/data-source";
import { Dealer } from "@/lib/db/entities";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const dataSource = await getDataSource();
    const dealerRepo = dataSource.getRepository(Dealer);
    const dealer = await dealerRepo.findOneBy({ id });
    
    if (!dealer) {
      return NextResponse.json({ error: "Dealer not found" }, { status: 404 });
    }
    
    return NextResponse.json(dealer);
  } catch (error) {
    console.error("Error fetching dealer:", error);
    return NextResponse.json({ error: "Failed to fetch dealer" }, { status: 500 });
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
    const dealerRepo = dataSource.getRepository(Dealer);
    
    await dealerRepo.update(id, body);
    const dealer = await dealerRepo.findOneBy({ id });
    
    return NextResponse.json(dealer);
  } catch (error) {
    console.error("Error updating dealer:", error);
    return NextResponse.json({ error: "Failed to update dealer" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const dataSource = await getDataSource();
    const dealerRepo = dataSource.getRepository(Dealer);
    
    await dealerRepo.delete(id);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting dealer:", error);
    return NextResponse.json({ error: "Failed to delete dealer" }, { status: 500 });
  }
}

