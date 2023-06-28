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
          <main className="flex justify-center w-full h-[82%] bg-gray-700 bg-opacity-80 max-h-[100vh] ">
            <div className="flex flex-col w-3/4 overflow-scroll  max-h-[90vh]">
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
                info.map((data : any) => (
                <div key={data.id} className="flex flex-col w-3/5 max-h-36">
                    <div className="flex flex-col">
                      <img
                        className="w-24 h-24"
                        src={`https://assets.coincap.io/assets/icons/${data.symbol.toLowerCase()}@2x.png`}
                        alt={data.name + ' image'}
                      />
                      {data.name}
                    </div>
                </div>  
                ))
              )}
            </div>
          </main>
          <footer className="h-[12.4%] flex justify-between w-full bg-black  bg-opacity-40">
            <div className="flex w-[70%]">
              <span>Marcelo Rocha</span>
            </div>
            <div className="w-[30%]">
              <span>rocha</span>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}