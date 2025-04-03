import React from "react";

interface displayprop {
  value:string;
  result:number;
}

const DisplayComponent:React.FC<displayprop>=(props)=> {
    const {value,result}=props;
   
  return (
    <div className="displayComponent">
        <h2 >{value}</h2>
        <h2 >{ result}</h2>
    </div>
  )
}

export default DisplayComponent

// const handleClick = (value: string) => {
//   if (value === "C") {
//     setInput("");
//     setResult(0);
//     setFlag(false);
//   }
//   else if (value === "=") {
//     setHistory([...history, `${input} = ${result}`]);
//     setInput(result.toString());
//     setFlag(true);
//   }
//   else if (value === "+/-") {
//     setResult(result * -1);
//     setInput((result * -1).toString());
//   }
//   else if (["X", "/", "%", "-", "+"].includes(value)) {
//     setInput(result.toString() + value);
//     setFlag(false);
//   }
//   else {
//     setInput(flag ? value : input + value);
//     setResult(calculateResult(input + value));
//     setFlag(false);
//   }
// };