import { useState } from "react";
import DisplayComponent from "../components/DisplayComponent";
import Button from "../components/Button";

const calcValues = [
  ["C", "+/-", "%", "/"],
  ["7", "8", "9", "X"],
  ["4", "5", "6", "-"],
  ["1", "2", "3", "+"],
  ["0", ".", "="],
];

const Calculator = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(0);
  const [history, setHistory] = useState([]);
  const [flag,setFlag]=useState<boolean>(false);

  
  const calculateResult = (expression: string) => {
    try {
      const formattedInput = expression.replace(/X/g, "*");
      return eval((formattedInput).toString())
    } catch {
      return "Error";
    }
  };
  
  const handleClick = (value:string) => {
    if (value === "C") {
      setInput("");
      setResult(0);
      setFlag(false)
    } else if (value === "=") {
      setHistory([...history, `${input} = ${result}`]);
      setInput(result.toString());
      setFlag(true)
    }
      else if(value==="+/-"){
        setResult(result*-1)
        setInput((result*-1).toString())
      }
      else if (["X", "/", "%", "-", "+"].includes(value)) {
        const newInput = input + value;
       setInput(newInput);
       setFlag(false)
      }
     else{
      const newInput = input + value;
      setInput(flag ? value : newInput);
      setResult(flag?value:calculateResult(newInput));
      setFlag(false);
    }
   
  };

  return (
    <div>
  
      <div className="container">
        <DisplayComponent value={input}  result={ result}/>
      <div>
      {calcValues.map((btnRow, i) => (
            <div className="buttonBox" key={i}>
              {btnRow.map((btnText, index) => (
                <Button key={index} btnText={btnText} onClick={() => handleClick(btnText)} />
              ))}
            </div>
          ))}
      </div>
      </div>
      <h3>History</h3>
      <ul style={{ textAlign: "left" }}>
        {history.map((entry, index) => (
          <li key={index}>{entry}</li>
        ))}
      </ul>
    
    </div>
  );
};

export default Calculator;