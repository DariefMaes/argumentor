"use client";
import Link from "next/link";
import AuthLogo from "../auth-logo";
import { LoginButton, LoginDiscordButton } from "@/components/AuthButton";
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";

const notifyError = () => toast.error("Wrong credentials!");
const notifySuccess = () => toast.success("Successfully logged in!");

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (e: any) => {
    e.preventDefault();

    const supabase = await createClientComponentClient();
    console.log(email, password);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return notifyError();
    }

    notifySuccess();
    router.push("/dashboard");
  };
  return (
    <>
      <ToastContainer />
      {/* Page header */}
      <div className="max-w-3xl mx-auto text-center pb-12">
        {/* Logo */}
        <AuthLogo />
        {/* Page title */}
        <h1 className="h2 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60">
          Sign in to your account
        </h1>
        <p className="text-lg text-slate-400 py-5">
          Sign into your account to start your journey with Argumentor.
        </p>
      </div>

      {/* Form */}
      <div className="max-w-sm mx-auto">
        <form onSubmit={handleSignIn}>
          <div className="space-y-4">
            <div>
              <label
                className="block text-sm text-slate-300 font-medium mb-1"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input w-full"
                type="email"
                required
              />
            </div>
            <div>
              <div className="flex justify-between">
                <label
                  className="block text-sm text-slate-300 font-medium mb-1"
                  htmlFor="password"
                >
                  Password
                </label>
                <Link
                  className="text-sm font-medium text-green-500 hover:text-green-400 transition duration-150 ease-in-out ml-2"
                  href="/reset-password"
                >
                  Forgot?
                </Link>
              </div>
              <input
                id="password"
                className="form-input w-full"
                type="password"
                autoComplete="on"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mt-6">
            <button
              onClick={handleSignIn}
              className="btn text-sm text-white bg-green-500 hover:bg-green-600 w-full shadow-sm group"
            >
              Sign In{" "}
              <span className="tracking-normal text-green-300 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">
                -&gt;
              </span>
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          <div className="text-sm text-slate-400">
            Don't have an account?{" "}
            <Link
              className="font-medium text-green-500 hover:text-green-400 transition duration-150 ease-in-out"
              href="/signup"
            >
              Sign up
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div
            className="border-t border-slate-800 grow mr-3"
            aria-hidden="true"
          />
          <div className="text-sm text-slate-500 italic">or</div>
          <div
            className="border-t border-slate-800 grow ml-3"
            aria-hidden="true"
          />
        </div>

        {/* Social login */}
        <div className="flex space-x-3">
          <LoginButton />
          <LoginDiscordButton />
        </div>
      </div>
    </>
  );
}
