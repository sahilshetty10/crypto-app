import React,{useState} from "react";
import { PrismaClient } from "@prisma/client";
import axios from 'axios'
import { Chart } from "react-google-charts";



export async function getServerSideProps() {
  const prisma = new PrismaClient();
  let dbdata = await prisma.data.findMany({take:4000});
  return {
    props: {
      data: JSON.parse(JSON.stringify(dbdata)),
    },
  };
}

const index = ({ data }: any) => {
  const [lowerValue,setLowerValue] = useState(1.1)
  const [upperValue,setUpperValue] = useState(2)
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
        <input type="number" value={lowerValue} onChange={(e)=>setLowerValue(parseFloat(e.target.value))} placeholder="Enter Lower Value"/>
        <input type="number" value={upperValue} onChange={(e)=>setUpperValue(parseFloat(e.target.value))} placeholder="Enter Upper Value"/>
        <Chart chartType="Line" width="100%" height="100%" data={closings} options={{series: {
              0: { axis: "Price" },
              1: { axis: "Buy/Sell" },
            }}}/>
      </div>
    </>
  );
};

export default index;
