import React from "react";
import { PrismaClient } from "@prisma/client";
import axios from 'axios'
import { Chart } from "react-google-charts";



export async function getServerSideProps() {
  const prisma = new PrismaClient();
  let dbdata = await prisma.data.findMany();
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
  data.map((d:any) => closings.push(["", parseFloat(d.closingPrice),d.longShortRatio > 2 ? 2 : 1]));
  return (
    <>
      <div className="">
        <button onClick={handleUpdate}>Update DB</button>
        <Chart chartType="Line" width="100%" height="100%" data={closings} options={{series: {
              0: { axis: "Price" },
              1: { axis: "Buy/Sell" },
            }}}/>
      </div>
    </>
  );
};

export default index;
