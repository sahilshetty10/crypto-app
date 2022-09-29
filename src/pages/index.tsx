import React, { useEffect, useState } from "react";
import { PrismaClient } from "@prisma/client";
import axios from 'axios'
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Cell } from "recharts";


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
      <div className="">
        <button onClick={handleUpdate}>Update DB</button>
        <BarChart data={data} height={600} width={600}>
          <Bar dataKey="closingPrice">
            {data.map((entry: any, index: any) => (
              <Cell fill={entry.longShortRatio > 2 ? "#fff" : "#000"} key={index}/>
            ))}
          </Bar>
        </BarChart>
      </div>
    </>
  );
};

export default index;
