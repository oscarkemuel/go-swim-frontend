import { Button } from "@/components/lib/Button";
import ImageBase from "@/../public/images/about-image.svg";
import Image01 from "@/../public/images/about-image-01.png";
import Image02 from "@/../public/images/about-image-02.png";
import Image03 from "@/../public/images/about-image-03.png";
import Image04 from "@/../public/images/about-image-04.png";
import Image05 from "@/../public/images/about-image-05.png";
import Image06 from "@/../public/images/about-image-06.png";
import Image from "next/image";
import Link from "next/link";
import Header from "../Header";
import Footer from "../Footer";
import PlanCard, { Plan } from "./_components/PlanCard";
import { Camera, CircleGauge, Medal } from "lucide-react";

export default function LandingPage() {
  const testimonials = [
    {
      name: "Oscar Kemuel",
      feedback:
        "Ótima aplicação! Não tenho relógio para medir meu tempo e distâncias. Além de permitir montar imagens de treinos.",
    },
    {
      name: "Gustavo Augusto",
      feedback: "Gostei das conquistas! Me sinto mais motivado a treinar.",
    },
    {
      name: "Mariana Monteiro",
      feedback:
        "O programa me ajudou a compartilhar meus treinos no Instagram sem precisar de um relógio.",
    },
  ] as const;

  const features = [
    {
      title: "Dashboard",
      description:
        "Acompanhe suas estatísticas de natação, incluindo distância, tempo e ritmo.",
      icon: <CircleGauge />,
    },
    {
      title: "Compartilhar treinos",
      description:
        "Mostre seus treinos para amigos e familiares com facilidade. Gere imagens atrativas para redes sociais.",
      icon: <Camera />,
    },
    {
      title: "Conquistas",
      description:
        "Ganhe medalhas e conquistas ao atingir marcos importantes em seus treinos.",
      icon: <Medal />,
    },
  ] as const;

  const featuresImages = [
    {
      title: "Timer",
      image: Image01,
    },
    {
      title: "Dashboard 01",
      image: Image02,
    },
    {
      title: "Dashboard 02",
      image: Image03,
    },
    {
      title: "Conquistas",
      image: Image04,
    },
    {
      title: "Treinos",
      image: Image05,
    },
    {
      title: "Compartilhar treino",
      image: Image06,
    },
  ] as const;

  const plans = [
    {
      id: "main_plan",
      name: "Principal",
      price: 11.99,
      frequency: "mês",
      moneyType: "R$",
      features: [
        "Acesso ao dashboard de treinos",
        "Timer de treino",
        "Compartilhamento de treinos",
        "Conquistas",
      ],
      observations: "7 dias de teste grátis",
    },
  ] as Plan[];

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Header />

      {/* Hero Section */}
      <section className="pt-16">
        <div className="relative flex justify-center text-center px-6 py-24 gap-8 bg-gradient-to-b from-[#6e6ae9] to-[#4a469e] text-white rounded-b-3xl flex-wrap">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight max-w-2xl text-start">
              Uma aplicação para te auxiliar nos seus treinos de natação
            </h1>
            <p className="max-w-xl text-sm opacity-90 text-start">
              Já pensou em não ter que ficar contando voltas na piscina? Poder
              registrar seus treinos sem precisar de um relógio caro? Com o
              AquaTimer, você pode!
            </p>
            <div className="flex gap-4 w-full">
              <Link href="/sign-in" className="w-full">
                <Button color="gray">Já tenho conta</Button>
              </Link>
              <Link href="#cta" className="w-full">
                <Button variant="outlined" color="white">
                  Inscrever-se
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-6">
            <div className="relative w-65 md:w-70 lg:w-110 h-auto">
              <Image
                src={ImageBase}
                alt="Descrição da imagem"
                className="w-full h-auto object-contain"
                priority
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
            <div className="mb-4 w-full flex justify-center text-[#3A36DB]">
              {feature.icon}
            </div>
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

      {/* Images of Features */}
      <section
        id="features-images"
        className="overflow-x-auto flex justify-center w-full"
      >
        <div className="w-full flex px-6 py-20 max-w-8xl gap-3 max-md:grid max-md:grid-cols-2 lg:px-20 ">
          {featuresImages.map((feature, i) => (
            <div key={i} className="flex items-center">
              <Image src={feature.image} alt={feature.title} priority />
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section
        id="cta"
        className="flex items-center justify-center flex-col px-6 py-20 text-center bg-[#F3F4F6] text-gray-900"
      >
        <h2 className="text-4xl font-bold">Pronto para começar?</h2>
        <div className="mt-8 flex w-full justify-center">
          <PlanCard plans={plans} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
