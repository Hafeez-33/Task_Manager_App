import React, { useContext, useState } from "react";
import AuthLayout from "../../components/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/inputs/Input";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPath";
import { UserContext } from "../../context/userContext";
import { motion } from "framer-motion";

/* Animations */
const container = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.12,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const errorAnim = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0 },
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter your password");
      return;
    }

    setError(null);

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token, role } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);

        role === "admin"
          ? navigate("/admin/dashboard")
          : navigate("/user/dashboard");
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Something went wrong. Please try again later."
      );
    }
  };

  return (
    <AuthLayout>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center"
      >
        <motion.h3
          variants={item}
          className="text-xl font-semibold text-black"
        >
          Welcome Back
        </motion.h3>

        <motion.p
          variants={item}
          className="text-sm text-slate-700 mt-[5px] mb-6"
        >
          Please enter your details to login
        </motion.p>

        <motion.form variants={item} onSubmit={handleLogin}>
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="john@email.com"
            type="email"
          />

          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Min 8 characters"
            type="password"
          />

          {error && (
            <motion.p
              variants={errorAnim}
              initial="hidden"
              animate="show"
              className="text-red-500 text-sm pb-2.5 my-2"
            >
              {error}
            </motion.p>
          )}

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300 }}
            type="submit"
            className="btn-primary"
          >
            LOGIN
          </motion.button>

          <motion.p
            variants={item}
            className="text-[13px] text-slate-800 mt-3"
          >
            Don&apos;t have an account?{" "}
            <Link className="font-medium text-primary underline" to="/signup">
              Sign Up
            </Link>
          </motion.p>
        </motion.form>
      </motion.div>
    </AuthLayout>
  );
};

export default Login;



// import React, { useContext, useState } from 'react'
// import AuthLayout from '../../components/AuthLayout'
// import { Link, useNavigate } from 'react-router-dom'
// import Input from '../../components/inputs/Input';
// import { validateEmail } from '../../utils/helper';
// import axiosInstance from '../../utils/axiosinstance';
// import { API_PATHS } from '../../utils/apiPath';
// import { UserContext } from '../../context/userContext';

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);

//   const {updateUser} = useContext(UserContext)

//   const navigate = useNavigate();

//   //handle login form submit
//   const handleLogin = async (e) => {
//     e.preventDefault();

//     if(!validateEmail(email)){
//       setError("Please enter a valid email address");
//       return;
//     }

//     if(!password){
//       setError("Please enter your password");
//       return;
//     }
//     //reset error
//     setError(null)

//     //Login API Call
//     try {
//       const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN,{
//         email,
//         password,
//       });

//       const {token,role} = response.data;

//       if(token){
//         localStorage.setItem("token", token);
//         updateUser(response.data);

//         //redirect based on role
//         if(role === "admin"){
//           navigate("/admin/dashboard");
//         } else {
//           navigate("/user/dashboard");
//         }
//       }
//     } catch (error) {
//       if(error.response && error.response.data.message){
//         setError(error.response.data.message);
//       }else{
//         setError("Something went wrong. Please try again later.");
//       }
//     }
//   };
  
//   return (
//     <AuthLayout>
//       <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center'>
//         <h3 className='text-xl font-semibold text-black'>Welcome Back</h3>
//         <p className='text-sm text-slate-700 mt-[5px] mb-6'>
//           Please Enter your details to Login
//         </p>

//         <form onSubmit={handleLogin}>
//           <Input
//             value={email}
//               onChange={({target}) => setEmail(target.value)}
//               label="Email Address"
//               placeholder="john@email.com"
//               type="email"
//           />

//           <Input
//             value={password}
//               onChange={({target}) => setPassword(target.value)}
//               label="Password"
//               placeholder="Min 8 characters"
//               type="password"
//           />

//           {error && <p className='text-red-500 text-sm pb-2.5 my-2'>{error}</p>}

//           <button type='submit' className='btn-primary'>
//             LOGIN
//           </button>

//           <p className='text-[13px] text-slate-800 mt-3'>
//             Don't have an account?{" "}
//             <Link className='font-medium text-primary underline' to="/signup">
//             SignUp
//             </Link>
//           </p>

//         </form>
//       </div>
//     </AuthLayout>
//   )
// }

// export default Login