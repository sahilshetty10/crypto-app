import React, { useEffect, useState } from "react";
import { PrismaClient } from "@prisma/client";

export async function getServerSideProps() {
  const prisma = new PrismaClient();
  let dbdata = await prisma.data.findMany({ take: 100 });
  return {
    props: {
      data: JSON.parse(JSON.stringify(dbdata)),
    },
  };
}

const index = ({ data }: any) => {
  return (
    <>
      <div className=""></div>
    </>
  );
};

export default index;
