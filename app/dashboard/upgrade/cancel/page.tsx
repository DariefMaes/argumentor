import { hasSubscription } from "@/app/utils/billing";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Success() {
  const hasSub = await hasSubscription();
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const { data: user } = await supabase.auth.getSession();

  if (!hasSub) {
    redirect("/dashboard/upgrade");
  }

  return (
    <div className="w-full">
      <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
        <h1 className="text-2xl font-light  p-4 w-fit mx-auto rounded-xl bg-gray-800">
          You canceled,{" "}
          <span className="capitalize font-bold">
            {user.session?.user.user_metadata.full_name}
          </span>
        </h1>
      </div>
    </div>
  );
}
