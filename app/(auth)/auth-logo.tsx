import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/images/logo.svg";

export default function AuthLogo() {
  return (
    <div className="mb-5">
      <Link className="inline-flex" href="/">
        <div className="relative flex items-center justify-center w-fit p-3 border border-transparent rounded-xl shadow-2xl [background:linear-gradient(theme(colors.slate.900),_theme(colors.slate.900))_padding-box,_conic-gradient(theme(colors.slate.400),_theme(colors.slate.700)_25%,_theme(colors.slate.700)_75%,_theme(colors.slate.400)_100%)_border-box] before:absolute before:inset-0 before:bg-slate-800/30 before:rounded-2xl">
          <h2 className="font-semibold col-start-1 col-span-1 text-xl">
            <span className="text-green">Argu</span>
            <span className="text-white">Mentor</span>
          </h2>
        </div>
      </Link>
    </div>
  );
}
