import { useContext, useState } from "react";
import { UserContext } from "../../context/assetsContext";
import { Sail } from "../candlestick";


export function Main() {
  const userContext = useContext(UserContext);
  const { info, loading, cripto, setCripto, fetchCandle } = userContext || {};
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = (data: any) => {
    setCripto && setCripto(data);
    setIsOpen(true);
    fetchCandle(data)
    
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  return (
    <main className="flex justify-center w-full h-[100%] max-h-[85vh] bg-black bg-opacity-90 border-t-[0.5px] border-b-[0.5px] border-gray-500">
      <div className="flex w-3/4 flex-wrap overflow-scroll max-w-[100vw] mt-3  max-h-[80vh] ">
        {loading || !info ? (
          <div className="flex justify-center h-full m-auto mt-36">
            <div
              className="inline-block h-40 w-40 animate-spin rounded-full border-cyan-100 border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
          </div>
        ) : (
          info.map((data: any) => (
            <div
              key={data.id}
              className="flex flex-col p-6 ml-6 mt-8 h-[14rem] w-[10.3rem] justify-center bg-white bg-opacity-10 transition duration-300 ease-in-out rounded hover:scale-110 "
              onClick={() => openDialog(data)}
            >
              <div className="flex flex-col ">
                <div className="flex justify-center">
                  <img
                    className="h-[75px] w-22"
                    src={`https://assets.coincap.io/assets/icons/${data.symbol.toLowerCase()}@2x.png`}
                    alt={data.name + " image"}
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="flex justify-center mt-2 text-sm text-slate-300">
                    {data.name.slice(0, 12)}
                  </span>
                  <span className="flex justify-center mt-1 text-sm text-white">
                    $ {data.priceUsd.slice(0, 7)}
                  </span>
                </div>
              </div>
              <button className="items-center justify-center h-8 mt-2 text-white transition duration-300 bg-blue-400 rounded hover:bg-blue-700">
                Exchange
              </button>
            </div>
          ))
        )}
      </div>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm"
            onClick={closeDialog}
          ></div>
          <div className="relative flex flex-col w-1/2 p-8 bg-white rounded-lg h-1/2">
            <div className="flex justify-end opacity-60">
              <button className="text-black" onClick={closeDialog}>
                X
              </button>
            </div>

            <div className="flex flex-col sm:flex-row">
              <div className="flex flex-col w-max h-max">
                <img
                  className="w-22 h-22"
                  src={`https://assets.coincap.io/assets/icons/${cripto?.symbol.toLowerCase()}@2x.png`}
                  alt={`${cripto.name} image`}
                />
              </div>

              <div className="flex flex-col justify-center ml-4">
                <span>{cripto.priceUsd.slice(0, 8)}</span>
                <span>{cripto.name}</span>
              </div>
            </div>
            <div id="inferno" className="mt-9">
              <Sail/>
            </div>
            
          </div>
        </div>
      )}
    </main>
  );
}
