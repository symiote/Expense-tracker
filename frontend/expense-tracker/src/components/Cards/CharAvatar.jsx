import React from "react";

// starting k 2 leetr user krke use hm pic k tor p use kernge for Dashboard
//agar user pic uplaod nhi ket ato uske starting k 2 leetr user krke use hm pic k tor p use kernge
const CharAvatar = ({ fullName, width, height, style }) => {
  return (
    <div
      className={` ${width || w - 12} ${height || h - 12} ${
        style || ""
      } flex items-center justify-center rounded-full text-gray-900 font-medium bg-gray-100 `}
    >
        {/* i am not use this 2:23:45 i use direct here  at last the function is defined*/}
      {getInitials(fullName || "")} 
     
    </div>
  );
};

export default CharAvatar;


const getInitials = (name) => {
    if (!name) return "";

    const words = name.split(" ");
    let initials ="";
    for(let i=0;i<Math.min(words.length,2);i++){
        initials+= words[i][0];  // e.g. "Ritesh Kumar" → "RK"
    }
    return initials.toUpperCase();  // e.g. "rk" → "RK"
  
  };
  