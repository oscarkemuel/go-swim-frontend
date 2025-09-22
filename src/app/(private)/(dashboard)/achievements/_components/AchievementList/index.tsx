"use client";
import { useAchievements } from "@/hooks/useAchievements";
import { DynamicIcon, iconNames } from "lucide-react/dynamic";
import Loading from "./loading";

export default function AchievementsList() {
  const { getMyAchievements } = useAchievements();

  const achievements = getMyAchievements();

  if (achievements.isLoading || achievements.isFetching) {
    return <Loading />;
  }

  const achievementsData = achievements.data?.achievements || [];

  return (
    <div className="flex gap-4 flex-wrap">
      {achievementsData.map((achievement) => {
        const IconComponent = iconNames.includes(achievement.icon as any)
          ? (achievement.icon as any)
          : "trophy";

        return (
          <div
            key={achievement.id}
            className={`flex items-center gap-4 p-4 rounded-xl min-w-[400px] max-sm:min-w-full flex-1 ${
              achievement.unlocked
                ? "bg-green-100"
                : "bg-gray-100 border-gray-400"
            }`}
          >
            <div
              className={`p-2 rounded-xl ${
                achievement.unlocked
                  ? "bg-green-200 text-white"
                  : "bg-gray-300 text-gray-600"
              }`}
            >
              <DynamicIcon
                name={IconComponent}
                color={achievement.unlocked ? "green" : "gray"}
                size={28}
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold">{achievement.title}</h3>
              <p className="text-sm text-gray-600">{achievement.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
