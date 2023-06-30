import { useContext } from "react";
import { Header } from "../Header";
import { UserContext } from "../../context/usecontext";

export function Home() {
  const userContext = useContext(UserContext);
  const { info, loading } = userContext || {};

  return (
    <>
      <div className="flex min-h-screen w-full h-full bg-[url('./assets/space.jpg')] bg-cover">
        <div className="flex flex-col">
          <Header />
          <main className="flex justify-center w-full h-[82%] max-h-[100vh] bg-black bg-opacity-90 border-t-[0.5px] border-b-[0.5px] border-gray-500">
            <div className="flex w-3/4 flex-wrap overflow-scroll max-w-[100vw]  max-h-[90vh] ">
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
                    className="flex flex-col p-6 ml-6 mt-4 h-[14rem] w-[10.3rem] justify-center bg-white bg-opacity-10 transition duration-300 ease-in-out rounded hover:scale-110 "
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
                          ${data.priceUsd.slice(0, 7)}
                        </span>
                        
                      </div>
                      
                    </div>
                    <button className="items-center justify-center h-8 mt-2 text-white transition duration-300 bg-blue-400 rounded hover:bg-blue-700">Exchange</button>
                  </div>
                ))
              )}
            </div>
          </main>
          <footer className="h-[12.4%] flex justify-between w-full bg-black  bg-opacity-40">
            <div className="flex w-[70%]">
              <div>
              <span>Marcelo Rocha</span>
              </div>
              <div>
                
              </div>
            </div>
            <div className="w-[30%]">
              <div>
                
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
