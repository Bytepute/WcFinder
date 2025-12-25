import { Input, Logo, Button } from "@repo/ui";

function LoginForm() {
  return (
    <div className="flex flex-col items-center gap-10 w-4/12">
      <Logo />
      <div className="flex flex-col gap-2 w-full">
        <div className="flex flex-col gap-6">
          <Input className="w-full" placeholder="نام کاربری" />
          <Input className="w-full" placeholder="کلمه عبور" />
        </div>

        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <p className="text-[#606060]">مرا به خاطر بسپار</p>
            <input type="checkbox" className="w-4 h-4" />
          </div>
          <Button variant="link">فراموشی رمز عبور</Button>
        </div>
      </div>

      <div className="flex flex-col gap-4 w-full">
        <Button className="w-full" variant="primary">
          ورود
        </Button>
        <Button variant="linkGray">نیاز به راهنمایی دارید؟</Button>
      </div>
    </div>
  );
}
export default LoginForm;
