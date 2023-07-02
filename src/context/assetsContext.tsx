import { createContext, ReactNode, useState, useEffect } from "react";
import { api } from "../api/api";

interface Asset {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  supply: string;
  maxSupply: string;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  priceUsd: string;
  changePercent24Hr: string;
  vwap24Hr: string;
}
interface Candle {
  open: string,
  high: string,
  low: string,
  close: string,
  volume: string,
  period: number
}

interface UserContextProps extends Candle {
  dataCandle:Candle[] | null;
  fetchCandle: (data: Candle[] | null) => void;
}

interface UserContextProps extends Asset {
  info: Asset[] | null;
  loading: boolean; 
  isEmailCopied: boolean;
  handleCopyEmail: () => void;
  setCripto: (data: Asset[] | null) => void;
  cripto: Asset[] | null;
}



export const UserContext = createContext<UserContextProps>({} as UserContextProps);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [info, setInfo] = useState<Asset[] | null>(null);
  const [dataCandle, setDataCandle] = useState<Candle[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEmailCopied, setIsEmailCopied] = useState(false);
  const [cripto, setCripto] = useState<Asset[] | null>(null);

  const handleCopyEmail = () => {
    const emailElement = document.getElementById("email");

    if (emailElement) {
      const tempInput = document.createElement("input");
      tempInput.value = emailElement.textContent || "";
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand("copy");
      document.body.removeChild(tempInput);
      setIsEmailCopied(true);
      setTimeout(() => setIsEmailCopied(false), 2000);
    }
  };

  const fetchData = async () => {
    try {
      const { data } = await api.get("/assets");
      const dataArray: Asset[] = Object.values(data.data);
      setInfo(dataArray);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
      fetchData();
  }, []);

  
 const fetchCandle = async (response : string | number) => {
      try {
        const { data } = await api.get(`/candles?exchange=poloniex&interval=h8&baseId=${response.name}&quoteId=bitcoin\n`);
        const dataArray: Candle[] = Object.values(data.data);
        setDataCandle(dataArray)
      } catch (error) {
        console.log(error);
      }
  };

  const value: UserContextProps = {
    info,
    loading,
    isEmailCopied,
    handleCopyEmail,
    setCripto,
    cripto,
    dataCandle,
    fetchCandle
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
