import React, { useContext, useState } from "react";
import AuthLayout from "../../components/AuthLayout";
import ProfilePhotoSelector from "../../components/inputs/ProfilePhotoSelector";
import Input from "../../components/inputs/Input";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPath";
import { UserContext } from "../../context/userContext";
import uploadimage from "../../utils/uploadimage";
import { validateEmail } from "../../utils/helper";
import { motion } from "framer-motion";

/* ================= Animations ================= */
const container = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
      staggerChildren: 0.12,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const photoAnim = {
  hidden: { scale: 0.85, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 200 },
  },
};

const errorAnim = {
  hidden: { opacity: 0, x: -10 },
  show: {
    opacity: 1,
    x: [0, -6, 6, -4, 4, 0],
    transition: { duration: 0.4 },
  },
};
/* ================================================= */

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminInviteToken, setAdminInviteToken] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";

    if (!fullName) return setError("Please enter full name");
    if (!validateEmail(email)) return setError("Please enter a valid email");
    if (!password) return setError("Please enter your password");

    setError("");

    try {
      if (profilePic) {
        const imgUploadRes = await uploadimage(profilePic);
        profileImageUrl = imgUploadRes.data.url || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
        profileImageUrl,
        adminInviteToken,
      });

      const { token, role } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
        role === "admin"
          ? navigate("/admin/dashboard")
          : navigate("/user/dashboard");
      }

      // const { token, user } = response.data;

      // if (token) {
      //   localStorage.setItem("token", token); // save token ONCE
      //   updateUser(user); // pass only user

      //   user.role === "admin"
      //     ? navigate("/admin/dashboard")
      //     : navigate("/user/dashboard");
      // }

      // const { token, user } = response.data;
      // if (token && user) {
      //   localStorage.setItem("token", token);
      //   // Update context with correct structure
      //   updateUser({
      //     user,
      //     token,
      //   });

      //   user.role === "admin"
      //     ? navigate("/admin/dashboard")
      //     : navigate("/user/dashboard");
      // }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Something went wrong. Please try again later.",
      );
    }
  };

  return (
    <AuthLayout>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="lg:w-[100%] h-auto md:h-full mt-10 md:m-0 flex flex-col justify-center"
      >
        <motion.h3 variants={item} className="text-xl font-semibold text-black">
          Create an Account
        </motion.h3>

        <motion.p
          variants={item}
          className="text-xs text-slate-700 mt-[5px] mb-6"
        >
          Join us today by entering your details below.
        </motion.p>

        <motion.form variants={container} onSubmit={handleSignUp}>
          {/* Profile Photo */}
          <motion.div variants={photoAnim}>
            <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
          </motion.div>

          {/* Inputs */}
          <motion.div
            variants={container}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <motion.div variants={item}>
              <Input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                label="Full Name"
                placeholder="John Doe"
                type="text"
              />
            </motion.div>

            <motion.div variants={item}>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label="Email Address"
                placeholder="john@email.com"
                type="email"
              />
            </motion.div>

            <motion.div variants={item}>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
                placeholder="Min 8 characters"
                type="password"
              />
            </motion.div>

            <motion.div variants={item}>
              <Input
                value={adminInviteToken}
                onChange={(e) => setAdminInviteToken(e.target.value)}
                label="Admin Invite Token"
                placeholder="6 Digit Code"
                type="text"
              />
            </motion.div>
          </motion.div>

          {/* Error */}
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

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 280 }}
            type="submit"
            className="btn-primary"
          >
            SIGN UP
          </motion.button>

          <motion.p variants={item} className="text-[13px] text-slate-800 mt-3">
            Already have an account?{" "}
            <Link className="font-medium text-primary underline" to="/login">
              Login
            </Link>
          </motion.p>
        </motion.form>
      </motion.div>
    </AuthLayout>
  );
};

export default SignUp;

// import React, { useContext, useState } from "react";
// import AuthLayout from "../../components/AuthLayout";
// import ProfilePhotoSelector from "../../components/inputs/ProfilePhotoSelector";
// import Input from "../../components/inputs/Input";
// import { Link, useNavigate } from "react-router-dom";
// import axiosInstance from "../../utils/axiosinstance";
// import { API_PATHS } from "../../utils/apiPath";
// import { UserContext } from "../../context/userContext";
// import uploadimage from "../../utils/uploadimage";
// import { validateEmail } from "../../utils/helper";

// const SignUp = () => {
//   const [profilePic, setProfilePic] = useState(null);
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [adminInviteToken, setAdminInviteToken] = useState("");

//   const [error, setError] = useState(null);

//   const {updateUser} = useContext(UserContext)
//   const navigate = useNavigate();

//   //handle signup form submit
//   const handleSignUp = async (e) => {
//     e.preventDefault();

//     let profileImageUrl = '';

//     if (!fullName) {
//       setError("Please enter full name");
//       return;
//     }

//     if (!validateEmail(email)) {
//       setError("Please enter a valid email address");
//       return;
//     }

//     if (!password) {
//       setError("Please enter your password");
//       return;
//     }
//     //reset error
//     setError("");

//     //signup API Call
//     try {
//       //upload profile picture if selected
//       if(profilePic){
//         const imgUploadRes = await uploadimage(profilePic);
//         profileImageUrl = imgUploadRes.data.url || "";
//       }

//       const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
//         name: fullName,
//         email,
//         password,
//         profileImageUrl,
//         adminInviteToken
//       });

//       const {token, role} = response.data;

//       if (token) {
//         localStorage.setItem("token", token);
//         updateUser(response.data);

//         //redirect based on role
//         if (role === "admin") {
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
//       <div className="lg:w-[100%] h-auto md:h-full mt-10 md:m-0 flex flex-col justify-center">
//         <h3 className="text-xl font-semibold text-black">Create an Account</h3>
//         <p className="text-xs text-slate-700 mt-[5px] mb-6">
//           Join us today by entering your details below.
//         </p>

//         <form onSubmit={handleSignUp}>
//           <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <Input
//               value={fullName}
//               onChange={({ target }) => {
//                 setFullName(target.value);
//               }}
//               label="Full Name"
//               placeholder="John"
//               type="text"
//             />

//             <Input
//               value={email}
//               onChange={({ target }) => setEmail(target.value)}
//               label="Email Address"
//               placeholder="john@email.com"
//               type="email"
//             />

//             <Input
//               value={password}
//               onChange={({ target }) => setPassword(target.value)}
//               label="Password"
//               placeholder="Min 8 characters"
//               type="password"
//             />

//             <Input
//               value={adminInviteToken}
//               onChange={({ target }) => setAdminInviteToken(target.value)}
//               label="Admin Invite Token"
//               placeholder="6 Diigt Code"
//               type="text"
//             /></div>

//             {error && (
//               <p className="text-red-500 text-sm pb-2.5 my-2">{error}</p>
//             )}

//             <button type="submit" className="btn-primary">
//               SIGN UP
//             </button>

//             <p className="text-{13px} text-slate-800 mt-3">
//               Already have an account?{" "}
//               <Link className="font-medium text-primary underline" to="/login">
//                 Login
//               </Link>
//             </p>

//         </form>
//       </div>
//     </AuthLayout>
//   );
// };

// export default SignUp;
