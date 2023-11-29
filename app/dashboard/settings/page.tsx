import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Image from "next/image";
import Logout from "./Components/Logout";
import { generateCustomerPortalLink } from "@/app/utils/billing";
import Link from "next/link";
import { plans } from "@/app/utils/constants";
import { usage } from "@/app/utils/usage";

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

  const { subscriptionType, casesSinceLastReset, daysSinceLastReset } =
    await usage();

  const { data } = await supabase
    .from("users")
    .select("stripe_customer_id")
    .single();

  console.log(data);
  const manage_link = await generateCustomerPortalLink(
    data?.stripe_customer_id
  );

  let totalSearches;
  if (subscriptionType === "FREE") {
    totalSearches = 10;
  } else if (subscriptionType === "PRO") {
    totalSearches = 200;
  } else if (subscriptionType === "ACC") {
    totalSearches = 500;
  }

  console.log(manage_link);

  const casesSinceLastPerct = Math.round(
    (casesSinceLastReset! / totalSearches!) * 100
  ).toString();

  console.log(casesSinceLastPerct);

  const subscription_type = user?.subscription_type as "FREE" | "PRO" | "ACC";
  return (
    <div className="w-full h-full flex items-center justify-center ">
      <div className="border-[1px] border-white/10 p-10 flex gap-3 flex-col items-center  rounded-md">
        {session?.user.user_metadata.avatar_url ? (
          <Image
            className="w-32 h-32 rounded-full"
            src={session?.user.user_metadata.avatar_url}
            alt="user avatar"
            width={600}
            height={600}
          />
        ) : (
          <div className=" bg-green aspect-square w-32 h-32 text-6xl rounded-full flex items-center justify-center font-bold">
            {session?.user.user_metadata.full_name.charAt(0)}
          </div>
        )}

        <div className="flex py-3 flex-col items-center">
          <p className="capitalize text-xl font-semibold">
            {" "}
            {session?.user.user_metadata.full_name}
          </p>
          <p className="text-base"> {session?.user.email}</p>
        </div>
        <div className="flex flex-col gap-1 w-full">
          <div className="flex justify-between font-bold">
            <span>0</span>
            <span>{totalSearches?.toString()}</span>
          </div>
          <div className="w-full bg-green/20 overflow-hidden rounded-full h-1">
            <div
              style={{
                width: casesSinceLastPerct + "%",
              }}
              className={`
            
             bg-green rounded-full h-full`}
            ></div>
          </div>
          <span>Number of searches: {casesSinceLastReset}</span>
          <span>Days since last reset: {daysSinceLastReset}</span>
        </div>
        <button
          className={` ${
            subscription_type == "FREE" ? "bg-gray-500" : "bg-yellow-500"
          } font-semibold text-white py-2 w-full rounded-md`}
        >
          {plans[subscription_type] || ""}
        </button>
        {manage_link && (
          <Link
            className="border-2 border-white/10 text-center w-full py-2 rounded-lg font-semibold"
            href={manage_link!}
          >
            Manage billing
          </Link>
        )}
        <Logout />
      </div>
    </div>
  );
}
