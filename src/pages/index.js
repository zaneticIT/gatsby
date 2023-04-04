import * as React from "react";
import { useState } from "react";
import Bus from "../images/bus.svg";
import Tram from "../images/tram.svg";
import First from "../images/1.svg";
import Second from "../images/2.svg";
import Third from "../images/3.svg";
import Fourth from "../images/4.svg";
import Fifth from "../images/5.svg";

const pageStyles = {
  color: "#232129",
  backgroundColor: "#F0E9FF",
  padding: "90px",
  position: "absolute",
  top: "10px",
  right: "10px",
  bottom: "10px",
  left: "10px",
  fontFamily: "Roboto, sans-serif, serif",
};

const typeStyles = {
  display: "flex",
  flexDirection: "row",
  height: "35px",
  margin: "10px",
};

const iconStyles = {
  marginRight: "10px",
  textAlign: "center",
  width: "20px",
};

const linesStyle = {
  position: "relative",
};

const spacingStyle = {
  textAlign: "center",
  width: "50px",
};

const buttonStyle = {
  textAlign: "center",
  border: "1px #749DAD solid",
  borderRadius: "5px",
  cursor: "pointer",
  height: "35px",
  margin: "10px",
  red: {
    backgroundColor: "#ff6961",
  },
  green: {
    backgroundColor: "#77DD77",
  },
};

const checkboxStyles = {
  display: "none",
};

const mainStyles = {
  display: "flex",
  flexDirection: window.screen.width > 1280 ? "row" : "column",
  gap: window.screen.width > 1280 ? "15vw" : 0,
};

const inputStyle = {
  cursor: "pointer",
  fontSize: "24px",
  color: "red",
};

const rowButtonStyle = {
  display: "grid",
  gridTemplateColumns: "100px 100px 100px",
};

const lineColors = [
  { backgroundColor: "#808080" },
  { backgroundColor: "#00a4d6" },
  { backgroundColor: "#AA00FF" },
  { backgroundColor: "#ffa100" },
  { backgroundColor: "#4ec639" },
];

const labelStyle = (num) => {
  return {
    backgroundColor: lineColors[num].backgroundColor,
    justifyContent: "space-evenly",
    display: "flex",
    width: "130px",
    alignItems: "center",
    borderRadius: "10px",
  };
};

const IndexPage = () => {
  const [visible, setVisible] = useState([true, true, true, true, true]);
  const [type, setType] = useState(["B", "T"]);
  const [checkedType, setCheckedType] = useState([true, true]);
  const [favorites, setFavorites] = useState({
    list: [false, false, false, false, false, false, false],
  });

  const [changed, setChanged] = useState(false);

  function handleLocalStorage(index) {
    const newFavorites = favorites.list;
    newFavorites[index] = !newFavorites[index];
    var tempObject = { list: newFavorites };
    setFavorites(tempObject);
    localStorage.setItem("F", JSON.stringify(tempObject));
  }

  const handleFavorites = () => {
    applyFavorites();
    setChanged(!changed);
  };

  function getFavorites() {
    var favorites = JSON.parse(localStorage.getItem("F"));
    setFavorites(favorites);
  }

  function applyFavorites() {
    var tempVisible = visible;
    var tempType = checkedType;
    favorites.list.map((value, index) => {
      if (index >= 2 && index <= favorites.list.length && !visible[index - 2]) {
        tempVisible[index - 2] = value;
      } else if (index < 2 && !checkedType[index]) {
        tempType[index] = value;
      }
    });
    setVisible(tempVisible);
    setCheckedType(tempType);
    setChanged(!changed);
  }

  function hideFavorites() {
    var tempVisible = visible;
    var tempType = checkedType;
    favorites.list.map((value, index) => {
      if (
        index >= 2 &&
        index <= favorites.list.length &&
        favorites.list[index] === true
      ) {
        tempVisible[index - 2] = !value;
      } else if (index < 2 && favorites.list[index] === true) {
        tempType[index] = !value;
      }
    });
    setVisible(tempVisible);
    setCheckedType(tempType);
    setChanged(!changed);
  }

  function clearFavorites() {
    setFavorites(JSON.stringify());
    setChanged(!changed);
  }

  function removeFavorites() {
    localStorage.setItem(
      "F",
      JSON.stringify({
        list: [false, false, false, false, false, false, false],
      })
    );
    clearFavorites();
    defaultFavorites();
    setChanged(!changed);
  }

  function showAll() {
    setVisible([true, true, true, true, true]);
    setCheckedType([true, true]);
    setChanged(!changed);
  }

  function showNone() {
    setVisible([false, false, false, false, false]);
    setCheckedType([false, false]);
    setChanged(!changed);
  }

  function defaultFavorites() {
    localStorage.hasOwnProperty("F")
      ? getFavorites()
      : localStorage.setItem("F", JSON.stringify(favorites));
  }

  React.useEffect(() => {
    defaultFavorites();
  }, [changed]);

  function handleIfFavorite(index) {
    var returns;
    returns = favorites.list[index];
    return returns;
  }

  const handleClickVisible = (num) => {
    const newVisible = visible.map((item, index) =>
      index === num ? !item : item
    );

    setVisible(newVisible);
  };

  const handleClickType = (num) => {
    const newCheckedType = checkedType.map((item, index) =>
      num === index ? !item : item
    );
    setCheckedType(newCheckedType);
  };

  function chooseType() {
    const returns = [];
    returns.push(<p>Choose your transport type: </p>);
    checkedType.map((value, index) =>
      returns.push(
        <>
          <div style={typeStyles}>
            <div style={spacingStyle}>
              <p style={{ marginLeft: "10px" }}>
                {type[index] === "B" ? "Bus" : "Tram"}
              </p>
            </div>
            <div style={spacingStyle}>
              <input
                key={index}
                type="checkbox"
                defaultChecked={value}
                checked={value}
                onChange={() => handleClickType(index)}
              />
            </div>
            <div style={iconStyles}>
              <img
                src={type[index] === "B" ? Bus : Tram}
                alt="transport icon"
              />
            </div>
            <div style={spacingStyle}>
              <input
                key={index}
                id={"favorite" + index}
                type="checkbox"
                checked={handleIfFavorite(index)}
                defaultChecked={handleIfFavorite(index)}
                onChange={() => handleLocalStorage(index)}
                style={checkboxStyles}
              />
              <label htmlFor={"favorite" + index} style={inputStyle}>
                {handleIfFavorite(index) ? "♥" : "♡"}
              </label>
            </div>
          </div>
        </>
      )
    );
    returns.push(
      <div style={rowButtonStyle}>
        <button
          type="button"
          onClick={handleFavorites}
          style={{ ...buttonStyle, ...buttonStyle.green }}
        >
          Display favorites
        </button>
        <button
          type="button"
          onClick={hideFavorites}
          style={{ ...buttonStyle, ...buttonStyle.red }}
        >
          Hide favorites
        </button>
        <button
          type="button"
          onClick={removeFavorites}
          style={{ ...buttonStyle, ...buttonStyle.red }}
        >
          Remove favorites
        </button>
      </div>
    );
    returns.push(
      <div style={rowButtonStyle}>
        <button
          type="button"
          onClick={showAll}
          style={{ ...buttonStyle, ...buttonStyle.green }}
        >
          Show all
        </button>
        <button
          type="button"
          onClick={showNone}
          style={{ ...buttonStyle, ...buttonStyle.red }}
        >
          Hide all
        </button>
      </div>
    );
    return returns;
  }

  function fillTable() {
    const returns = visible.map((value, index) => (
      <>
        <div style={typeStyles}>
          <div style={labelStyle(index)}>
            <input
              key={index}
              type="checkbox"
              defaultChecked={value}
              checked={value}
              onChange={() => handleClickVisible(index)}
            />
            <span style={{ width: "15px" }}>
              {index === 2 || index === 3 ? index + 1 : index + 1}
            </span>
            <span>{index === 2 || index === 3 ? " Bus" : " Tram"}</span>
            <input
              key={index}
              id={"favorite" + index + 2}
              type="checkbox"
              defaultChecked={handleIfFavorite(index + 2)}
              checked={handleIfFavorite(index)}
              onChange={() => handleLocalStorage(index + 2)}
              style={checkboxStyles}
            />
            <label htmlFor={"favorite" + index + 2} style={inputStyle}>
              {handleIfFavorite(index + 2) ? "♥" : "♡"}
            </label>
          </div>
        </div>
      </>
    ));

    return returns;
  }

  const images = [
    {
      image: { src: First, filter: "invert(50%)", visible: 0, type: 1 },
    },
    {
      image: {
        src: Second,
        filter:
          "invert(44%) sepia(96%) saturate(3010%) hue-rotate(166deg) brightness(102%) contrast(101%)",
        visible: 1,
        type: 1,
      },
    },
    {
      image: {
        src: Third,
        filter:
          "invert(14%) sepia(100%) saturate(4067%) hue-rotate(276deg) brightness(102%) contrast(130%)",
        visible: 2,
        type: 0,
      },
    },
    {
      image: {
        src: Fourth,
        filter:
          " invert(73%) sepia(25%) saturate(5914%) hue-rotate(358deg) brightness(99%) contrast(107%)",
        visible: 3,
        type: 0,
      },
    },
    {
      image: {
        src: Fifth,
        filter:
          "invert(53%) sepia(97%) saturate(356%) hue-rotate(64deg) brightness(101%) contrast(91%)",
        visible: 4,
        type: 1,
      },
    },
  ];

  function line(num) {
    const returns = (
      <>
        <img
          style={{
            position: "absolute",
            filter: images[num].image.filter,
            display:
              visible[images[num].image.visible] &&
              checkedType[images[num].image.type]
                ? "inline"
                : "none",
            height: window.screen.width > 720 ? "500px" : "200px",
            padding: window.screen.width > 780 ? "0px" : "100px",
          }}
          src={images[num].image.src}
        />
      </>
    );
    return returns;
  }

  function fillLines() {
    var returns = [];

    returns = images.map((value, index) => line(index));

    return returns;
  }

  return (
    <main style={pageStyles}>
      <div style={mainStyles}>
        <div>
          {chooseType()}
          {fillTable()}
        </div>
        <div width="0" height="0">
          {fillLines()}
        </div>
      </div>
    </main>
  );
};

export default IndexPage;

export const Head = () => <title>Home Page</title>;
