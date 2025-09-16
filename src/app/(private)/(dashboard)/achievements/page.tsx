import Header from "@/components/layout/Header";
import AchievementsList from "./_components/AchievementList";

export default function AchievementsPage() {
  return (
    <div className="h-screen">
      <Header title="Minhas Conquistas" subtitle="Acompanhe seu progresso" />

      <AchievementsList />
    </div>
  );
}