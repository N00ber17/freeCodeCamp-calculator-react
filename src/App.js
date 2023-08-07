import { useState } from "react";
function App() {
  const [disp, setDisp] = useState("0");
  const [res, setRes] = useState(0);
  const [lastBtn, setLastBtn] = useState("");

  const opRegex = /(?<![+\-*\/])-|[+*\/]/g;
  const opRegex2 = /[+*/-]/;

  function lastIndexFunc(str) {
    let match;
    let lastIndex = -1;

    while ((match = opRegex.exec(str)) !== null) {
      lastIndex = match.index;
    }
    return lastIndex;
  }

  function operate(a, b, op) {
    switch (op) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "/":
        return a / b;
      case "*":
        return a * b;
      default:
        return 0;
    }
  }

  function operation(numArr, opArray) {
    if (numArr.length == 2) {
      return operate(numArr[0], numArr[1], opArray[0]);
    } else {
      return operation(
        [operate(numArr[0], numArr[1], opArray[0])].concat(
          numArr.slice(2, numArr.length)
        ),
        opArray.slice(1, opArray.length)
      );
    }
  }

  function handleClickNum(e) {
    if (disp == "0" || lastBtn == "equals") {
      setDisp((prev) => e.target.textContent);
      setRes(0);
    } else {
      setDisp((prevDisp) => prevDisp + e.target.textContent);
    }
    setLastBtn("number");
  }

  function handleClickOp(e) {
    //do the case where last keystroke was equals
    if (res !== 0) {
      setDisp(res + e.target.textContent);
    } else if (
      opRegex2.test(disp[disp.length - 1]) &&
      opRegex2.test(disp[disp.length - 2])
    ) {
      setDisp(disp.slice(0, disp.length - 2).concat(e.target.textContent));
    } else if (
      opRegex.test(disp[disp.length - 1]) &&
      e.target.textContent !== "-"
    ) {
      setDisp(disp.slice(0, disp.length - 1).concat(e.target.textContent));
    } else if (
      opRegex.test(disp[disp.length - 1]) &&
      opRegex.test(disp[disp.length - 2]) &&
      e.target.textContent !== "-"
    ) {
      setDisp(disp.slice(0, disp.length - 2).concat(e.target.textContent));
    } else {
      setDisp((prevDisp) => prevDisp + e.target.textContent);
    }
    //setOperator(e.target.textContent)
    setLastBtn("operator");
  }

  function handleClickEq(e) {
    //setOperator('=')
    const numArr = disp.split(opRegex).map((elem) => Number(elem));
    const opArray = disp.match(opRegex);
    if (numArr.length == 1) {
    } else {
      setRes(operation(numArr, opArray));
      setDisp(operation(numArr, opArray));
    }
    setLastBtn("equals");
  }

  function handleClickDec(e) {
    if (disp.lastIndexOf(".") > lastIndexFunc(disp)) {
    } else {
      setDisp((prevDisp) => prevDisp + ".");
    }
    setLastBtn("decimal");
  }

  return (
    <>
      <div id="display" className="display">
        {disp}
      </div>
      <div className="calculator">
        <div
          id="clear"
          className="btn span2h"
          onClick={(e) => {
            setDisp("0");
            setRes(0);
            setLastBtn("");
          }}
        >
          AC
        </div>
        <div
          id="divide"
          className="btn operator"
          onClick={(e) => handleClickOp(e)}
        >
          /
        </div>
        <div
          id="multiply"
          className="btn operator"
          onClick={(e) => handleClickOp(e)}
        >
          *
        </div>
        <div
          id="seven"
          className="btn number"
          onClick={(e) => handleClickNum(e)}
        >
          7
        </div>
        <div
          id="eight"
          className="btn number"
          onClick={(e) => handleClickNum(e)}
        >
          8
        </div>
        <div
          id="nine"
          className="btn number"
          onClick={(e) => handleClickNum(e)}
        >
          9
        </div>
        <div
          id="subtract"
          className="btn operator"
          onClick={(e) => handleClickOp(e)}
        >
          -
        </div>
        <div
          id="four"
          className="btn number"
          onClick={(e) => handleClickNum(e)}
        >
          4
        </div>
        <div
          id="five"
          className="btn number"
          onClick={(e) => handleClickNum(e)}
        >
          5
        </div>
        <div id="six" className="btn number" onClick={(e) => handleClickNum(e)}>
          6
        </div>
        <div
          id="add"
          className="btn operator"
          onClick={(e) => handleClickOp(e)}
        >
          +
        </div>
        <div id="one" className="btn number" onClick={(e) => handleClickNum(e)}>
          1
        </div>
        <div id="two" className="btn number" onClick={(e) => handleClickNum(e)}>
          2
        </div>
        <div
          id="three"
          className="btn number"
          onClick={(e) => handleClickNum(e)}
        >
          3
        </div>
        <div
          id="equals"
          className="btn operator span2v"
          onClick={(e) => handleClickEq(e)}
        >
          =
        </div>
        <div
          id="zero"
          className="btn number span2h"
          onClick={(e) => handleClickNum(e)}
        >
          0
        </div>
        <div
          id="decimal"
          className="btn number"
          onClick={(e) => handleClickDec(e)}
        >
          .
        </div>
      </div>
      <div className="signature">Programmed by Ezer Naceur.</div>
    </>
  );
}
export default App;
