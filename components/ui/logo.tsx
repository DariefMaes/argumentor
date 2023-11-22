import Link from "next/link";
import Image from "next/image";
import LogoImg from "@/public/images/logo.svg";

export default function Logo() {
  return (
    <Link className="block" href="/" aria-label="Cruip">
      <h2 className="font-semibold col-start-1 col-span-1 text-xl">
        <span className="text-green">Argu</span>
        <span className="text-white">Mentor</span>
      </h2>
    </Link>
  );
}
