import { createContext, ReactNode, useState, useEffect } from "react";
import { api } from "../api/api";

interface UserContextProps {
  info: Asset[] | null;
  loading: boolean;
  isEmailCopied: boolean;
  handleCopyEmail: () => void;
}

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

export const UserContext = createContext<UserContextProps | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [info, setInfo] = useState<Asset[] | null>(null);
  const [loading, setLoading] = useState(true);
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
      setLoading(false)
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  const value: UserContextProps = {
    info,
    loading,
    isEmailCopied,
    handleCopyEmail
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
