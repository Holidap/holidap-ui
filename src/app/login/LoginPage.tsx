"use client";

import React from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const { isLoggedIn, login } = useAuthStore();

  const [username, setUsername] = React.useState("");

  React.useEffect(() => {
    if (isLoggedIn) {
      router.push("/main");
    }
  }, [isLoggedIn, router]);

  const handleLogin = () => {
    if (username.trim()) {
      login(username);
      router.push("/main");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome to Holidap
          </h1>
          <p className="text-gray-600 dark:text-gray-400">Please enter your username to continue</p>
        </div>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Username
            </label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full"
            />
          </div>

          <Button onClick={handleLogin} className="w-full" disabled={!username.trim()}>
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}
