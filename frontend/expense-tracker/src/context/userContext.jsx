// import React, { createContext , useState } from "react";

// export const UserContext = createContext() 

// const UserProvider  =({children})=>{
//     const [user,setUser] = useState(null);


//     //function to update user data
//     const updateUser = (userData)=>{
//         setUser(userData);
//     }

//     //fucntion to clear user data(..on logout)
//     const clearUser=()=>{
//         setUser(null);
//     };

//     return(
//         <UserContext.Provider 
//           value={{
//             user,
//             updateUser,
//             clearUser,
//         }}
//         >
//             {children}
//         </UserContext.Provider>
//     )
// }

// export default UserProvider;



//////////2------------------ from chatgpt
import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user from localStorage on app start
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const updateUser = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData)); // Save to storage
    setUser(userData);
  };

  const clearUser = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
