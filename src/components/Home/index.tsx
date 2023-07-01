import { Header } from "../Header";
import { Footer } from "./Footer";
import { Main } from "./Main";

export function Home() {
  return (
    <>
      <div className="flex min-h-screen w-full h-full bg-[url('./assets/space.jpg')] bg-cover">
        <div className="flex flex-col">
          <Header />
          <Main/>
          <Footer/>
        </div>
      </div>
    </>
  );
}