import { useContext, useState } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
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
        <div className="bottom-item recent-entry flex items-start gap-2.5 p-2.5 rounded-custom text-customDarkGray cursor-pointer hover:bg-customLightGray pr-2.5 ">
          <img src={assets.question} alt="question_icon" />
          {extended ? <p>Help</p> : null}
        </div>
        <div className="bottom-item recent-entry flex items-start gap-2.5 p-2.5 rounded-custom text-customDarkGray cursor-pointer hover:bg-customLightGray pr-2.5 ">
          <img src={assets.history} alt="history_icon" />
          {extended ? <p>Activity</p> : null}
        </div>
        <div className="bottom-item recent-entry flex items-start gap-2.5 p-2.5 rounded-custom text-customDarkGray cursor-pointer hover:bg-customLightGray pr-2.5 ">
          <img src={assets.setting} alt="setting_icon" />
          {extended ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
