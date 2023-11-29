import Image from "next/image";
import Navbar from "./Components/Navbar/Navbar";
import Arguments from "./Components/Arguments";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import Link from "next/link";
import Stripe from "stripe";
import {
  createCustomerIfNull,
  generateCustomerPortalLink,
  hasSubscription,
} from "../utils/billing";

export default async function Dashboard() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const { data, error } = await supabase.auth.getSession();
  if (!data.session) {
    return redirect("/");
  }

  // console.log(data.session.user.id);
  return (
    <>
      <Arguments />
    </>
  );
}
