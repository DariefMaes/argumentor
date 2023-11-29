import { hasSubscription, stripe } from "@/app/utils/billing";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Success({
  params,
}: {
  params: { slug: string };
}) {
  console.log(params.slug);
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const { data: user } = await supabase.auth.getSession();

  let session;
  try {
    session = await stripe.checkout.sessions.retrieve(params.slug);
  } catch (error) {
    console.log(error);
    return redirect("/dashboard/upgrade");
  }

  return (
    <div className="w-full">
      <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
        <h1 className="text-2xl font-light  p-4 w-fit mx-auto rounded-xl bg-gray-800">
          Sorry to hear that you canceled,{" "}
          <span className="capitalize font-bold">
            {user.session?.user.user_metadata.full_name}
          </span>
          {session.customer_email}
          <br />
          Your order is being processed
        </h1>
      </div>
    </div>
  );
}
