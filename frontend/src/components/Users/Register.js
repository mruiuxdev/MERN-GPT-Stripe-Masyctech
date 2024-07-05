import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { registerAPI } from "../../apis/users/usersApi";
import { Alert } from "../Alert/Alert";
import { useAuth } from "../../AuthContext/AuthContext";

const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const Register = () => {
  const { isAuthenticated } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated]);

  const mutation = useMutation({ mutationFn: registerAPI });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      mutation.mutate(values);
    },
  });

  useEffect(() => {
    if (mutation.isSuccess) {
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
  }, [mutation.isSuccess, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-[#FFE9D1] dark:bg-[#14181c] shadow-lg rounded-md max-w-[500px] p-8 w-full">
        <h1 className="text-center text-xl font-semibold">Create an account</h1>
        <h3 className="mt-2 text-center text-sm text-base-content/70">
          Create an account to get free access for 3 days. No credit card
          required
        </h3>
        {mutation.isSuccess && (
          <Alert
            type="alert-success"
            message="Your registration successfully!"
          />
        )}
        {mutation.isError && (
          <Alert
            type="alert-error"
            message={mutation.error?.response?.data?.message}
          />
        )}
        <form onSubmit={formik.handleSubmit}>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Username</span>
            </div>
            <input
              type="text"
              id="username"
              {...formik.getFieldProps("username")}
              placeholder="Type here"
              className="input input-bordered w-full"
            />
            <div className="label justify-end">
              <span className="label-text-alt text-red-500">
                {formik.touched.username && formik.errors.username}
              </span>
            </div>
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Email Address</span>
            </div>
            <input
              type="email"
              id="email"
              {...formik.getFieldProps("email")}
              placeholder="Type here"
              className="input input-bordered w-full"
            />
            <div className="label justify-end">
              <span className="label-text-alt text-red-500">
                {formik.touched.email && formik.errors.email}
              </span>
            </div>
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Password</span>
            </div>
            <input
              type="password"
              id="password"
              {...formik.getFieldProps("password")}
              placeholder="Type here"
              className="input input-bordered w-full"
            />
            <div className="label justify-end">
              <span className="label-text-alt text-red-500">
                {formik.touched.password && formik.errors.password}
              </span>
            </div>
          </label>
          <button
            type="submit"
            disabled={mutation.isPending}
            className="btn text-base gap-2 btn-primary btn-block mt-5"
          >
            {mutation.isPending ? (
              <span className="loading loading-ring loading-lg"></span>
            ) : (
              "Register"
            )}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-base-content/80">
          Already have an account{" "}
          <Link className="text-primary  hover:underline" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};
