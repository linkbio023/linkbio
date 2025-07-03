import ForgotPassword from "@/components/authentication/forgot-password";

export default function ForgotPasswordPage() {
  return (
    <div className="pt-24 container min-h-screen h-full flex flex-col gap-6 items-center">
      <div className="grid gap-2">
        <h1 className="text-3xl lg:text-6xl font-bold text-center">
          Forgot Password?
        </h1>
        <p className="mt-4 text-center text-gray-600">
          Don&apos;t worry! <br /> Enter your email below and we&apos;ll send
          you a password reset link.
        </p>
      </div>
      <div className="mt-4 w-fit h-fits">
        <ForgotPassword />
      </div>
    </div>
  );
}
