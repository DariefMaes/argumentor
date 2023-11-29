import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function hasSubscription() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const { data: user } = await supabase
    .from("users")
    .select("stripe_customer_id")
    .single();

  if (session && user?.stripe_customer_id) {
    const subscriptions = await stripe.subscriptions.list({
      customer: user?.stripe_customer_id,
    });

    return subscriptions.data.length > 0;
  }

  return false;
}

export async function createCheckoutLink({
  customer,
  product,
}: {
  customer: string;
  product: "pro" | "acc";
}) {
  const prod = {
    pro: "price_1OHfDmGmeAlPaDEXPXfI6ZDi",
    acc: "price_1OHfE3GmeAlPaDEXFLYi2EA1",
  };

  const checkout = await stripe.checkout.sessions.create({
    success_url: `${process.env.NEXT_PUBLIC_URL}/dashboard/upgrade/success/{CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/dashboard/upgrade/cancel/{CHECKOUT_SESSION_ID}`,
    customer: customer,
    payment_method_types: ["card"],
    line_items: [
      {
        price: prod[product],
        quantity: 1,
      },
    ],
    mode: "subscription",
  });

  return checkout.url;
}

export async function generateCustomerPortalLink(customerId: string) {
  console.log(customerId);
  try {
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${process.env.NEXT_PUBLIC_URL}/dashboard`,
    });
    console.log(portalSession);
    return portalSession.url;
  } catch (error) {
    // console.log(error);
    return undefined;
  }
}

export async function createCustomerIfNull() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const { data: user, error } = await supabase
    .from("users")
    .select("stripe_customer_id")
    .single();

  if (error) {
    await supabase.from("users").insert({
      role: "USER",
      subscription_type: "FREE",
      id: session?.user.id,
      last_reset_day: new Date(),
    });
  }

  if (session) {
    if (!user?.stripe_customer_id) {
      const customer = await stripe.customers.create({
        email: session.user.email,
        name: session.user.user_metadata.full_name,
      });

      const { data, error } = await supabase
        .from("users")
        .update({ stripe_customer_id: customer.id })
        .eq("id", session.user.id);

      return null;
    }
  }
  const { data: customer } = await supabase
    .from("users")
    .select("stripe_customer_id")
    .single();
  return customer?.stripe_customer_id;
}
