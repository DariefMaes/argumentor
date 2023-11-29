import { createCheckoutLink, hasSubscription } from "@/app/utils/billing";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Feature = ({ text }: { text: string }) => {
  return (
    <div className="px-6 py-1 flex flex-col justify-end">
      <div className="flex items-center h-full border-b border-slate-800 py-2 text-white">
        <svg
          className="shrink-0 fill-green mr-3"
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="9"
        >
          <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
        </svg>
        <span>{text}</span>
      </div>
    </div>
  );
};

export default async function Upgrade() {
  const hasSub = await hasSubscription();
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const { data: user } = await supabase
    .from("users")
    .select("stripe_customer_id")
    .single();
  const acc_link = await createCheckoutLink({
    customer: user?.stripe_customer_id,
    product: "acc",
  });
  const pro_link = await createCheckoutLink({
    customer: user?.stripe_customer_id,
    product: "pro",
  });
  return (
    <div className="w-full">
      <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
        <div>
          <div className="inline-flex font-medium bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-green-800 pb-3">
            Pricing plans
          </div>
        </div>
        <h2 className="h2 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-4">
          Flexible plans and features
        </h2>
        <p className="text-lg text-slate-400">
          Choose a plan that fits your academic intensity. With ArguMentor, gain
          access to powerful arguments and credible sources at a value that
          makes sense for your study habits and budget.
        </p>
      </div>
      <section className="relative flex items-start mx-auto justify-center">
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none -z-10"
          aria-hidden="true"
        >
          <div className="absolute flex items-center justify-center top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 w-1/3 aspect-square">
            <div className="absolute inset-0 translate-z-0 bg-green/90 rounded-full blur-[120px] opacity-50" />
          </div>
        </div>
        <div className="px-6 py-5 rounded-md flex  flex-col justify-end">
          <div className="grow pb-4 mb-4 border-b border-slate-800">
            <div className="text-base font-medium bg-clip-text text-transparent bg-gradient-to-r from-green to-green/20 pb-0.5">
              Teacher's Pet
            </div>
            <div className="mb-1">
              <span className="text-lg font-medium text-white">$</span>
              <span className="text-3xl font-bold text-slate-50">0</span>
              <span className="text-sm text-white font-medium">/mo</span>
            </div>
            <div className="text-white">Perfect for the casual learner.</div>
          </div>
          {hasSub ? (
            <div className="pb-4 border-b border-slate-800">
              <a
                className="btn-sm text-slate-900 bg-gradient-to-r from-white/80 via-white to-white/80 hover:bg-white w-full transition duration-150 ease-in-out group"
                href="#0"
              >
                Get Started{" "}
                <span className="tracking-normal text-green group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">
                  -&gt;
                </span>
              </a>
            </div>
          ) : (
            <div className="bg-gray-800 text-gray-400 p-1 mb-2 btn-sm">
              Your current plan
            </div>
          )}

          <Feature text="10 Searches" />
          <Feature text="Topic research" />
        </div>

        {/* Procrastinator */}
        <div className="px-6 py-5 rounded-md flex  flex-col justify-end">
          <div className="grow pb-4 mb-4 border-b border-slate-800">
            <div className="text-base font-medium bg-clip-text text-transparent bg-gradient-to-r from-green to-green/20 pb-0.5">
              Procrastinator
            </div>
            <div className="mb-1">
              <span className="text-lg font-medium text-white">$</span>
              <span className="text-3xl font-bold text-slate-50">4.99</span>
              <span className="text-sm text-white font-medium">/mo</span>
            </div>
            <div className="text-white">Perfect for the casual learner.</div>
          </div>
          {!hasSub ? (
            <div className="pb-4 border-b border-slate-800">
              <Link
                className="btn-sm text-slate-900 bg-gradient-to-r from-white/80 via-white to-white/80 hover:bg-white w-full transition duration-150 ease-in-out group"
                href={pro_link!}
              >
                Get Started{" "}
                <span className="tracking-normal text-green group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">
                  -&gt;
                </span>
              </Link>
            </div>
          ) : (
            <div className="bg-gray-800 text-gray-400 p-1 mb-2 btn-sm">
              Your current plan
            </div>
          )}

          <Feature text="200 Searches" />
          <Feature text="Chat with sources" />
          <Feature text="Topic research" />
        </div>

        {/* Academic Weapong */}
        <div className="px-6 py-5 rounded-md flex  flex-col justify-end">
          <div className="grow pb-4 mb-4 border-b border-slate-800">
            <div className="text-base font-medium bg-clip-text text-transparent bg-gradient-to-r from-green to-green/20 pb-0.5">
              Academic Weapon
            </div>
            <div className="mb-1">
              <span className="text-lg font-medium text-white">$</span>
              <span className="text-3xl font-bold text-slate-50">9.99</span>
              <span className="text-sm text-white font-medium">/mo</span>
            </div>
            <div className="text-white">Perfect for the casual learner.</div>
          </div>
          {!hasSub ? (
            <div className="pb-4 border-b border-slate-800">
              <Link
                className="btn-sm text-slate-900 bg-gradient-to-r from-white/80 via-white to-white/80 hover:bg-white w-full transition duration-150 ease-in-out group"
                href={acc_link!}
              >
                Get Started{" "}
                <span className="tracking-normal text-green group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">
                  -&gt;
                </span>
              </Link>
            </div>
          ) : (
            <div className="bg-gray-800 text-gray-400 p-1 mb-2 btn-sm">
              Your current plan
            </div>
          )}

          <Feature text="500 Searches" />
          <Feature text="Chat with sources" />
          <Feature text="Generate essays" />
          <Feature text="Generate thesis" />
          <Feature text="MLA + APA citations" />
          <Feature text="Topic research" />
        </div>
      </section>
    </div>
  );
}
