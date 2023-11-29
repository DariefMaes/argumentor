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
        redirectTo: `${process.env.NEXT_PUBLIC_URL}/auth/callback`,
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
      onClick={handleLogin}
      className="btn text-slate-300 hover:text-white transition duration-150 ease-in-out w-full group [background:linear-gradient(theme(colors.slate.900),_theme(colors.slate.900))_padding-box,_conic-gradient(theme(colors.slate.400),_theme(colors.slate.700)_25%,_theme(colors.slate.700)_75%,_theme(colors.slate.400)_100%)_border-box] relative before:absolute before:inset-0 before:bg-slate-800/30 before:rounded-full before:pointer-events-none h-9"
    >
      <span className="relative">
        <span className="sr-only">Continue with Twitter</span>
        <BsDiscord />
      </span>
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
        redirectTo: `${process.env.NEXT_PUBLIC_URL}/auth/callback`,
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
      onClick={handleLogin}
      className="btn text-slate-300 hover:text-white transition duration-150 ease-in-out w-full group [background:linear-gradient(theme(colors.slate.900),_theme(colors.slate.900))_padding-box,_conic-gradient(theme(colors.slate.400),_theme(colors.slate.700)_25%,_theme(colors.slate.700)_75%,_theme(colors.slate.400)_100%)_border-box] relative before:absolute before:inset-0 before:bg-slate-800/30 before:rounded-full before:pointer-events-none h-9"
    >
      <span className="relative">
        <span className="sr-only">Continue with Twitter</span>
        <BsGoogle />
      </span>
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
