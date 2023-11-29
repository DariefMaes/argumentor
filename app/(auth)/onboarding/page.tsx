import AuthLogo from "../auth-logo";
import Form from "./Components/Form";

export default async function Onboarding() {
  return (
    <>
      <div className="max-w-3xl mx-auto text-center pb-12">
        <AuthLogo />
        <h1 className="h2 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60">
          Onboarding
        </h1>
        <p className="text-lg text-slate-400 py-5">
          We're excited to have you on our journey! We want to know more about
          you, so we can help you at all times. Please answer the following
          questions.
        </p>
      </div>
      <Form />
    </>
  );
}
