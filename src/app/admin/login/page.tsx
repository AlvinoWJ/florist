"use client";

import { useActionState } from "react";
import { loginAction } from "@/features/admin/action/authAction";

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, undefined);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted px-4">
      <form
        action={formAction}
        className="w-full max-w-sm rounded-2xl border-2 border-ink bg-card p-6 shadow-brutalist-md md:p-8"
      >
        <h1 className="font-heading text-2xl font-bold text-foreground">
          Masuk Admin
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Khusus untuk pengelola toko.
        </p>

        <div className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-sm font-medium text-foreground"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="rounded-lg border-2 border-ink bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="password"
              className="text-sm font-medium text-foreground"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="rounded-lg border-2 border-ink bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          {state?.error ? (
            <p className="text-sm text-destructive">{state.error}</p>
          ) : null}

          <button
            type="submit"
            disabled={isPending}
            className="btn-lift mt-2 rounded-lg border-2 border-ink bg-primary py-2.5 text-sm font-semibold text-primary-foreground shadow-brutalist-sm disabled:opacity-60"
          >
            {isPending ? "Memproses..." : "Masuk"}
          </button>
        </div>
      </form>
    </div>
  );
}
