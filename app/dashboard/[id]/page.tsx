import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import Arguments from "./Components/Arguments";
import { redirect } from "next/navigation";

// import InitialArguments from "./Components/InitialArguments";

export default async function Page({ params }: { params: { id: string } }) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const { data } = await supabase
    .from("cases")
    .select("topic")
    .eq("id", params.id)
    .single();

  if (!data) {
    return redirect("/dashboard");
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();

  let { data: messages } = await supabase
    .from("chat_sessions")
    .select("message, isUser")
    .eq("session_id", params.id);

  return (
    <>
      <div className="flex md:flex-row h-screen items-center">
        {/* <Navbar id={params.id} /> */}

        <div className="overflow-x-hidden flex flex-col w-full h-full">
          <div className="flex border-b-[1px]  p-5 items-center border-white/10">
            <form className="w-full sticky top-0 bg-slate-900 h-fit flex ">
              <input
                type="text"
                value={data?.topic}
                disabled
                placeholder="Search for a topic"
                className=" w-full border-none focus:border-none   bg-transparent outline-none"
              />
            </form>
          </div>

          {/* {data?.body && (
            <div
              className="px-5 py-8 gap-2 h-full flex flex-col"
              dangerouslySetInnerHTML={{ __html: data?.body }}
            />
          )} */}

          <Arguments
            avatar={session?.user.user_metadata.avatar_url}
            messages={messages}
            id={params.id}
            params={params}
          />
        </div>
      </div>
    </>
  );
}
