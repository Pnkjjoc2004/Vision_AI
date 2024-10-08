import React, { useContext, useState } from "react";
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
    newChat,
  } = useContext(Context);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    if (input) {
      onSent();
    }
  };

  return (
    <div className="flex flex-1 h-screen overflow-hidden">
      <div className="main bg-gray-900 text-gray-100 flex flex-1 flex-col min-h-screen relative items-start lg:max-h-screen overflow-y-auto md:overflow-hidden">
        <nav className="nav flex items-center justify-between w-full text-xl px-5 pl-1 sm:pl-5 sm:py-2 md:py-0 bg-gray-900 text-white">
          <img
            className="h-16 lg:h-24"
            src={assets.vision_icon}
            alt="Vision Icon"
          />
          <div className="flex items-center gap-5">
            <div
              onClick={() => newChat()}
              className="new-chat inline-flex items-center bg-customGray rounded-custom text-sm p-0.5 text-gray-500 cursor-pointer sm:hidden "
            >
              <img className="w-[20px]" src={assets.plus} alt="plus_icon" />
            </div>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
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
                <div
                  className="card h-[180px] p-3.5 bg-gray-800 rounded-md relative cursor-pointer bg-opacity-50 transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
                  onClick={() =>
                    onSent(
                      "Suggest beautiful places to see on an upcoming road trip"
                    )
                  }
                >
                  <p>
                    Suggest beautiful places to see on an upcoming road trip
                  </p>
                  <img
                    className="w-9 p-1.5 absolute bg-gray-700 rounded-lg bottom-2.5 right-2.5"
                    src={assets.compass}
                    alt="Compass Icon"
                  />
                </div>
                <div
                  className="card hidden md:block h-[180px] p-3.5 bg-gray-800 rounded-md relative cursor-pointer bg-opacity-50 transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
                  onClick={() =>
                    onSent("Briefly summarize this concept: urban planning")
                  }
                >
                  <p>Briefly summarize this concept: urban planning</p>
                  <img
                    className="w-9 p-1.5 absolute bg-gray-700 rounded-lg bottom-2.5 right-2.5"
                    src={assets.bulb}
                    alt="Bulb Icon"
                  />
                </div>
                <div
                  className="card h-[180px] p-3.5 bg-gray-800 rounded-md relative cursor-pointer bg-opacity-50 transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
                  onClick={() =>
                    onSent(
                      "Brainstorm team bonding activities for our work retreat"
                    )
                  }
                >
                  <p>Brainstorm team bonding activities for our work retreat</p>
                  <img
                    className="w-9 p-1.5 absolute bg-gray-700 rounded-lg bottom-2.5 right-2.5"
                    src={assets.message}
                    alt="Message Icon"
                  />
                </div>
                <div
                  className="card hidden lg:block h-[180px] p-3.5 bg-gray-800 rounded-md relative cursor-pointer bg-opacity-50 transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
                  onClick={() =>
                    onSent("Improve the readability of the following code")
                  }
                >
                  <p>Improve the readability of the following code</p>
                  <img
                    className="w-9 p-1.5 absolute bg-gray-700 rounded-lg bottom-2.5 right-2.5"
                    src={assets.code}
                    alt="Code Icon"
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="result md:pb-2 px-[5%] max-h-[70vh] overflow-y-scroll">
              {/* Result Title */}
              <div className="result-title my-10 flex items-center gap-5">
                <img
                  className="h-10 rounded-full"
                  src={user?.imageUrl || assets.user}
                  alt={user?.firstName || "User"}
                />
                <p className="text-xl font-semibold text-gray-100">
                  {recentPrompt}
                </p>
              </div>

              {/* Result Data */}
              <div className="result-data flex items-start gap-5">
                <img
                  className="h-12 w-12 rounded-full object-cover"
                  src={assets.vis_logo}
                  alt="AI Logo"
                />

                <div className="response-content flex-1 p-4 rounded-lg shadow-lg">
                  {loading ? (
                    <div className="loader w-full flex flex-col gap-2.5">
                      <hr className="rounded-custom2 border-none bg-gray-700 h-5 bg-gradient-to-r from-blue-200 to-green-300 bg-[800px_50px]" />
                      <hr className="rounded-custom2 border-none bg-gray-700 h-5 bg-gradient-to-r from-blue-200 to-green-300 bg-[800px_50px]" />
                      <hr className="rounded-custom2 border-none bg-gray-700 h-5 bg-gradient-to-r from-blue-200 to-green-300 bg-[800px_50px]" />
                    </div>
                  ) : (
                    <div
                      className="text-[17px] font-light leading-[1.8] text-gray-100"
                      dangerouslySetInnerHTML={{ __html: resultData }} // Render formatted result
                    ></div>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="main-bottom fixed bottom-0 w-full max-w-[900px] py-0 md:pt-5 px-5 m-auto w-full sm:w-[80%] sm:max-w-[900px]">
            {/* Form for handling submit */}
            <form onSubmit={handleSubmit}>
              <div className="search-box flex items-center justify-between gap-5 bg-gray-800 py-2.5 px-5 rounded-custom w-full z-10 shadow-lg">
                <input
                  onChange={(e) => setInput(e.target.value)}
                  value={input}
                  className="flex-1 border-none outline-none p-2 text-sm bg-transparent"
                  type="text"
                  placeholder="Enter your query here"
                />
                <div className="flex gap-2">
                  {input ? (
                    <button type="submit">
                      <img
                        className="w-[24px] cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
                        src={assets.send}
                        alt="Send Icon"
                      />
                    </button>
                  ) : (
                    <>
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
                    </>
                  )}
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
