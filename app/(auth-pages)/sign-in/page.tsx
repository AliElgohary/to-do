"use client";
import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { useAuthStore } from "@/store/authStore";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  const supabase = createClient();
  const { user, setUser, signOut } = useAuthStore();

  const handleGithubSignIn = async () => {
    try {
      await supabase.auth.signInWithOAuth({ provider: "github" });
      const {
        data: { user: currentUser },
      } = await supabase.auth.getUser();
      setUser(user);
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  return (
    <form className="flex-1 flex flex-col min-w-64">
      <h1 className="text-2xl font-medium">Sign in</h1>
      <p className="text-sm text-foreground">
        Don't have an account?{" "}
        <Link className="text-foreground font-medium underline" href="/sign-up">
          Sign up
        </Link>
      </p>
      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        <Label htmlFor="email">Email</Label>
        <Input name="email" placeholder="you@example.com" required />
        <div className="flex justify-between items-center">
          <Label htmlFor="password">Password</Label>
          <Link
            className="text-xs text-foreground underline"
            href="/forgot-password"
          >
            Forgot Password?
          </Link>
        </div>
        <Input
          type="password"
          name="password"
          placeholder="Your password"
          required
        />
        <SubmitButton pendingText="Signing In..." formAction={signInAction}>
          Sign in
        </SubmitButton>
        <FormMessage message={searchParams} />

        {/* Divider */}
        <div className="relative flex py-5 items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-gray-500">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* GitHub Sign-In Button */}
        <button
          type="button"
          onClick={handleGithubSignIn}
          className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded hover:bg-gray-700"
        >
          Sign in with GitHub
        </button>
      </div>
    </form>
  );
}
