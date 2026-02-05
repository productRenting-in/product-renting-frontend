import { useState } from "react";
import { Link } from "react-router-dom";
import { Heading, Text, Card, Input, Button } from "../ui";

interface AuthCommonProps {
  mode: "login" | "signup";
}

const AuthCommon = ({ mode }: AuthCommonProps) => {
  const isLogin = mode === "login";
  const [method, setMethod] = useState<"phone" | "email">("phone");

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-3 py-4 sm:px-4 sm:py-6">
      <div className="w-full max-w-sm sm:max-w-md">
        <Card className="shadow-xl border border-base-300/60 rounded-3xl">
          <div className="card-body space-y-2 sm:space-y-3">
            <header className="space-y-1">
              <Heading level="h2" className="text-2xl sm:text-3xl">
                {isLogin ? "Welcome back!" : "Create your Account"}
              </Heading>
              <Text size="sm" className="text-base-content/70 leading-snug">
                {isLogin
                  ? "Log in to manage your bookings and orders."
                  : "Sign up to start renting and customizing products."}
              </Text>
            </header>

            <div className="space-y-1 pt-1">
              <Button variant="neutral" className="w-full justify-center gap-2 bg-base-100 border border-base-300">
                <span className="rounded-full bg-base-200 px-2 py-1 text-xs font-semibold text-base-content">G</span>
                {isLogin ? "Continue with Google" : "Sign up with Google"}
              </Button>
            </div>

            <div className="flex items-center gap-3 text-xs text-base-content/60">
              <div className="h-px flex-1 bg-base-300" />
              <span>or Choose Another Method</span>
              <div className="h-px flex-1 bg-base-300" />
            </div>

            <div className="inline-flex w-full rounded-full bg-base-200 p-1 text-[11px] sm:text-xs mt-1 gap-1">
              <Button
                type="button"
                size="sm"
                styleType="ghost"
                className={`flex-1 rounded-full px-3 py-2 font-medium border-0 hover:bg-base-100 ${
                  method === "phone" ? "bg-base-100 text-base-content shadow-sm" : "text-base-content/70"
                }`}
                onClick={() => setMethod("phone")}
              >
                Phone (OTP)
              </Button>
              <Button
                type="button"
                size="sm"
                styleType="ghost"
                className={`flex-1 rounded-full px-3 py-2 font-medium border-0 hover:bg-base-100 ${
                  method === "email" ? "bg-base-100 text-base-content shadow-sm" : "text-base-content/70"
                }`}
                onClick={() => setMethod("email")}
              >
                Email &amp; password
              </Button>
            </div>

            <form
              className="space-y-3 pt-1"
              onSubmit={e => {
                e.preventDefault();
              }}
            >
              {method === "phone" ? (
                <>
                  <Input
                    type="tel"
                    label="Mobile number"
                    placeholder="Enter phone number"
                    variant="primary"
                    fullWidth
                    required
                  />
                  <Button type="submit" variant="primary" className="w-full">
                    {isLogin ? "Send OTP & log in" : "Send OTP"}
                  </Button>
                </>
              ) : (
                <>
                  <Input
                    type="email"
                    label="Email"
                    placeholder="you@example.com"
                    variant="primary"
                    fullWidth
                    required
                  />
                  <Input
                    type="password"
                    label="Password"
                    placeholder={isLogin ? "Enter your password" : "Create a password"}
                    variant="primary"
                    fullWidth
                    required
                  />
                  <Button type="submit" variant="secondary" className="w-full">
                    {isLogin ? "Continue" : "Create Account"}
                  </Button>
                </>
              )}
            </form>

            <footer className="pt-1 text-center text-xs sm:text-sm text-base-content/70">
              {isLogin ? (
                <>
                  Don&apos;t have an account?{" "}
                  <Link to="/signup" className="font-semibold text-secondary hover:underline">
                    Sign up
                  </Link>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <Link to="/login" className="font-semibold text-secondary hover:underline">
                    Log in
                  </Link>
                </>
              )}
            </footer>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AuthCommon;
