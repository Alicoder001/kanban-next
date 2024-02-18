import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const data = await prisma.user.findMany({});
    return Response.json({ data });
  } catch (error) {
    return Response.json({ error });
  }
}
export async function POST(request: Request) {
  try {
    const req = await request.json();

    const { name, email }: any = req;
    await prisma.user.create({
      data: {
        name,
        email,
      },
    });
    return Response.json({ message: "user added" });
  } catch (error) {
    const fail = error as Error;
    return Response.json({ error: fail.message });
  }
}
