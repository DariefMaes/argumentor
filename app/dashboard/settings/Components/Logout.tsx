"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import React from "react";

function Logout() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };
  return (
    <button
      onClick={handleSignOut}
      className="bg-red-600 w-full py-2 rounded-lg font-semibold"
    >
      Log out
    </button>
  );
}

export default Logout;
