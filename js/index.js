const 정답 = "APPLE";

let attempts = 0;
let index = 0;
let timer;

function appStart() {
  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료되었습니다.";
    div.style =
      "display:flex; justify-content: center; align-items: center; position: absolute; top:40vh; left:35vw; background-color:white; width:200px; height:100px";
    document.body.appendChild(div);
  };

  const gameover = () => {
    window.removeEventListener("keydown", handlekeydown);
    displayGameover();
    clearInterval(timer);
  };

  const nextLine = () => {
    if (attempts < 5) {
      attempts++;
      index = 0;
    } else return gameover();
  };

  const handleEnterKey = () => {
    let 정답_개수 = 0;
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );
      const 입력_글자 = block.innerText;
      const keyboard = document.querySelector(
        `.keyboard-block[data-key='${입력_글자}']`
      );
      const 정답_글자 = 정답[i];
      if (입력_글자 === 정답_글자) {
        정답_개수++;
        block.style.background = "#6AAA63";
        keyboard.style.background = "#6AAA63";
      } else if (정답.includes(입력_글자)) {
        block.style.background = "#C9B458";
        keyboard.style.background = "#C9B458";
      } else {
        block.style.background = "#787C7E";
        keyboard.style.background = "#787C7E";
      }
      block.style.color = "white";
    }
    if (정답_개수 === 5) gameover();
    else nextLine();
  };

  const handleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-block[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerText = "";
    }
    if (index !== 0) index--;
  };

  const startTimer = () => {
    const 시작_시간 = new Date();
    function setTime() {
      const 현재_시간 = new Date();
      const 흐른_시간 = new Date(현재_시간 - 시작_시간);
      const 분 = 흐른_시간.getMinutes().toString().padStart(2, "0");
      const 초 = 흐른_시간.getSeconds().toString().padStart(2, "0");
      const timeDiv = document.querySelector("#timer");
      timeDiv.innerText = `${분}:${초}`;
    }
    timer = setInterval(setTime, 1000);
  };

  const handlekeydown = (e) => {
    const key = e.key.toUpperCase();
    const keyCode = e.keyCode;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );

    if (e.key === "Backspace") handleBackspace();
    else if (index === 5) {
      if (e.key === "Enter") handleEnterKey();
      else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index++;
    }
  };

  const handleClick = (e) => {
    const key = e.target.dataset.key;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );
    if (e.target.dataset.key === "Backspace") handleBackspace();
    else if (index === 5) {
      if (e.target.dataset.key === "Enter") handleEnterKey();
      else return;
    } else {
      thisBlock.innerText = key;
      index++;
    }
  };

  startTimer();
  window.addEventListener("keydown", handlekeydown);
  window.addEventListener("click", handleClick);
}

appStart();
