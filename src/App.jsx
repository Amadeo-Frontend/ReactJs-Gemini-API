import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import BeatLoader from "react-spinners/BeatLoader";

function App() {
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const [data, setData] = useState("");
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);

  async function fetchDataFromGeminiProAPI() {
    try {
      if (!inputText) {
        alert("Please enter text!");
        return;
      }
      setLoading(true);
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const result = await model.generateContent(inputText);
      const text = result.response.text();
      setLoading(false);
      setData(text);
    } catch (error) {
      setLoading(false);
      console.error("fetchDataFromGeminiAPI error: ", error);
    }
  }

  async function fetchDataFromGeminiProVisionAPI() {
    try {
      if (!inputText) {
        alert("Please enter text!");
        return;
      }
      setLoading(true);
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

      const fileInputEl = document.querySelector("input[type=file]");
      const imagePartsPromises = [...fileInputEl.files].map(
        fileToGenerativePart
      );
      const imageParts = await Promise.all(imagePartsPromises);

      const result = await model.generateContent([inputText, ...imageParts]);
      const text = result.response.text();

      setLoading(false);
      setData(text);
    } catch (error) {
      setLoading(false);
      console.error("fetchDataFromGeminiAPI error: ", error);
    }
  }

  function fileToGenerativePart(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = reader.result.split(",")[1];
        resolve({
          inlineData: {
            data: base64Data,
            mimeType: file.type,
          },
        });
      };
      reader.readAsDataURL(file);
    });
  }

  return (
    <main className="w-screen p-12 mx-auto">
      <div className="flex flex-col items-center justify-center">
        <h1 className="py-10 text-4xl">Ask Gemini AI</h1>
        <div className="flex flex-col items-center p-2 card">
          <div className="flex flex-col w-full mx-auto md:flex-row md:items-center">
            <input
            className=" rounded-md mb-2 border-none border-input bg-[#303133] text-gray-400 md:mb-0 file:cursor-pointer file:py-3 file:border-0 file:bg-[#000] file:text-white file:text-sm file:font-medium"
            type="file"
            id="picture"
            lang="english"
          />
          <input
            type="text"
            style={{ width: 400 }}
            value={inputText}
            placeholder="Ask anything. What are you stuck on?"
            onChange={(e) => setInputText(e.target.value)}
            className="bg-[#303133] mb-2 px-4 py-3 outline-none w-[280px] text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040] md:mb-0 md:mx-2"
          />
          <span className="hidden md:inline">{"|"}</span>
          <div className="flex items-center justify-center whitespace-nowrap">
            <button
              className="bg-[#292929] border-2 border-[#3e3e3e] rounded-lg text-white px-5 py-3 text-sm md:text-base hover:border-[#fff] cursor-pointer transition mx-2"
              disabled={loading}
              onClick={() => fetchDataFromGeminiProAPI()}
            >
              {loading ? <BeatLoader size={8} color="#fff" /> : "Get PRO data"}
            </button>
            <button
              className="bg-[#292929] border-2 border-[#3e3e3e] rounded-lg text-white px-5 py-3 text-sm md:text-base hover:border-[#fff] cursor-pointer transition"
              disabled={loading}
              onClick={() => fetchDataFromGeminiProVisionAPI()}
            >
              {loading ? (
                <BeatLoader size={8} color="#fff" />
              ) : (
                "Get PRO Vision data"
              )}
            </button>
          </div>
          </div>
          
          <div className="flex flex-col p-2">
            {data && (
              <div className="max-w-screen-xl p-2 my-2 overflow-x-hidden border border-gray-500 rounded-md">
                Resposta: {data}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
