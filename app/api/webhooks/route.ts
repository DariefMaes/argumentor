import { NextResponse } from "next/server";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
  apiVersion: "2023-10-16",
});
import { cookies, headers } from "next/headers";
import Stripe from "stripe";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE!
);

const endpointSecret = "whsec_q2twh8lNVGmHzrowjqcz92QYBxv2Lduv";

export async function POST(request: Request) {
  try {
    const sig = headers().get("stripe-signature");
    const body = await request.text();
    const event = stripe.webhooks.constructEvent(body, sig!, endpointSecret);
    console.log("hit");

    // Initial payment first time
    if (event.type === "checkout.session.completed") {
      console.log("Checkout session completed!");
      console.log(event.data.object);
      if (typeof event.data.object.subscription === "string") {
        const subscription = await stripe.subscriptions.retrieve(
          event.data.object.subscription
        );
        let newSubscriptionType;
        console.log(subscription.items.data[0].price.id);
        switch (subscription.items.data[0].price.id) {
          case "price_1OF8ofAR2IMz6yHQRWhzQYz9":
            newSubscriptionType = "PRO";
            break;
          case "price_1OF8oqAR2IMz6yHQKQDMVnaa":
            newSubscriptionType = "ACC";
            break;
          default:
            newSubscriptionType = "FREE";
            break;
        }

        console.log(newSubscriptionType);
        console.log(event.data.object.customer);
        const { data: test, error: testError } = await supabase
          .from("users")
          .select("*");

        console.log(test);
        console.log(testError);
        const { data, error } = await supabase
          .from("users")
          .update({
            subscription_type: newSubscriptionType,
          })
          .eq("stripe_customer_id", event.data.object.customer);
        console.log(data);
        console.log(error);
      }
    }

    // Subscription created
    if (event.type === "customer.subscription.created") {
      console.log("Customer created!");
      console.log(event.data.object);
      let newSubscriptionType;
      switch (event.data.object.items.data[0].price.id) {
        case "price_1OF8ofAR2IMz6yHQRWhzQYz9":
          newSubscriptionType = "PRO";
          break;
        case "price_1OF8oqAR2IMz6yHQKQDMVnaa":
          newSubscriptionType = "ACC";
          break;
        default:
          newSubscriptionType = "FREE";
          break;
      }

      console.log(newSubscriptionType);
      const { data, error } = await supabase
        .from("users")
        .update({
          subscription_type: newSubscriptionType,
        })
        .eq("stripe_customer_id", event.data.object.customer);
      console.log(data);
      console.log(error);
    }

    // Subscription updated
    if (event.type === "customer.subscription.updated") {
      console.log("Customer updated!");
      console.log(event.data.object);
      console.log(JSON.stringify(event.data.object.items.data));

      let newSubscriptionType;
      switch (event.data.object.items.data[0].price.id) {
        case "price_1OF8ofAR2IMz6yHQRWhzQYz9":
          newSubscriptionType = "PRO";
          break;
        case "price_1OF8oqAR2IMz6yHQKQDMVnaa":
          newSubscriptionType = "ACC";
          break;
        default:
          newSubscriptionType = "FREE";
          break;
      }

      console.log(newSubscriptionType);
      const { data, error } = await supabase
        .from("users")
        .update({
          subscription_type: newSubscriptionType,
        })
        .eq("stripe_customer_id", event.data.object.customer);
      console.log(data);
      console.log(error);
    }

    // Subscription deleted
    if (event.type === "customer.subscription.deleted") {
      console.log("Customer deleted!");
      console.log(event.data.object);
      const { data, error } = await supabase
        .from("users")
        .update({
          subscription_type: "FREE",
        })
        .eq("stripe_customer_id", event.data.object.customer);

      console.log(data);
      console.log(error);
    }

    if (event.type === "invoice.payment_succeeded") {
      const { data, error } = await supabase
        .from("users")
        .update({
          last_reset_day: new Date().toISOString(),
        })
        .eq("stripe_customer_id", event.data.object.customer);
      console.log(data);
      console.log(error);
    }
  } catch (err) {
    NextResponse.json({ error: err }, { status: 400 });
    return;
  }

  return NextResponse.json({ result: event, ok: true });
}
