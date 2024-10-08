import { useContext, useState } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);

  const [showSettings, setShowSettings] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  const toggleHistory = () => {
    setShowHistory((prev) => !prev);
  };

  const toggleFAQ = () => {
    setShowFAQ((prev) => !prev);
  };

  return (
    <div className="sidebar hidden sm:inline-flex sm:flex-col sm:justify-between sm:bg-gray-100 sm:px-3.5 sm:py-5 lg:max-h-screen sm:h-screen">
      <div className="top">
        <img
          onClick={() => setExtended((prev) => !prev)}
          className="menu block ml-2.5 cursor-pointer "
          src={assets.menu}
          alt="menu_icon"
        />
        <div
          onClick={() => newChat()}
          className="new-chat mt-12 inline-flex items-center bg-customGray rounded-custom text-sm py-1 px-1 text-gray-500 cursor-pointer "
        >
          <img src={assets.plus} alt="plus_icon" />
          {extended ? <p>New Chat</p> : null}
        </div>
        {extended ? (
          <div className="recent flex flex-col">
            <p className="recent-title mt-3 mb-3.5 ">Recent</p>
            {prevPrompts.map((item, index) => {
              return (
                <div
                  onClick={() => loadPrompt(item)}
                  className="recent-entry flex items-start gap-2.5 p-2.5 pr-3 rounded-custom text-customDarkGray cursor-pointer hover:bg-customLightGray "
                >
                  <img src={assets.message} alt="message_icon" />
                  <p>{item.slice(0, 18)}...</p>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
      <div className="bottom flex flex-col ">
        <div
          className="bottom-item recent-entry flex items-start gap-2.5 p-2.5 rounded-custom text-customDarkGray cursor-pointer hover:bg-customLightGray pr-2.5 "
          onClick={toggleFAQ}
        >
          <img src={assets.question} alt="question_icon" />
          {extended ? <p>Help</p> : null}
        </div>
        <div
          className="bottom-item recent-entry flex items-start gap-2.5 p-2.5 rounded-custom text-customDarkGray cursor-pointer hover:bg-customLightGray pr-2.5 "
          onClick={toggleHistory}
        >
          <img src={assets.history} alt="history_icon" />
          {extended ? <p>Activity</p> : null}
        </div>
        <div
          className="bottom-item recent-entry flex items-start gap-2.5 p-2.5 rounded-custom text-customDarkGray cursor-pointer hover:bg-customLightGray pr-2.5 "
          onClick={toggleSettings}
        >
          <img src={assets.setting} alt="setting_icon" />
          {extended ? <p>Settings</p> : null}
        </div>
      </div>

      {showSettings && (
        <div className="settings-modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="settings-content bg-gray-800 p-5 rounded-md w-[400px] shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Settings</h2>
            <p className="text-gray-300">Adjust your preferences here.</p>
            {/* Add more settings options here */}
            <button
              className="mt-5 bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={toggleSettings}
            >
              Close Settings
            </button>
          </div>
        </div>
      )}

      {showHistory && (
        <div className="history-content bg-gray-800 text-white p-5 w-[250px] absolute top-16 right-0 z-20 shadow-lg">
          <h3 className="text-lg font-semibold mb-3">Search History</h3>
          <ul>
            {prevPrompts.length > 0 ? (
              prevPrompts.map((prompt, index) => (
                <li key={index} className="history-item cursor-pointer py-2">
                  {prompt}
                </li>
              ))
            ) : (
              <li className="text-gray-400">No history available 😅</li>
            )}
          </ul>
        </div>
      )}

      {showFAQ && (
        <div className="faq-content bg-gray-800 text-white p-5 w-[300px] absolute top-16 right-0 z-20 shadow-lg">
          <h3 className="text-lg font-semibold mb-3">
            Frequently Asked Questions
          </h3>
          <ul className="text-sm space-y-3">
            <li
              className="faq-item"
              // onClick={() => onSent("How to use this application?")}
            >
              <strong>How to use this application?</strong>
              <p className="text-gray-300">
                Enter your query in the search box and press the send button.
              </p>
            </li>
            <li className="faq-item">
              <strong>Can I save my queries?</strong>
              <p className="text-gray-300">
                Yes, your previous prompts are saved in history.
              </p>
            </li>
            <li className="faq-item">
              <strong>Where can I find my search history?</strong>
              <p className="text-gray-300">
                Click on the "History" icon to see your previous searches.
              </p>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
