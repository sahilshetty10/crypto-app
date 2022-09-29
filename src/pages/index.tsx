import React, { useEffect, useState } from "react";
import { PrismaClient } from "@prisma/client";
import axios from 'axios'

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
  const handleUpdate = async () => {
    let response = await axios.post('/api/updateDB')
    let data = response.data
    window.alert(JSON.stringify(data))
  } 
  return (
    <>
      <div className=""><button onClick={handleUpdate}>Update DB</button></div>
      <p>{JSON.stringify(data)}</p>
    </>
  );
};

export default index;
