import { useContext } from "react";
import { UserContext } from "../../context/assetsContext";
import { FaWhatsapp, FaLinkedinIn, FaGithub, FaCopy } from "react-icons/fa";
import imageHeader from "../../assets/eth.png";

export function Footer (){
    const userContext = useContext(UserContext);
    const { isEmailCopied, handleCopyEmail } = userContext || {};

    return(
         <footer className="h-[10%] flex justify-center bg-black  bg-opacity-40">
            <div className="flex justify-center w-3/4">
              <div className="flex w-[70%]">
                <div className="flex items-center justify-center h-full">
                  <img className="h-14" src={imageHeader} alt="" />
                </div>
                <div className="flex items-center justify-center h-full">
                  <span className="text-sm text-slate-100">contact:     </span>
                  <span
                    id="email"
                    className="ml-[4px] text-sm text-slate-100"
                    onClick={handleCopyEmail}
                    style={{ cursor: "pointer" }}
                  >
                    marcelo.paladino01@gmail.com
                  </span>
                  {isEmailCopied ? (
                    <FaCopy className="ml-2 text-green-400" />
                  ) : (
                    <FaCopy
                      onClick={handleCopyEmail}
                      className="ml-2 text-white transition duration-300 hover:text-green-400 hover:scale-110"
                    />
                  )}
                </div>
              </div>
              <div className="w-[30%] flex justify-end mr-4 items-center">
                <div className="flex">
                  <a
                    href="https://github.com/Marcelorox"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white transition duration-300 hover:text-orange-200 hover:scale-110"
                  >
                    <FaGithub />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/marcelo-rocha-paladino/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 text-white transition duration-300 hover:text-blue-300 hover:scale-110"
                  >
                    <FaLinkedinIn />
                  </a>
                  <a
                    href=""
                    className="ml-2 text-white transition duration-300 hover:text-green-400 hover:scale-110"
                  >
                    <FaWhatsapp />
                  </a>
                </div>
              </div>
            </div>
          </footer>
    )
}