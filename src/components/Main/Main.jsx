import React, { useContext } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";

const Main = () => {
  const { user } = useUser();
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    if (input) {
      onSent(); // Call onSent when form is submitted
    }
  };

  return (
    <div className="flex flex-1 h-screen overflow-hidden">
      <div className="main bg-gray-900 text-gray-100 flex flex-1 flex-col min-h-screen relative items-start lg:max-h-screen overflow-y-auto md:overflow-hidden">
        <nav className="nav flex items-center justify-between w-full text-xl px-5 sm:py-2 md:py-0 bg-gray-900 text-white">
          <img
            className="h-14 sm:h-14 lg:h-24"
            src={assets.vision_icon}
            alt="Vision Icon"
          />
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </nav>

        <div className="main-container max-w-[900px] w-full m-auto flex-1">
          {!showResult ? (
            <>
              <div className="greet my-[10px] mx-0 text-[48px] text-gray-700 font-medium p-5">
                <p>
                  <span>Hello, {user?.firstName || "User"}</span>
                </p>
                <p>How can I help you today?</p>
              </div>

              <div className="cards grid grid-flow-row sm:grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4 p-5">
                <div className="card h-[180px] p-3.5 bg-gray-800 rounded-md relative cursor-pointer bg-opacity-50 transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
                  <p>
                    Suggest beautiful places to see on an upcoming road trip
                  </p>
                  <img
                    className="w-9 p-1.5 absolute bg-gray-700 rounded-lg bottom-2.5 right-2.5"
                    src={assets.compass}
                    alt=""
                  />
                </div>
                <div className="card hidden md:block h-[180px] p-3.5 bg-gray-800 rounded-md relative cursor-pointer bg-opacity-50 transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
                  <p>Briefly summarize this concept: urban planning</p>
                  <img
                    className="w-9 p-1.5 absolute bg-gray-700 rounded-lg bottom-2.5 right-2.5"
                    src={assets.bulb}
                    alt=""
                  />
                </div>
                <div className="card h-[180px] p-3.5 bg-gray-800 rounded-md relative cursor-pointer bg-opacity-50 transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
                  <p>Brainstorm team bonding activities for our work retreat</p>
                  <img
                    className="w-9 p-1.5 absolute bg-gray-700 rounded-lg bottom-2.5 right-2.5"
                    src={assets.message}
                    alt=""
                  />
                </div>
                <div className="card hidden lg:block h-[180px] p-3.5 bg-gray-800 rounded-md relative cursor-pointer bg-opacity-50 transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
                  <p>Improve the readability of the following code</p>
                  <img
                    className="w-9 p-1.5 absolute bg-gray-700 rounded-lg bottom-2.5 right-2.5"
                    src={assets.code}
                    alt=""
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="result md:pb-2 px-[5%] max-h-[70vh] overflow-y-scroll">
              <div className="result-title my-10 flex items-center gap-5">
                <img
                  className="h-10 rounded-full"
                  src={user?.imageUrl || assets.user}
                  alt={user?.firstName || "User"}
                />
                <p>{recentPrompt}</p>
              </div>
              <div className="result-data flex items-start gap-5">
                <img
                  className="h-12 rounded-full"
                  src={assets.vis_logo}
                  alt=""
                />
                {loading ? (
                  <div className="loader w-full flex flex-col gap-2.5">
                    <hr className="rounded-custom2 border-none bg-gray-700 h-5 bg-gradient-to-r from-blue-200 to-green-300 bg-[800px_50px] " />
                    <hr className="rounded-custom2 border-none bg-gray-700 h-5 bg-gradient-to-r from-blue-200 to-green-300 bg-[800px_50px] " />
                    <hr className="rounded-custom2 border-none bg-gray-700 h-5 bg-gradient-to-r from-blue-200 to-green-300 bg-[800px_50px] " />
                  </div>
                ) : (
                  <p
                    className="text-[17px] font-light leading-[1.8] "
                    dangerouslySetInnerHTML={{ __html: resultData }}
                  ></p>
                )}
              </div>
            </div>
          )}

          <div className="main-bottom fixed bottom-0 w-full max-w-[900px] py-0 md:pt-5 px-5 m-auto w-full sm:w-[80%] sm:max-w-[900px]">
            {/* Form for handling submit */}
            <form onSubmit={handleSubmit}>
              <div className="search-box flex items-center justify-between gap-5 bg-gray-800 opacity-50 py-2.5 px-5 rounded-custom w-full">
                <input
                  onChange={(e) => setInput(e.target.value)}
                  value={input}
                  className="flex-1 border-none outline-none p-2 text-sm bg-transparent"
                  type="text"
                  placeholder="Enter your query here"
                />
                <div className="flex gap-2">
                  <img
                    className="w-[24px] cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
                    src={assets.gallery}
                    alt="Gallery Icon"
                  />
                  <img
                    className="w-[24px] cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
                    src={assets.mic}
                    alt="Mic Icon"
                  />
                  {input ? (
                    <button type="submit">
                      <img
                        className="w-[24px] cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
                        src={assets.send}
                        alt="Send Icon"
                      />
                    </button>
                  ) : null}
                </div>
              </div>
            </form>

            <p className="bottom-info text-xs my-3.5 mx-auto text-center font-light w-[90%]">
              Some of the information provided by Vision may be inaccurate,
              please check important info.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
