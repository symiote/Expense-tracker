import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";
import AuthLayout from "../../components/layouts/authLayout";
import Input from "../../components/Inputs/Input";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);

  const navigate = useNavigate();

  //handle login form submit
  const handleLogin = async (e) => {
    e.preventDefault();

    if(email==="" || password===""){
      setError("All fields are required ");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please Enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");

    //login api call
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        //-> /api/v1/auth/login
        email,
        password,
      });

      // If the login is successful, the backend should send back a response containing a token and user data.
      // We are extracting these properties from the response data using destructuring.
      const { token, user } = response.data;

      if (token) {
        // If a token exists, we store it in the browser's localStorage.
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
      console.log("Login Success:", response.data);
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something Went Wrong.please try agian.");
      }
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
        <p className="text-sm text-slate-700 mt-[5px] mb-6">
          Please enter your details to log in
        </p>

        <form onSubmit={handleLogin}>
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="jhon@example.com"
            type="text"
          />
          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Min 8 Characters"
            type="password"
          />
          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
          
          {/* //new */}
          <p className="text-sm mt-2">
            <Link to="/forgot-password" className="text-violet-600 underline">
              Forgot Password?
            </Link>
          </p>

          <button type="submit" className="btn-primary">
            Login
          </button>
          <p className="text-[13px] text-slate-800 mt-3">
            Don't have and Account?{" "}
            <Link
              className="font-medium text-sm text-violet-600 underline"
              to="/signup"
            >
              {" "}
              SignUp
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
