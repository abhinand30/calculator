import React from "react";

interface buttonProps{
    btnText:any;
    onClick:()=>void;
}

const Button:React.FC<buttonProps>=(props)=> {
    const {btnText,onClick}=props;
  return (
   <div>
    <button className="buttons" onClick={onClick}>{btnText}</button>
   </div>
  )
}

export default Button