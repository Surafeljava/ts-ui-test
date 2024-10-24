'use client';

import { useAuth } from "./context/AuthContext";

export default function Home() {
  const {isAuthenticated, logout, userData} = useAuth();
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">

        <div className="font-[family-name:var(--font-geist-mono)] flex flex-col text-sm text-center sm:text-left">
          <p className="mb-2">Welcome, to Test Savant.</p>
          {!isAuthenticated && <p>Login to continue to the dashboard.</p>}
          {isAuthenticated && userData && <p className="text-blue-400">{userData.username}</p>}
        </div>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="/dashboard"
          >
            Dashboard
          </a>
          {!isAuthenticated ? (
            <a
              className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
              href="/auth/login"
            >
              Login
            </a>
          ) : (
            <button
              className="rounded-full border border-dashed border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
              onClick={logout}
            >
              Logout
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
