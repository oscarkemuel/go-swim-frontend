"use client";

import { Button } from "@/components/lib/Button";
import { BiSwim } from "react-icons/bi";
import Header from "../Header";
import Footer from "../Footer";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const { forgotPassword } = useAuth();
  const [hasError, setHasError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setHasError(false);
    setIsSuccess(false);

    const formData = new FormData(event.target as HTMLFormElement);
    const email = String(formData.get("email"));

    forgotPassword.mutate(
      {
        email,
        redirectTo: `${window.location.origin}/reset-password`,
      },
      {
        onSuccess: (request) => {
          if (request.data?.message) {
            setHasError(true);
            return;
          }

          if (request.status === 200) {
            setIsSuccess(true);
          }
        },
        onError: () => {
          setHasError(true);
        },
      }
    );
  };

  return (
    <div className="h-screen flex flex-col justify-between">
      <div className="flex items-center justify-center h-full p-6">
        <Header />

        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 bg-gradient-to-b from-[#6e6ae9] to-[#4a469e]">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex items-center gap-4 flex-col">
              <div className="flex items-center justify-items-start gap-4">
                <BiSwim className="text-3xl text-white" />
                <h5 className="text-xl font-medium text-gray-900 dark:text-white">
                  Esqueci a senha
                </h5>
              </div>

              {hasError && (
                <p className="text-white text-sm underline">
                  Ops! Algo deu errado. Tente novamente.
                </p>
              )}
              {isSuccess && (
                <p className="text-green-100 text-sm underline">
                  Enviamos um link para o seu email!
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Seu email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="fulano@detal.com"
                required
              />
            </div>

            <Button
              type="submit"
              isLoading={forgotPassword.isPending}
              color="white"
              variant="outlined"
            >
              Enviar link
            </Button>

            <div className="text-sm text-white">
              Lembrou da senha?{" "}
              <Link href="/sign-in" className="hover:underline">
                Fazer login
              </Link>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}
