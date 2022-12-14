import React,{useState} from "react";
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
