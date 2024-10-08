import { createContext, useState } from "react";
import runChat from "../config/gemini";
import { marked } from "marked";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  // Helper function to delay the rendering of each word in the response
  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  };

  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    let response;
    if (prompt !== undefined) {
      response = await runChat(prompt); // Get response from API
      setRecentPrompt(prompt);
    } else {
      setPrevPrompts((prev) => [...prev, input]);
      setRecentPrompt(input);
      response = await runChat(input);
    }

    // Handle formatting for headings and bullet points
    let responseArray = response.split("**"); // Split by custom bold markers
    let formattedResponse = "";
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        formattedResponse += responseArray[i]; // Normal text
      } else {
        formattedResponse += "<b>" + responseArray[i] + "</b>"; // Bold text
      }
    }

    // Convert bullet points (*) to <li> and <ul> tags
    formattedResponse = formattedResponse.replace(
      /\n\* (.+?)(?=\n|$)/g,
      "<li>$1</li>"
    );
    formattedResponse = "<ul>" + formattedResponse + "</ul>";

    // Convert headings (#) to <h1>, <h2> tags
    formattedResponse = formattedResponse.replace(/^# (.+)$/gm, "<h1>$1</h1>");
    formattedResponse = formattedResponse.replace(/^## (.+)$/gm, "<h2>$1</h2>");

    // Line breaks
    formattedResponse = formattedResponse.replace(/\n/g, "<br/>");

    // Display the formatted response word by word
    const words = formattedResponse.split(" ");
    for (let i = 0; i < words.length; i++) {
      const nextWord = words[i];
      delayPara(i, nextWord + " ");
    }

    const htmlResponse = marked(response);

    setResultData(htmlResponse);
    setLoading(false);
    setInput("");
  };

  // Context value that is passed to all consuming components
  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
