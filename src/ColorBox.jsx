// ColorBox.jsx
import { useState } from "react";

function ColorBox({ initialColor = "#3498db", colorOptions = [] }) {
  const [color, setColor] = useState(initialColor);

  const changeColor = () => {
    if (colorOptions.length > 0) {
      const randomColor =
        colorOptions[Math.floor(Math.random() * colorOptions.length)];
      setColor(randomColor);
    } else {
      const randomHex = "#" + Math.floor(Math.random() * 16777215).toString(16);
      setColor(randomHex);
    }
  };

  return (
    <div>
      <div
        style={{
          width: "150px",
          height: "150px",
          backgroundColor: color,
          marginBottom: "10px",
        }}
      />
      <button onClick={changeColor}>Changer de couleur</button>
    </div>
  );
}

export default ColorBox;
