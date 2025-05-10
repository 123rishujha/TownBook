import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { Book, User, Mail, Lock } from "lucide-react";
import { useAuthUserSignupMutation } from "./AuthQuery";

const signupSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
  role: yup
    .string()
    .oneOf(["member", "librarian"], "Invalid role selected")
    .required("Role selection is required"),
});

const Signup = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("member");

  const [API, { isLoading }] = useAuthUserSignupMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "member",
    },
  });

  const onSubmit = async (data) => {
    const { name, email, password, role } = data;
    const res = await API({ body: { name: name, email, password, role } });
    if (res?.data?.status_code === 200) {
      navigate("/auth/login");
    }
  };

  // Handle role change
  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-library-light px-4 py-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Book className="h-12 w-12 text-library-primary mx-auto mb-2" />
          <h1 className="text-3xl font-serif font-bold text-library-dark">
            TownBook
          </h1>
          <p className="text-library-dark/70 mt-2">
            Join your community library network
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md border border-library-accent/30">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Role dropdown first */}
            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-library-dark mb-1"
              >
                Role
              </label>
              <select
                {...register("role")}
                id="role"
                className="w-full px-4 py-2 border border-library-accent/50 rounded-md focus:outline-none focus:ring-2 focus:ring-library-primary bg-white"
                onChange={handleRoleChange}
              >
                <option value="member">Member</option>
                <option value="librarian">Librarian</option>
              </select>
              {errors.role && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.role.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-library-dark mb-1"
              >
                {selectedRole === "librarian" ? "Library Name" : "Full Name"}
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-library-dark/50 h-5 w-5" />
                <input
                  {...register("name")}
                  id="name"
                  type="text"
                  className="w-full pl-10 pr-4 py-2 border border-library-accent/50 rounded-md focus:outline-none focus:ring-2 focus:ring-library-primary"
                  placeholder={
                    selectedRole === "librarian"
                      ? "City Central Library"
                      : "John Doe"
                  }
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-library-dark mb-1"
              >
                {selectedRole === "librarian" ? "Library Email" : "Email"}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-library-dark/50 h-5 w-5" />
                <input
                  {...register("email")}
                  id="email"
                  type="email"
                  className="w-full pl-10 pr-4 py-2 border border-library-accent/50 rounded-md focus:outline-none focus:ring-2 focus:ring-library-primary"
                  placeholder={
                    selectedRole === "librarian"
                      ? "library@city.gov"
                      : "your@email.com"
                  }
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

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-library-dark mb-1"
              >
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-library-dark/50 h-5 w-5" />
                <input
                  {...register("confirmPassword")}
                  id="confirmPassword"
                  type="password"
                  className="w-full pl-10 pr-4 py-2 border border-library-accent/50 rounded-md focus:outline-none focus:ring-2 focus:ring-library-primary"
                  placeholder="••••••••"
                />
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary flex justify-center mt-6"
            >
              {isLoading ? "Creating account..." : "Create account"}
            </button>

            <div className="text-center mt-4">
              <p className="text-sm text-library-dark">
                Already have an account?{" "}
                <Link
                  to="/auth/login"
                  className="font-medium text-library-primary hover:text-library-primary/80"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
