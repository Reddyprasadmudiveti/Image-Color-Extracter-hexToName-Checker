import React, { useState, useEffect } from "react";
import useStore from "../Zustand/useStore";
import axios from "axios";

const rgbtoHex = (r, g, b) => {
  const toHex = (n) => {
    const hex = n.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

const getColorName = async (hex) => {
  if (!hex || hex === "0") {
    return "Please enter valid color value";
  }
  try {
    const response = await axios.get(`https://api.color.pizza/v1/${hex}`);
    const data = response.data;
    console.log("data", data);
    return data.colors[0].name; // Assumes the response contains a colors array with a name property
  } catch (error) {
    console.error("Error fetching color name:", error);
    return "Unknown Color";
  }
};

const DisplayImage = ({ uploadedImage, colorPalette }) => {
  const [loading, setLoading] = useState(false)
  const [bgColor, setBgColor] = useState("transparent");
  const [bgColor1, setBgColor1] = useState("transparent");
  const [checkColor, setCheckColor] = useState("");
  const [copied, setCopied] = useState(null);
  const [submittedColor, setSubmittedColor] = useState("");
  const [colorName, setColorName] = useState("");
  const setColors = useStore((state) => state.setColors);
  const [textColor, setTextColor] = useState("")

  useEffect(() => {
    if (colorPalette) {
      const rgb = rgbtoHex(colorPalette[2][0], colorPalette[2][1], colorPalette[2][2]);
      const rgb1 = rgbtoHex(colorPalette[0][0], colorPalette[0][1], colorPalette[0][2]);
      setBgColor(rgb);
      setBgColor1(rgb1);
      setColors([rgb, rgb1]);
    }
  }, [colorPalette, setColors]);

  
  useEffect(() => {
    const textColor = bgColor[0] * 0.299 + bgColor1[1] * 0.587 + bgColor1[2] * 0.114 > 186 ? 'black' : 'white';
    console.log("TextColor", textColor);
    setTextColor(textColor);
  }, [bgColor, bgColor1]); // Adjusted dependencies
  
  const handleCopy = (color, idx) => {
    navigator.clipboard.writeText(color);
    setCopied(idx);
    setTimeout(() => setCopied(null), 2000);
    setColorName("")
    setSubmittedColor("")
  };

  const handleCheckColor = async (e) => {
    e.preventDefault();
    setSubmittedColor(checkColor);
    setLoading(true)
    const name = await getColorName(checkColor.replace('#', '')); 
    console.log("name", name)// Remove '#' if present
    setColorName(name);
    setCheckColor("");
    setLoading(false)

  };

  return (
    <div className="w-full h-full gap-4 flex flex-col justify-center items-center">
      <div className="w-[400px] object-fill">
      <div className="flex p-4 border-2  rounded-xl justify-center items-center" style={{ background: `linear-gradient(to bottom, ${bgColor1}, ${bgColor})` }}>
        {uploadedImage ? (
          <img src={uploadedImage} className="h-[200px]" alt="uploaded" />
        ) : (
          <p>Upload an image...</p>
        )}
      </div>
        </div>
      <div className="flex justify-center flex-col items-center text-white text-2xl">
        {colorPalette ? (
          <ul className="flex flex-wrap gap-4 items-center justify-center selection:bg-white w-full max-w-[400px]">
            {colorPalette.map((color, idx) => {
              const rgb = rgbtoHex(color[0], color[1], color[2]);
              const textColor = color[0] * 0.299 + color[1] * 0.587 + color[2] * 0.114 > 186 ? 'black' : 'white';

              return (
                <li
                  className="py-5 h-[100px] w-[100px] flex justify-center hover:translate-y-[-10px] transition-all duration-300 rounded-2xl items-center"
                  style={{ backgroundColor: rgb, color: textColor }}
                  key={idx}
                  onClick={() => handleCopy(rgb, idx)}
                >
                  {copied === idx ? "Copied" : rgb}
                </li>
              );
            })}
          </ul>
        ) : (
          <p>No color palette found</p>
        )}
      </div>
      <div className="flex flex-col items-center gap-2 justify-center h-full w-full">
          <h1 className="text-white to-gray-400 text-2xl font-bold" style={{color: textColor}}>Want to know what color is this?</h1>
        <form onSubmit={handleCheckColor} className="flex items-center gap-4">
          <input 
            type="text" 
            // onChange={(e) => setCheckColor(e.target.value)}
            onClick={async () => {
              const text = await navigator.clipboard.readText();
              setCheckColor(text);
            }}
            value={checkColor}
            placeholder="Enter color hex"
            className="border p-2 rounded"
          />
          <button type="submit" className="p-2 bg-blue-500 text-white rounded">Check</button>

        </form>
        <div className="mt-4 flex flex-col items-center justify-center gap-2 w-full">
          <p className="h-[100px] rounded-xl w-[100px] text-center flex items-center justify-center" style={{ backgroundColor: submittedColor, transition: 'opacity 1s', opacity: submittedColor ? 1 : 0 }}>
            {submittedColor}
          </p>
          <p className="text-white text-2xl font-bold w-full text-center flex items-center justify-center" style={{color: textColor}}>
            {loading ? <span className="shadow-xl loading-spinner loading"></span> : <span style={{color: "white"}}>{colorName}</span>}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DisplayImage;
