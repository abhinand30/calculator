import { useState } from "react";
import Button from "../components/Button";
import DisplayComponent from "../components/DisplayComponent";

type CalcState = {
  expression: string[];
  history: string[];

};

function Calculator() {
  const  [calc, setCalc] = useState<CalcState>({expression: [],history: []});
  const [result,setResult]=useState(0);
  const [num,setNum]=useState<number>(0);


  const calcValues = [
    ["C", "+/-", "%", "/"],
    [7, 8, 9, "X"],
    [4, 5, 6, "-"],
    [1, 2, 3, "+"],
    [0, ".", "="],
  ];

  const handleButtonClick = (btnText: string) => {
    switch (btnText) {
      case "C":
        return handleResetValue();
      case "+/-":
        return handleChangeSign();
      case "+":
      case "-":
      case "/":
      case "X":
      case "%":
        return handleOperator(btnText);
      case "=":
        return handleEqual();
      default:
        return handleNum(btnText);
    }
  };

  
  const handleResetValue = () => {
    setCalc((prevCalc)=>({...prevCalc,
        expression:[],
    }));
  };

  
  const handleChangeSign = () => {
    const lastIndex = calc.expression.length - 1;
        const lastItem = calc.expression[lastIndex];
    setCalc((prevCalc) => {
      if (prevCalc.expression.length > 0) {
        const newItem = String(-parseFloat(lastItem));
  
        return {
          ...prevCalc,
          expression: [
            ...prevCalc.expression.slice(0, lastIndex),
            newItem,
          ],
        };
      }
      return prevCalc;
  });

  setNum(parseInt(lastItem))
  };

  const handleOperator = (btnText: string) => {
    setCalc((prevCalc) => ({
      ...prevCalc,
      expression: [...prevCalc.expression, btnText]
    }));
  };



const handleEqual = () => {
  if (calc.expression.length > 0) {
    const result = calculateExpression(calc.expression);

    setCalc((prevCalc) => ({
      ...prevCalc,
      expression: [],
      history: [...prevCalc.history, `${calc.expression.join(" ")} = ${result}`],
    }));
  }
};


 const handleNum = (btnText: string) => {
  setCalc((prevCalc) => {
    const lastItem = prevCalc.expression[prevCalc.expression.length - 1];

    if (!isNaN(Number(lastItem))) {
      return {
        ...prevCalc,
        expression: [
          ...prevCalc.expression.slice(0, prevCalc.expression.length - 1),
         String( lastItem) + String(btnText), 
        ],
      };
    } else {
      return {
        ...prevCalc,
        expression: [...prevCalc.expression, btnText],
      };
    }
  });
  setResult(String( lastItem) + String(btnText),)
};


  const calculateExpression = (exp: string[]) => {
      try {
        return eval(exp.join(" ").replace(/X/g, "*"));
      } catch {
        return "Error";
      }
    };
  console.log(result,'res');
  console.log(num,'num');
  return (
    <div>
      <div className="container">
        <DisplayComponent value={calc.expression.length>0?calc.expression.join(" "):'0'} />
        <div>
          {calcValues.map((btnRow, i) => (
            <div className="buttonBox" key={i}>
              {btnRow.map((btnText, index) => (
                <Button key={index} btnText={btnText} onClick={() => handleButtonClick(btnText)} />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="history">
        <h3>History:</h3>
        <ul>
          {calc.history.map((entry, index) => (
            <li key={index}>{entry}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Calculator;
