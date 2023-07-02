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
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  period: number;
  response: string;
}

interface UserContextProps {
  info: Asset[] | null;
  loading: boolean;
  cripto: Asset | null;
  handleCopyEmail: () => void;
  isEmailCopied: boolean;
  setCripto: (data: Asset | null) => void;
  fetchCandle: (symbol: string) => void;
  dataCandle: Candle[] | null;
}

export const UserContext = createContext<UserContextProps>(
  {} as UserContextProps
);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [info, setInfo] = useState<Asset[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [cripto, setCripto] = useState<Asset | null>(null);
  const [dataCandle, setDataCandle] = useState<Candle[] | null>(null);
  const [isEmailCopied, setIsEmailCopied] = useState(false);

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

  const fetchCandle = async (symbol: string) => {
    try {
      const { data } = await api.get(
        `/candles?exchange=poloniex&interval=h8&baseId=${symbol}&quoteId=bitcoin\n`
      );
      const dataArray: Candle[] = Object.values(data.data);
      setDataCandle(dataArray);
      console.log(dataCandle);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const value: UserContextProps = {
    info,
    loading,
    cripto,
    setCripto,
    fetchCandle,
    dataCandle,
    isEmailCopied,
    handleCopyEmail,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
