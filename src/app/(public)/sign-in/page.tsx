"use client";

import { Button } from "@/components/lib/Button";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BiSwim } from "react-icons/bi";
import Header from "../Header";
import Footer from "../Footer";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const email = formData.get("email");
    const password = formData.get("password");

    login.mutate(
      { email: String(email), password: String(password) },
      {
        onSuccess: (request) => {
          if (request.status === 201) {
            router.push("/");
          }
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
                  Fazer login
                </h5>
              </div>

              <div>
                {login.isError && (
                  <p className="text-white text-sm underline">
                    Ops! Algo deu errado. Tente novamente. Caso não funcione,
                    entre em contato com o suporte.
                  </p>
                )}
              </div>
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
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="fulano@detal.com"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Sua senha
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>
            {/* <div className="flex items-start">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                  required
                />
              </div>
              <label
                htmlFor="remember"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Remember me
              </label>
            </div>
            <a
              href="#"
              className="ms-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
            >
              Lost Password?
            </a>
          </div> */}
            <Button
              type="submit"
              isLoading={login.isPending}
              color="white"
              variant="outlined"
            >
              Fazer login
            </Button>
            {/* <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            Não cadastrado?{" "}
            <a
              href="#"
              className="text-blue-700 hover:underline dark:text-blue-500"
            >
              Criar conta
            </a>
          </div> */}
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}
