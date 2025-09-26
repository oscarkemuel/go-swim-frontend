import Header from "../Header";
import Footer from "../Footer";
import { Suspense } from "react";
import ResetPasswordForm from "./_components/Form";

export default function ResetPasswordPage() {
  return (
    <div className="h-screen flex flex-col justify-between">
      <div className="flex items-center justify-center h-full p-6">
        <Header />

        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 bg-gradient-to-b from-[#6e6ae9] to-[#4a469e]">
          <Suspense fallback={<p>Carregando...</p>}>
            <ResetPasswordForm />
          </Suspense>
        </div>
      </div>

      <Footer />
    </div>
  );
}
