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

  if (!data.session) {
    return redirect("/");
  }
  return (
    <div className="flex h-screen items-center">
      <Navbar>
        <Profile />
      </Navbar>
      {children}
    </div>
  );
}
