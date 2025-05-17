import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";

export default function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("")
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const navigate =useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("resr password in..");
    

    try {
      if(password !== confirmPassword){
          setError("both password need to be same");
          return;
      } 
      console.log("password is : ", password);
      
      const res = await axiosInstance.post(`/api/v1/auth/reset-password/${token}`, { password });
      setMsg(res.data.message);
      setError("");
      
      //naviagte to login page after 2 sec
       setTimeout(()=>{
          navigate("/login");
        },2000)
      

    } catch (err) {
      setError(err.response?.data?.message || "Reset failed");
    }
  };

  return (
  <>
   <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-12 p-8 bg-white rounded-xl shadow-lg space-y-4">
    
    <h2 className="text-2xl font-semibold text-center text-gray-800">
        Reset Password
      </h2>

    <input
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    type="password"
    placeholder="New Password"
    required
    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  <input
    value={confirmPassword}
    onChange={(e) => setConfirmPassword(e.target.value)}
    type="password"
    placeholder="Confirm Password"
    required
    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  <button
    type="submit"
    className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-violet-700 duration-200"
  >
    Reset Password
  </button>
  {msg && <p className="text-green-600 text-center">{msg}</p>}
  {error && <p className="text-red-600 text-center">{error}</p>}
</form>
</>

  );
}
