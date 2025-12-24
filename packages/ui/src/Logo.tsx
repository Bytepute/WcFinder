import logoSrc from "./assets/wcYabLogo.png";
import Image from "next/image";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return <Image src={logoSrc} alt="Logo" className={className} />;
}
