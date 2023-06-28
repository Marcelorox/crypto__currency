import { useState } from "react";
import imageHeader from "../../assets/eth.png";
import { NavItem } from "./Li";

export function Header() {
    const [currentIndex, setCurrentIndex] = useState<number | null>(1);

    const handleFocus = (index: number) => {
      setCurrentIndex(index);
      };
   
  return (
    <>
        <header className="flex justify-center w-screen bg-black bg-opacity-40">
        <div className="flex items-center justify-between w-3/4">
          
        <img className="h-14" src={imageHeader} alt="logo"/>
        
        <nav className="flex list-none cursor-pointer">
          <NavItem
            index={1}
            onClick={() => handleFocus(1)}
            to="/"
            currentIndex={currentIndex} 
            label="Home"
          
          />
          <NavItem
            index={2}
            onClick={() => handleFocus(2)}
            to="/"
            currentIndex={currentIndex}
            label="Contact"
          
          />
          <NavItem
            index={3}
            onClick={() => handleFocus(3)}
            to="/"
            currentIndex={currentIndex}
            label="About"
          
          />
        </nav>
        
        </div>
        </header>
    </>
  );
}



