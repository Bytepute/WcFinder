"use client";
import { Input, Logo, Button } from "@repo/ui";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, loginSchema } from "@repo/schema";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

const loginUser = async (data: LoginSchema) => {
  try {
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      userName: "",
      password: "",
      rememberMe: false,
    },
  });

  const {
    mutate,
    isPending,
    error: apiError,
  } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const onSubmit = (data: LoginSchema) => {
    mutate(data);
  };

  return (
    <form className="w-4/12" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-center gap-10">
        <Logo />
        {/* Show Global API Errors */}
        {apiError && (
          <div className="text-red-500 bg-red-50 p-3 rounded-md w-full text-center">
            {apiError.message || "خطایی رخ داده است"}
          </div>
        )}
        <div className="flex flex-col gap-2 w-full">
          <div className="flex flex-col gap-6">
            <>
              <Input
                className="w-full"
                placeholder="نام کاربری"
                {...register("userName")}
              />
              {errors.userName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.userName.message}
                </p>
              )}
            </>
            <>
              <Input
                className="w-full"
                placeholder="کلمه عبور"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </>
          </div>

          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <p className="text-[#606060]">مرا به خاطر بسپار</p>

              <input
                type="checkbox"
                className="w-4 h-4"
                {...register("rememberMe")}
              />
            </div>
            <Button variant="link" type="button">
              فراموشی رمز عبور
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-4 w-full">
          <Button
            className="w-full"
            variant="primary"
            type="submit"
            disabled={isPending}
          >
            {isPending ? "در حال ورود..." : "ورود"}
          </Button>
          <Button type="button" variant="linkGray">
            نیاز به راهنمایی دارید؟
          </Button>
        </div>
      </div>
    </form>
  );
}
export default LoginForm;
