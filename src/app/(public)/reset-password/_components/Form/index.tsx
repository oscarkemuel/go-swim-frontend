"use client";

import { Button } from "@/components/lib/Button";
import { BiSwim } from "react-icons/bi";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter, useSearchParams } from "next/navigation";

export default function ResetPasswordForm() {
  const { resetPassword } = useAuth();
  const [hasError, setHasError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      router.push("/forgot-password");
    }
  }, [token]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setHasError(false);
    setIsSuccess(false);
    setPasswordMismatch(false);

    const formData = new FormData(event.target as HTMLFormElement);
    const password = String(formData.get("password"));
    const confirmPassword = String(formData.get("confirmPassword"));

    if (password !== confirmPassword) {
      setPasswordMismatch(true);
      return;
    }

    resetPassword.mutate(
      {
        token: token!,
        newPassword: password,
      },
      {
        onSuccess: (request) => {
          if (request.status === 200) {
            setIsSuccess(true);
            setTimeout(() => router.push("/sign-in"), 2000);
          }
        },
        onError: () => {
          setHasError(true);
        },
      }
    );
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="flex items-center gap-4 flex-col">
        <div className="flex items-center justify-items-start gap-4">
          <BiSwim className="text-3xl text-white" />
          <h5 className="text-xl font-medium text-gray-900 dark:text-white">
            Redefinir senha
          </h5>
        </div>

        {hasError && (
          <p className="text-white text-sm underline">
            Ops! Algo deu errado. Tente novamente.
          </p>
        )}
        {passwordMismatch && (
          <p className="text-yellow-200 text-sm underline">
            As senhas não coincidem.
          </p>
        )}
        {isSuccess && (
          <p className="text-green-100 text-sm underline">
            Senha alterada com sucesso! Redirecionando...
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Nova senha
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="••••••••"
          required
        />
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Confirme a nova senha
        </label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="••••••••"
          required
        />
      </div>

      <Button
        type="submit"
        isLoading={resetPassword.isPending}
        color="white"
        variant="outlined"
        disabled={isSuccess}
      >
        Redefinir senha
      </Button>
    </form>
  );
}
