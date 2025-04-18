import { db } from "@/app/_lib/prisma";

// Example of a route that fetches a single product by its ID

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const productId = params.id;

  const product = await db.product.findUnique({
    where: {
      id: productId
    }
  })

  if(!product) {
    return Response.json({ message: 'Product not found' }, { status: 404 });
  }

  return Response.json(product, { status: 200 });
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const productId = params.id;

  await db.product.delete({
    where: {
      id: productId
    }
  })

  return Response.json({}, { status: 200, statusText: 'Product deleted' });
}