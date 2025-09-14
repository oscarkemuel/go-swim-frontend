import { Button } from "@/components/lib/Button";
import Image1 from "@/../public/images/about-image-01.png";
import Image2 from "@/../public/images/about-image-02.png";
import Image from "next/image";
import Link from "next/link";
import Header from "../Header";
import Footer from "../Footer";

export default function LandingPage() {
  const testimonials = [
    {
      name: "Oscar Kemuel",
      feedback:
        "Ótima aplicação! Não tenho relógio para medir meu tempo e distâncias. Além de permitir montar imagens de treinos.",
    },
    {
      name: "Gustavo Augusto",
      feedback: "Perfeito para quem quer monitorar melhor seus treinos.",
    },
    {
      name: "Mariana Batista",
      feedback:
        "O programa me ajudou a compartilhar meus treinos no Instagram sem precisar de um relógio.",
    },
  ] as const;

  const features = [
    {
      title: "Monitore seu progresso",
      description:
        "Acompanhe suas estatísticas de natação, incluindo distância, tempo e ritmo.",
    },
    {
      title: "Compartilhe com amigos",
      description:
        "Mostre seus treinos para amigos e familiares com facilidade. Gere imagens atrativas para redes sociais.",
    },
    {
      title: "Dashboard de dados",
      description:
        "Visualize seu desempenho com gráficos e estatísticas detalhadas.",
    },
  ] as const;

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Header />

      {/* Hero Section */}
      <section className="pt-16">
        <div className="relative flex justify-center text-center px-6 py-24 gap-8 bg-gradient-to-b from-[#6e6ae9] to-[#4a469e] text-white rounded-b-3xl flex-wrap">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight max-w-2xl text-start">
              Um aplicativo para você te auxiliar nos seus treinos de natação
            </h1>
            <p className="max-w-xl text-sm opacity-90 text-start">
              Sabe aquele aplicativo que te ajuda a organizar seus treinos,
              acompanhar seu progresso e te manter motivado? Esse é o Go Swim!
            </p>
            <div className="flex gap-4 w-full">
              <Link href="/sign-in" className="w-full">
                <Button color="gray">Já tenho conta</Button>
              </Link>
              <Link href="#cta" className="w-full">
                <Button variant="outlined" color="white">
                  Quero me inscrever
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-6">
            <div className="relative w-40 md:w-56 lg:w-64 h-auto">
              <Image
                src={Image1}
                alt="Descrição da imagem"
                className="w-full h-auto object-contain"
                priority
              />
            </div>

            <div className="relative w-40 md:w-56 lg:w-64 h-auto rotate-12 -mt-5">
              <Image
                src={Image2}
                alt="Descrição da imagem"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="px-6 py-20 max-w-6xl mx-auto grid md:grid-cols-3 gap-10"
      >
        {features.map((feature, i) => (
          <div
            key={i}
            className="bg-gray-50 rounded-2xl shadow-md p-8 text-center hover:shadow-xl transition"
          >
            <h3 className="text-2xl font-semibold text-[#3A36DB]">
              {feature.title}
            </h3>
            <p className="mt-4 text-gray-600">{feature.description}</p>
          </div>
        ))}
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="bg-gray-100 px-6 py-20">
        <h2 className="text-3xl font-bold text-center text-[#3A36DB]">
          O que dizem nossos usuários
        </h2>
        <div className="mt-12 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((user, i) => (
            <div
              key={i}
              className="bg-white shadow-lg rounded-2xl text-center p-4 flex flex-col justify-between"
            >
              <p className="text-gray-600 italic">“{user.feedback}”</p>
              <h4 className="mt-4 font-semibold text-[#3A36DB]">{user.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section
        id="cta"
        className="flex items-center justify-center flex-col px-6 py-20 text-center bg-[#3A36DB] text-white"
      >
        <h2 className="text-4xl font-bold">Pronto para começar?</h2>
        <p className="mt-4 text-lg opacity-90">
          Em breve, os planos estarão disponíveis. Fique atento!
        </p>
        <div className="mt-8 max-w-[50%]">
          <Button color="yellow">Em breve!</Button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
