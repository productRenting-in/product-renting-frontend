import { useState, useRef, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, RotateCcw, CheckCircle2 } from "lucide-react";
import { Button, Card, Heading, Input, Text } from "../../ui";

interface AuthCommonProps {
  mode: "login" | "signup";
}

type Step = "phone" | "otp" | "success";

const RESEND_SECONDS = 30;
const OTP_LENGTH = 6;

const AuthCommon = ({ mode }: AuthCommonProps) => {
  const isLogin = mode === "login";
  const navigate = useNavigate();

  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendTimer, setResendTimer] = useState(0);

  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startResendTimer = useCallback(() => {
    setResendTimer(RESEND_SECONDS);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setResendTimer(prev => {
        if (prev <= 1) {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          clearInterval(timerRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  useEffect(
    () => () => {
      if (timerRef.current) clearInterval(timerRef.current);
    },
    []
  );

  useEffect(() => {
    if (step === "otp") {
      setTimeout(() => otpRefs.current[0]?.focus(), 100);
    }
  }, [step]);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const digits = phone.replace(/\D/g, "");
    if (digits.length !== 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }
    setError("");
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setOtp(Array(OTP_LENGTH).fill(""));
    setStep("otp");
    startResendTimer();
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const next = [...otp];
    next[index] = value.slice(-1);
    setOtp(next);
    setError("");
    if (value && index < OTP_LENGTH - 1) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (pasted.length === OTP_LENGTH) {
      e.preventDefault();
      setOtp(pasted.split(""));
      otpRefs.current[OTP_LENGTH - 1]?.focus();
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length !== OTP_LENGTH) {
      setError("Please enter the complete 6-digit OTP.");
      return;
    }
    setError("");
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setStep("success");
    setTimeout(() => navigate("/"), 1800);
  };

  const handleResend = async () => {
    if (resendTimer > 0) return;
    setOtp(Array(OTP_LENGTH).fill(""));
    setError("");
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);
    startResendTimer();
    setTimeout(() => otpRefs.current[0]?.focus(), 100);
  };

  const maskedPhone = `+91 ${phone.slice(0, 5).padEnd(5, "X")} ${phone.slice(5, 10).padEnd(5, "X")}`;

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm">
        <Card className="shadow-xl border border-base-300/60 rounded-3xl overflow-hidden">
          <div className="card-body gap-0 p-6 sm:p-8">
            {step === "phone" && (
              <>
                <header className="mb-6 space-y-1">
                  <Heading level="h2" className="text-2xl sm:text-3xl">
                    {isLogin ? "Welcome back!" : "Create account"}
                  </Heading>
                  <Text size="sm" className="text-base-content/65 leading-snug">
                    {isLogin
                      ? "Enter your mobile number to receive a one-time password."
                      : "Enter your mobile number to get started with a one-time password."}
                  </Text>
                </header>

                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div className="form-control w-full">
                    <label className="label pb-1">
                      <span className="label-text font-medium">Mobile number</span>
                    </label>
                    <div className="flex overflow-hidden rounded-xl border border-secondary focus-within:border-secondary focus-within:ring-2 focus-within:ring-secondary/20 transition-all bg-base-100">
                      <span className="flex shrink-0 items-center border-r  border-secondary bg-base-200 px-3 text-sm font-semibold text-base-content/70 select-none whitespace-nowrap">
                        +91
                      </span>
                      <Input
                        variant="secondary"
                        type="tel"
                        inputMode="numeric"
                        maxLength={10}
                        placeholder="10-digit mobile number"
                        value={phone}
                        onChange={e => {
                          setPhone(e.target.value.replace(/\D/g, "").slice(0, 10));
                          setError("");
                        }}
                        bordered={false}
                        size="sm"
                        className="min-w-0 flex-1 bg-transparent rounded-none placeholder:text-base-content/40"
                        required
                        autoFocus
                      />
                    </div>
                    {error && (
                      <label className="label pt-1">
                        <span className="label-text-alt text-error">{error}</span>
                      </label>
                    )}
                  </div>

                  <Button
                    type="submit"
                    variant="secondary"
                    className="w-full rounded-xl disabled:cursor-not-allowed"
                    disabled={loading || phone.length !== 10}
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="loading loading-spinner loading-xs" />
                        Sending OTP…
                      </span>
                    ) : (
                      "Send OTP"
                    )}
                  </Button>
                </form>

                <footer className="mt-5 text-center text-xs text-base-content/60">
                  {isLogin ? (
                    <>
                      New here?{" "}
                      <Link to="/signup" className="font-semibold text-secondary hover:underline">
                        Create an account
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
              </>
            )}

            {step === "otp" && (
              <>
                <Button
                  type="button"
                  size="xs"
                  styleType="ghost"
                  onClick={() => {
                    setStep("phone");
                    setError("");
                  }}
                  className="mb-4 flex items-center gap-1.5 text-base-content/60 hover:text-base-content w-fit px-0"
                  iconLeft={<ArrowLeft className="h-3.5 w-3.5" />}
                >
                  Change number
                </Button>

                <header className="mb-6 space-y-1">
                  <Heading level="h2" className="text-2xl sm:text-3xl">
                    Enter OTP
                  </Heading>
                  <Text size="sm" className="text-base-content/65 leading-snug">
                    A 6-digit code was sent to <span className="font-semibold text-base-content">{maskedPhone}</span>
                  </Text>
                </header>

                <form onSubmit={handleVerifyOtp} className="space-y-5">
                  <div className="flex justify-between gap-1.5 sm:gap-2" onPaste={handleOtpPaste}>
                    {otp.map((digit, index) => (
                      <Input
                        key={index}
                        ref={el => {
                          otpRefs.current[index] = el;
                        }}
                        variant="secondary"
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={e => handleOtpChange(index, e.target.value)}
                        onKeyDown={e => handleOtpKeyDown(index, e)}
                        aria-label={`OTP digit ${index + 1}`}
                        className={[
                          "h-11 w-full min-w-0 rounded-xl text-center text-base font-bold caret-transparent transition-all",
                          digit
                            ? "border-secondary text-secondary"
                            : "border-secondary focus:border-secondary focus:ring-2 focus:ring-secondary/20",
                          error ? "border-error" : ""
                        ].join(" ")}
                      />
                    ))}
                  </div>

                  {error && (
                    <Text size="xs" variant="error" className="-mt-2">
                      {error}
                    </Text>
                  )}

                  <Button
                    type="submit"
                    variant="secondary"
                    className="w-full rounded-xl disabled:cursor-not-allowed"
                    disabled={loading || otp.join("").length !== OTP_LENGTH}
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="loading loading-spinner loading-xs" />
                        Verifying…
                      </span>
                    ) : (
                      "Verify OTP"
                    )}
                  </Button>

                  <div className="text-center">
                    {resendTimer > 0 ? (
                      <Text size="xs" className="text-base-content/50">
                        Resend OTP in{" "}
                        <span className="font-semibold text-base-content/70 tabular-nums">
                          00:{String(resendTimer).padStart(2, "0")}
                        </span>
                      </Text>
                    ) : (
                      <Button
                        type="button"
                        size="xs"
                        styleType="link"
                        onClick={handleResend}
                        disabled={loading}
                        className="mx-auto text-secondary hover:underline disabled:cursor-not-allowed px-0"
                        iconLeft={<RotateCcw className="h-3 w-3" />}
                      >
                        Resend OTP
                      </Button>
                    )}
                  </div>
                </form>
              </>
            )}

            {step === "success" && (
              <div className="flex flex-col items-center justify-center gap-4 py-6 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/15">
                  <CheckCircle2 className="h-9 w-9 text-success" strokeWidth={1.5} />
                </div>
                <div className="space-y-1">
                  <Heading level="h3" className="text-xl">
                    {isLogin ? "Logged in!" : "Account created!"}
                  </Heading>
                  <Text size="sm" className="text-base-content/60">
                    Redirecting you to the home page…
                  </Text>
                </div>
                <span className="loading loading-dots loading-md text-secondary" />
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AuthCommon;
