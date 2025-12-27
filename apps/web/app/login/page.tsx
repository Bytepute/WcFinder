import { Logo } from "@repo/ui";
import Image from "next/image";
import loginImage from "@/assets/loginImage.png";
import LoginForm from "@/components/Login/LoginForm";

export default function Login() {
  return (
    <div className="bg-white h-screen flex flex-col gap-y-32">
      <Logo className="ml-10 mt-10" />
      <div className="flex justify-between items-center mx-20 2xl:mx-40">
        {/* Image & Text */}
        <div className="flex flex-col items-center ">
          <h1 className="text-[32px] text-text-primary font-bold">
            سلام، خوش اومدی
          </h1>
          <Image
            loading="eager"
            src={loginImage}
            alt="Login Image"
            className=""
          />
        </div>
        {/**/}
        <LoginForm />
      </div>
    </div>
  );
}
