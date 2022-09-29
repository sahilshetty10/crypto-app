import React,{useState} from "react";
import { PrismaClient } from "@prisma/client";
import axios from 'axios'
import { Chart } from "react-google-charts";



export async function getServerSideProps() {
  const prisma = new PrismaClient();
  let dbdata = await prisma.data.findMany({take:400});
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
  const closings: any = [["", "Price","Buy/Sell"]];
  data.map((d:any) => closings.push(["", parseFloat(d.closingPrice),d.longShortRatio > upperValue ? 2 : d.longShortRatio > lowerValue ? 1 : 2]));
  return (
    <>
      <div className="">
        <button onClick={handleUpdate}>Update DB</button>
        <p>{JSON.stringify(data)}</p>
      </div>
    </>
  );
};

export default index;
