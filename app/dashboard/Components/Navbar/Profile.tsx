import { useUIStore } from "@/app/stores/uiStore";
import { createCheckoutLink, hasSubscription } from "@/app/utils/billing";
import { MotionDiv } from "@/app/utils/framer";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoSettingsOutline } from "react-icons/io5";

async function Profile() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const setModal = useUIStore.getState().setUserModal;
  const { data, error } = await supabase.auth.getSession();
  const hasSub = await hasSubscription();

  return (
    <MotionDiv
      initial={{ y: "10vh", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      layout
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="flex gap-6 sticky bg-slate-900 bottom-0 px-5 py-3 items-center w-full flex-col border-t-[1px] border-white/10"
    >
      {!hasSub && (
        <Link
          href={"/dashboard/upgrade"}
          className="w-full bg-[#FFC436] text-center text-black py-3 rounded-md font-medium"
        >
          Upgrade to premium
        </Link>
      )}
      <Link
        href={"/dashboard/settings"}
        className="flex items-center text-white w-full justify-between "
      >
        <div className="flex  gap-3 items-center">
          <Image
            className="w-10 rounded-full"
            src={data.session?.user.user_metadata.avatar_url}
            alt="user avatar"
            width={600}
            height={600}
          />
          <p className="text-sm font-bold capitalize">
            {data.session?.user.user_metadata.name}
          </p>
        </div>
        <IoSettingsOutline className="w-5 h-5" />
        {/* <LogoutButton /> */}
      </Link>
    </MotionDiv>
  );
}

export default Profile;
