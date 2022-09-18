// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import getData from "../../utils/getData";
import { PrismaClient } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    let btcdata = await getData();
    const prisma = new PrismaClient();
    // await prisma.data.deleteMany();
    let createentry = await prisma.data.createMany({
      data: btcdata,
      skipDuplicates: true,
    });
    res.status(200).json(createentry);
  } else {
    res.status(400).send("incorrect method");
  }
}
