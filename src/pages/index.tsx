import React, { useEffect, useState } from "react";
import { PrismaClient } from "@prisma/client";
import { InferGetServerSidePropsType } from "next";

export async function getServerSideProps() {
  const prisma = new PrismaClient();
  let dbdata = await prisma.data.findMany({ take: 100 });
  return {
    props: {
      data: JSON.parse(JSON.stringify(dbdata)),
    },
  };
}

const index = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <div className="w-[80%] h-screen"></div>
    </>
  );
};

export default index;
