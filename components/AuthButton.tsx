"use client";
import url from "@/app/utils/url";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { BsDiscord, BsFacebook, BsGoogle } from "react-icons/bs";
import { MdOutlineLogout } from "react-icons/md";

export function LoginDiscordButton() {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleLogin = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session) {
      router.push("/dashboard");
    }
    await supabase.auth.signInWithOAuth({
      provider: "discord",
      options: {
        redirectTo: `${url}/auth/callback`,
      },
    });
    router.refresh();
  };

  // useEffect(() => {
  //   supabase.auth.getSession().then(({ data: session }) => {
  //     if (session.session) {
  //       console.log(session);
  //       router.push("/dashboard");
  //     }
  //   });
  // }, []);
  return (
    <button
      className="flex items-center gap-3 p-3 shadow-md rounded-md bg-[#0C2650] text-white"
      onClick={handleLogin}
    >
      <BsDiscord /> Login with Facebook
    </button>
  );
}

export function LoginButton() {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleLogin = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session) {
      router.push("/dashboard");
    }
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${url}/auth/callback`,
      },
    });
    router.refresh();
  };

  // useEffect(() => {
  //   supabase.auth.getSession().then(({ data: session }) => {
  //     if (session.session) {
  //       console.log(session);
  //       router.push("/dashboard");
  //     }
  //   });
  // }, []);
  return (
    <button
      className="flex items-center gap-3 p-3 shadow-md rounded-md bg-[#0C2650] text-white"
      onClick={handleLogin}
    >
      <BsGoogle /> Login using UCSD Email
    </button>
  );
}

export function LogoutButton() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };
  return (
    <button onClick={handleSignOut}>
      <MdOutlineLogout className="text-red-500 w-5 h-5" />
    </button>
  );
}
