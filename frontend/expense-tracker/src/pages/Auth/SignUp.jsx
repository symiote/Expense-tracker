import React, { useContext, useState } from "react";
import AuthLayout from "../../components/layouts/authLayout";
import { Link, useNavigate } from "react-router-dom";
// import Input from "../../components/Inputs/input";
import Input from "../../components/inputs/input";
import { validateEmail } from "../../utils/helper";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import uploadImage from "../../utils/uploadImage";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";
import axiosInstance from "../../utils/axiosInstance";

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  //handle sign up form submit
  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";

    if (!fullName) {
      setError("Please enter your name");
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

    //sigup api call
    try {
      //upload image if present
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        //-> /api/v1/auth/regisetr
        fullName,
        email,
        password,
        profileImageUrl,
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
      console.log("signup Success:", response.data);
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
      <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Create an Account</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Join us today by entering your details below.
        </p>

        <form onSubmit={handleSignUp}>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="fullname"
              placeholder="jhon head"
              type="text"
            />
            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="jhon@example.com"
              type="text"
            />
            <div className="col-span-2">
              <Input
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                type="password"
                placeholder="Min 8 Characters"
                label="Password"
              />
            </div>
          </div>
          {error && <p className="text-red-600 text-[14px]">{error}</p>}

          <button type="submit" className="btn-primary">
            Sign up
          </button>

          <p className="mt-5">
            Already have an account?{" "}
            <Link className="font-medium text-violet-600 underline" to="/login">
              {" "}
              login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
