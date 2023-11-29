import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Navbar from "./Components/Navbar/Navbar";
import Profile from "./Components/Navbar/Profile";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const { data, error } = await supabase.auth.getSession();
  const { data: user } = await supabase
    .from("users")
    .select("stripe_customer_id")
    .eq("id", data?.session?.user.id)
    .single();

  if (!data.session) {
    return redirect("/");
  }
  console.log(user?.stripe_customer_id);

  if (!user || !user?.stripe_customer_id) {
    return redirect("/onboarding");
  }
  return (
    <div className="flex flex-row w-full md:flex-row h-screen items-center">
      <Navbar>
        <Profile />
      </Navbar>
      {children}
    </div>
  );
}
