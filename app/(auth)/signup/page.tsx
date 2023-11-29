"use client";

import Link from "next/link";
import AuthLogo from "../auth-logo";
import { LoginButton, LoginDiscordButton } from "@/components/AuthButton";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import toast, { Toaster } from "react-hot-toast";

const notifyError = () => toast.success("Email has been sent!", {});

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSignUp = async () => {
    await supabase.auth.signUp({
      email,
      password,

      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
        data: {
          full_name: name,
        },
      },
    });
    console.log("sign up");
    notifyError();
    router.refresh();
  };
  return (
    <>
      <Toaster />
      {/* Page header */}
      <div className="max-w-3xl mx-auto text-center pb-12">
        {/* Logo */}
        <AuthLogo />
        {/* Page title */}
        <h1 className="h2 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60">
          Create your free account
        </h1>
      </div>
      {/* Form */}
      <div className="max-w-sm mx-auto">
        <form onSubmit={handleSignUp}>
          <div className="space-y-4">
            <div>
              <label
                className="block text-sm text-slate-300 font-medium mb-1"
                htmlFor="email"
              >
                Name <span className="text-rose-500">*</span>
              </label>
              <input
                id="name"
                className="form-input w-full"
                type="text"
                placeholder="Mark Rossi"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label
                className="block text-sm text-slate-300 font-medium mb-1"
                htmlFor="email"
              >
                Email <span className="text-rose-500">*</span>
              </label>
              <input
                id="email"
                className="form-input w-full"
                type="email"
                placeholder="markrossi@company.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label
                className="block text-sm text-slate-300 font-medium mb-1"
                htmlFor="password"
              >
                Password <span className="text-rose-500">*</span>
              </label>
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
              type="submit"
              className="btn text-sm text-white bg-green-500 hover:bg-green-600 w-full shadow-sm group"
            >
              Sign Up{" "}
              <span className="tracking-normal text-green-300 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">
                -&gt;
              </span>
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          <div className="text-sm text-slate-400">
            Already have an account?{" "}
            <Link
              className="font-medium text-green-500 hover:text-green-400 transition duration-150 ease-in-out"
              href="/signin"
            >
              Sign in
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
