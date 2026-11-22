"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Space_Grotesk } from "next/font/google";
import { Eye, EyeOff } from "lucide-react";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message || "Login failed");
      router.replace("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setBusy(false);
    }
  }

  const inputBase =
    "h-13 w-full border border-[#D2D2D2] bg-white px-3 text-[17px] text-[#616161] outline-none focus:border-[#006DDB]";

  return (
    <div
      className={`${spaceGrotesk.className} flex min-h-screen items-center justify-center bg-white px-4 py-12`}
    >
      <div className="w-full max-w-xl bg-[#F5F5F5]">
        {/* Same blue accent bar used on contact form */}
        <div className="h-[4px] w-full bg-[#006DDB]" />

        <div className="px-8 py-10 tablet:px-12">
          <div className="mb-6 flex justify-center">
            {/* Transparent version: the regular logo has a white background that showed as a
                white box on the grey card. */}
            <Image
              src="/assets/home/LogoTransparent.webp"
              alt="STELZ"
              width={1579}
              height={556}
              priority
              className="h-14 w-auto"
            />
          </div>
          <h1 className="text-center text-[36px] font-semibold leading-tight text-[#1F1F1F] tablet:text-[44px]">
            Sign in
          </h1>
          <p className="mt-3 text-center text-base leading-7 text-[#616161]">
            Manage the gallery, key projects and clients on stelzparking.com.
          </p>

          <form className="mt-8 space-y-5" onSubmit={onSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
              className={inputBase}
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                className={`${inputBase} pr-12`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
                className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-[#616161] hover:text-[#006DDB]"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {error ? (
              <p className="text-sm text-red-600" role="alert">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={busy}
              className="inline-flex h-12 w-full items-center justify-center bg-[#006DDB] px-6 text-[16px] font-medium text-white transition hover:bg-[#0a3a85] disabled:opacity-60"
            >
              {busy ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
