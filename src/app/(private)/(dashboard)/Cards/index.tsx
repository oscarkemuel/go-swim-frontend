"use client"
import { useDashboard } from "@/hooks/useDashboard";
import Card from "./Card";
import { IoMdTimer } from "react-icons/io";
import { HiRocketLaunch } from "react-icons/hi2";
import { RiPinDistanceFill } from "react-icons/ri";
import Loading from "./loading";

export default function DashboardCards() {
  const { cards } = useDashboard();

  const { maxMeters, totalHours, totalKms } = cards.data || {};

  if(cards.isLoading || cards.isFetching) return <Loading />;

  return (
    <div className="flex gap-4 flex-wrap">
      <Card
        title="Último RP"
        value={`${maxMeters!} metros`}
        icon={<HiRocketLaunch />}
        colorIcon="#0090FF"
      />
      <Card
        title="Tempo dentro da piscina"
        value={`${totalHours!} horas`}
        icon={<IoMdTimer />}
        colorIcon="#3A36DB"
      />
      <Card
        title="Quilometragem total"
        value={`${totalKms!} km`}
        icon={<RiPinDistanceFill />}
        colorIcon="#F9B959"
      />
    </div>
  );
}
