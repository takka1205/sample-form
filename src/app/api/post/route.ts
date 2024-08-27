import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function main() {
  try {
    await prisma.$connect();
  } catch (err) {
    return Error("失敗");
  }
}

export const POST = async (req: Request, res: NextResponse) => {
  const { title, email } = await req.json();
  try {
    await main();
    const posts = await prisma.post.create({ data: { title, email } });
    return NextResponse.json({ message: "成功", posts }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "失敗", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
