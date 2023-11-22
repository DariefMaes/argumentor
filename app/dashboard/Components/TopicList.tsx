"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import React, { useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { useUIStore } from "../../stores/uiStore";
import { useRouter } from "next/navigation";

function TopicList() {
  const router = useRouter();
  const [id, setId, stateCases, remove, setCases, addCase] = useUIStore(
    (state) => [
      state.id,
      state.setId,
      state.cases,
      state.removeCase,
      state.setCases,
      state.addCase,
    ]
  );

  const supabase = createClientComponentClient();

  useEffect(() => {
    console.log(id);
  }, [id]);

  const fetchCases = async () => {
    try {
      const { data, error } = await supabase
        .from("cases")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setCases(data);
    } catch (error) {
      console.error("Error fetching cases:", error);
    }
  };

  useEffect(() => {
    fetchCases();
  }, []);

  const subscription = supabase
    .channel(`cases`)
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
      },
      (payload: any) => {
        router.push(`/dashboard/${payload.new.id}`);
        addCase({
          id: payload.new.id,
          topic: payload.new.topic,
        });
      }
    )
    .subscribe();
  const removeCase = async (id: number) => {
    const { data, error } = await supabase
      .from("cases")
      .delete()
      .match({ id: id });

    remove(id.toString());
    router.refresh();
    router.replace("/dashboard");
  };

  return (
    <div className="w-full gap-3 max-w-full flex flex-col">
      {stateCases &&
        stateCases.map((c: any) => (
          <Link
            href={`/dashboard/${c.id}`}
            onClick={() => {
              if (c.id.toString() !== id) {
                setId(c.id);
              }
            }}
            // key={c.topic + Math.random()}
            key={c.id}
            className={`font-medium grid grid-cols-12 justify-between items-center w-full gap-5 p-3 border-l-4 transition-all duration-200 bg-slate-900  border-[1px] rounded-md ${
              c.id.toString() === id ? "border-green" : "border-white/10"
            }`}
          >
            <p className="line-clamp-2 col-span-10">{c.topic}</p>
            {id === c.id.toString() ? (
              <RxCross2
                onClick={() => removeCase(c.id)}
                className="w-5 h-5 col-start-11 col-span-1"
              />
            ) : null}
          </Link>
        ))}
      {!stateCases && <p className="text-center">No cases yet</p>}
    </div>
  );
}

export default TopicList;
