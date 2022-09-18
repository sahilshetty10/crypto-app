import axios from "axios";

interface RatioData {
  symbol: string;
  longAccount: string;
  longShortRatio: string;
  shortAccount: string;
  timestamp: number;
}
interface Data {
  symbol: string;
  openingPrice: number;
  closingPrice: number;
  volume: number;
  longAccount: number;
  longShortRatio: number;
  shortAccount: number;
  timestamp: Date;
}

async function getData() {
  let ratioPromise = axios.get(
    "https://www.binance.com/futures/data/globalLongShortAccountRatio",
    { params: { symbol: "BTCUSDT", period: "5m", limit: "500" } }
  );
  let klinesPromise = axios.get("https://api.binance.com/api/v3/klines", {
    params: { symbol: "BTCUSDT", interval: "5m", limit: "500" },
  });

  let [ratioResponse, klinesResponse] = await Promise.all([
    ratioPromise,
    klinesPromise,
  ]);
  let data: Data[] = [];
  let ratioData: RatioData[] = ratioResponse.data;
  let klinesData = klinesResponse.data;
  for (let i = 0; i < 500; i++) {
    let ratioTs = ratioData[i].timestamp;
    let klineBlock = klinesData.find(
      (element: string | number[]) => element[0] == ratioTs
    );
    klineBlock != undefined &&
      data.push({
        symbol: ratioData[i].symbol,
        timestamp: new Date(ratioTs),
        openingPrice: parseFloat(klineBlock[1]),
        closingPrice: parseFloat(klineBlock[4]),
        volume: parseFloat(klineBlock[5]),
        longAccount: parseFloat(ratioData[i].longAccount),
        longShortRatio: parseFloat(ratioData[i].longShortRatio),
        shortAccount: parseFloat(ratioData[i].shortAccount),
      });
  }
  return data;
}

export default getData;
