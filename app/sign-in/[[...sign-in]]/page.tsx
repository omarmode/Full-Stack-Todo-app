import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="relative flex items-center justify-center h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 overflow-hidden">
      <SignIn />
    </div>
  );
}
