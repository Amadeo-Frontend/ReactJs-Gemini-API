import{ useState } from "react";
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
      const imagePartsPromises = [...fileInputEl.files].map(fileToGenerativePart);
      const imageParts = await Promise.all(imagePartsPromises);
      
      const result = await model.generateContent([inputText,...imageParts]);
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
    <main className="p-12 w-screen">
      <div className="flex flex-col items-center justify-center">
        <h1 className="py-10 text-4xl">Google AI Gemini Integration</h1>
        <div className="card">
        <input
    className=" rounded-md border-none border-input bg-[#303133] text-gray-400 file:cursor-pointer file:py-3 file:border-0 file:bg-[#000] file:text-white file:text-sm file:font-medium"
    type="file"
    id="picture"
  />
          <input
            type="text"
            style={{ width: 400 }}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="bg-[#303133] mb-2 px-4 py-3 outline-none w-[280px] text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040] md:mb-0 md:mx-2"
          />
          <span className="hidden md:inline">
            {'|'}
          </span>
          
          <button
          className="bg-[#292929] border-2 border-[#3e3e3e] rounded-lg text-white px-6 py-3 text-base hover:border-[#fff] cursor-pointer transition mx-2"
          disabled={loading} onClick={() => fetchDataFromGeminiProAPI()}>
            {loading? <BeatLoader size={8} color="#fff" /> : "Get PRO data"}
          </button>
          <button
          className="bg-[#292929] border-2 border-[#3e3e3e] rounded-lg text-white px-6 py-3 text-base hover:border-[#fff] cursor-pointer transition"
            disabled={loading}
            onClick={() => fetchDataFromGeminiProVisionAPI()}
          >
            {loading? <BeatLoader size={8} color="#fff" /> : "Get PRO Vision data"}
          </button>
          <div>{data && <div className="border border-gray-500 p-2 rounded-md my-2 max-w-screen-xl">Resposta: {data}</div>}</div>
        </div>
      </div>
    </main>
  );
}

export default App;
