// import React, { useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { Button } from "../ui/button";
// import { Input } from "../ui/input";
// import { Label } from "../ui/label";
// import { loginSchema } from "../../schemas/validation";
// import { USERS_LOGIN } from "@/imports/api";
// import useMutation from "@/hooks/useMutation";
// import { useDispatch } from "react-redux";
// import { setToken, setUser } from "@/redux/features/user/userSlice";

// function Login() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
// const { mutate, loading } = useMutation();
//   // Focus email input on component mount
//   useEffect(() => {
//     const emailInput = document.querySelector("[data-email-input]");
//     if (emailInput) {
//       emailInput.focus();
//     }
//   }, []);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(loginSchema),
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   });

const onSubmit = async (data) => {
  console.log("Form submitted:", data);
  const response = await mutate({ url: USERS_LOGIN, method: "POST", data });
  if (response.success) {
    console.log(response.data,'pppppppppppp');
    // Save user data and token to Redux store
    dispatch(setUser({ ...response?.data?.data }));
    dispatch(setToken({ token: response?.data?.data?.token }));
    navigate("/home");
  }
};

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8 bg-card p-8 rounded-lg border shadow-sm">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-bold text-foreground">
//             Welcome back
//           </h2>
//           <p className="mt-2 text-center text-sm text-muted-foreground">
//             Don't have an account?{" "}
//             <Link
//               to="/auth/register"
//               className="font-medium text-primary hover:text-primary/90"
//             >
//               Sign up
//             </Link>
//           </p>
//         </div>

//         <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
//           <div className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="email">Email address</Label>
//               <Input
//                 id="email"
//                 type="email"
//                 autoComplete="email"
//                 {...register("email")}
//                 className={errors.email ? "border-destructive" : ""}
//                 placeholder="you@example.com"
//                 data-email-input
//               />
//               {errors.email && (
//                 <p className="text-sm text-destructive">
//                   {errors.email.message}
//                 </p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="password">Password</Label>
//               <Input
//                 id="password"
//                 type="password"
//                 autoComplete="current-password"
//                 {...register("password")}
//                 className={errors.password ? "border-destructive" : ""}
//                 placeholder="••••••"
//               />
//               {errors.password && (
//                 <p className="text-sm text-destructive">
//                   {errors.password.message}
//                 </p>
//               )}
//             </div>
//           </div>

//           <div className="flex items-center justify-between">
//             <div className="flex items-center"></div>

//             <div className="text-sm">
//               <Link
//                 to="/auth/forgot-password"
//                 className="font-medium text-primary hover:text-primary/90"
//               >
//                 Forgot your password?
//               </Link>
//             </div>
//           </div>

//           <Button loading={loading} type="submit" className="w-full">
//             Sign in
//           </Button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Login;

import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Book, Mail, Lock } from "lucide-react";
import { useAuthUserLoginMutation } from "./AuthQuery";
import { useDispatch } from "react-redux";
import { userLogin } from "@/redux/user/userSlice";

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const [authFunc, { isLoading }] = useAuthUserLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async ({ email, password }) => {
    console.log("jkdf email,password", email, password);
    let res = await authFunc({
      body: { email, password },
      method: "POST",
      msz: true,
    });
    if (res?.data?.status_code === 200 || res?.data?.status_code === 201) {
      const { user } = res?.data?.data || {};
      console.log("qqqqqqqqqqqq", user);

      dispatch(userLogin(user));

      navigate(`${state?.pathname ? state.pathname : "/librarian"}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-library-light px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Book className="h-12 w-12 text-library-primary mx-auto mb-2" />
          <h1 className="text-3xl font-serif font-bold text-library-dark">
            TownBook
          </h1>
          <p className="text-library-dark/70 mt-2">
            Sign in to access your community library
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md border border-library-accent/30">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-library-dark mb-1"
              >
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-library-dark/50 h-5 w-5" />
                <input
                  {...register("email")}
                  id="email"
                  type="email"
                  className="w-full pl-10 pr-4 py-2 border border-library-accent/50 rounded-md focus:outline-none focus:ring-2 focus:ring-library-primary"
                  placeholder="your@email.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-library-dark mb-1"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-library-dark/50 h-5 w-5" />
                <input
                  {...register("password")}
                  id="password"
                  type="password"
                  className="w-full pl-10 pr-4 py-2 border border-library-accent/50 rounded-md focus:outline-none focus:ring-2 focus:ring-library-primary"
                  placeholder="••••••••"
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-library-primary border-library-accent rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-library-dark"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-library-primary hover:text-library-primary/80"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary flex justify-center"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>

            <div className="text-center mt-4">
              <p className="text-sm text-library-dark">
                Don't have an account?{" "}
                <Link
                  to="/auth/signup"
                  className="font-medium text-library-primary hover:text-library-primary/80"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
