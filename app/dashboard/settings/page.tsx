import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Image from "next/image";
import Logout from "./Components/Logout";
import { generateCustomerPortalLink } from "@/app/utils/billing";
import Link from "next/link";

export default async function Settings() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const { data: user } = await supabase
    .from("users")
    .select("subscription_type")
    .single();
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  const { data } = await supabase
    .from("users")
    .select("stripe_customer_id")
    .single();

  // console.log(data);
  const manage_link = await generateCustomerPortalLink(
    data?.stripe_customer_id
  );
  return (
    <div className="w-full h-full flex items-center justify-center ">
      <div className="border-[1px] border-white/10 p-10 flex gap-3 flex-col items-center  rounded-md">
        <Image
          src={session?.user.user_metadata.avatar_url}
          alt="logo"
          width={800}
          height={800}
          className="w-32 h-32 rounded-full"
        />
        <div className="flex py-3 flex-col items-center">
          <p className="capitalize text-xl font-semibold">
            {" "}
            {session?.user.user_metadata.full_name}
          </p>
          <p className="text-base"> {session?.user.email}</p>
          {/* <button>{user?.subscription_type}</button> */}
        </div>
        <Link
          className="border-2 border-white/10 text-center w-full py-2 rounded-lg font-semibold"
          href={manage_link!}
        >
          Manage billing
        </Link>
        <Logout />
      </div>
    </div>
  );
}
