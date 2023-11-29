"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function Form() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [school, setSchool] = useState("");
  const [source, setSource] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      const { data: user } = await supabase.auth.getSession();
      setUser({
        name: user?.session?.user.user_metadata.full_name,
        email: user?.session?.user.email!,
      });
    };
    fetchUser();
  }, []);

  const handleSubmit = async () => {
    const { data: user } = await supabase.auth.getSession();
    const { data, error } = await supabase
      .from("users")
      .update({
        school,
        source,
      })
      .eq("id", user.session?.user.id);

    if (error) {
      console.log(error);
    }
    if (!error) {
      router.push("/dashboard");
    }
  };
  return (
    <div className="max-w-md mx-auto flex flex-col gap-4">
      <div>
        <label
          className="block text-sm text-slate-300 font-medium mb-1"
          htmlFor="email"
        >
          Name
        </label>
        <input
          id="text"
          className="form-input w-full"
          disabled
          type="text"
          value={user.name}
          required
        />
      </div>
      <div>
        <label
          className="block text-sm text-slate-300 font-medium mb-1"
          htmlFor="email"
        >
          Email
        </label>
        <input
          id="text"
          className="form-input w-full"
          disabled
          type="text"
          value={user.email}
          required
        />
      </div>
      <div>
        <label
          className="block text-sm text-slate-300 font-medium mb-1"
          htmlFor="email"
        >
          College (Optional)
        </label>
        <input
          id="text"
          placeholder="Ex. UC San Diego"
          className="form-input w-full"
          type="text"
          value={school}
          onChange={(e) => setSchool(e.target.value)}
        />
      </div>
      <div>
        <label
          className="block text-sm text-slate-300 font-medium mb-1"
          htmlFor="email"
        >
          How did you hear about us? (Optional)
        </label>
        <input
          id="text"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className="form-input w-full"
          placeholder="Ex. Instagram"
          type="text"
        />
      </div>
      <button
        onClick={handleSubmit}
        className="bg-green-500 text-white rounded-lg py-2"
      >
        Submit
      </button>
    </div>
  );
}

export default Form;
