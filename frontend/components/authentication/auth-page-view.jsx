import SignUp from "@/components/authentication/signup";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Login } from "@/components/authentication/login";
import LogoDark from "@/components/shared/logo-dark";
import { blinkConfig } from "@/config/blink-config";

export default function AuthPageView() {
  return (
    <div className="bg-linear-to-tr from-slate-50 via-primary/20 to-slate-50">
      <div className="pt-32 md:pt-20 container w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
        {/* Description */}
        <div className="order-1">
          <div className="flex justify-center items-center text-center h-full">
            <div>
              <div className="flex flex-row gap-2 items-center justify-center">
                <div className="w-full h-full max-w-10">
                  <LogoDark />
                </div>
                <span className="text-3xl font-bold">{blinkConfig?.title}</span>
              </div>
              <p className="mt-4 text-center text-sm text-gray-600">
                Start Your Journey
              </p>

              <h1 className="mt-6 text-3xl font-bold">Hey! Welcome</h1>
              <p className="mt-4">
                Join the {blinkConfig?.title} community and start sharing <br />
                your digital world with the world.
              </p>
            </div>
          </div>
        </div>
        {/* Authentication Form */}
        <div className="mt-10 order-2 min-h-screen h-full">
          {/* Tabs */}
          <div className="mt-8 mx-auto max-w-sm h-fit">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="mb-4 w-full">
                <TabsTrigger value="login" className="w-full">
                  Login
                </TabsTrigger>
                <TabsTrigger value="signup" className="w-full">
                  Sign Up
                </TabsTrigger>
              </TabsList>
              <TabsContent
                // forceMount
                // className="data-[state=inactive]:hidden"
                value="login"
              >
                <Login />
              </TabsContent>
              <TabsContent
                // forceMount
                // className="data-[state=inactive]:hidden"
                value="signup"
              >
                <SignUp />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
