import { db } from "@/app/_lib/prisma";

// apenas para referenia de como usar o route handler, para esse projeto estamos usando o data-access

export async function GET() {
  const products = await db.product.findMany();

  return Response.json(products, {
    status: 200,
  });
}

export async function POST(request: Request) {
  const body = await request.json();

  const { name, price, stock }  = body;

  await db.product.create({
    data: {
      name,
      price,
      stock
    }
  })

  return Response.json({}, { status: 201 });
}