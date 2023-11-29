import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function usage() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const { data: user } = await supabase
    .from("users")
    .select("subscription_type, last_reset_day")
    .single();
  const { data: cases } = await supabase
    .from("cases")
    .select("created_at")
    .gt("created_at", user?.last_reset_day);

  const today = new Date();
  const lastReset = new Date(user?.last_reset_day);
  const daysSinceLastReset = Math.floor(
    (today.getTime() - lastReset.getTime()) / (1000 * 3600 * 24)
  );
  const casesSinceLastReset = cases?.length;

  return {
    casesSinceLastReset,
    daysSinceLastReset,
    subscriptionType: user?.subscription_type,
  };
}
