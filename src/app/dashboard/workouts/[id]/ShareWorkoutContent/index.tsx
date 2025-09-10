import { Button } from "@/components/lib/Button";
import { GetByIdResponse } from "@/services/workoutService/types";
import { formatTime, formatTimeToMinutes } from "@/utils";
import { generateImage } from "@/utils/canvas";
import { UseQueryResult } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { FaDownload, FaUpload } from "react-icons/fa6";
import Skeleton from "react-loading-skeleton";
import Loading from "./loading";

interface ShareWorkoutPageProps {
  query: UseQueryResult<GetByIdResponse | null, unknown>
}

export default function ShareWorkoutContent({ query }: ShareWorkoutPageProps) {
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedRhythm, setSelectedRhythm] = useState<"50m" | "100m">("50m");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { data, isLoading, isFetching, isError } = query;

  if (isLoading || isFetching) {
    return (
      <div className="w-full max-w-[300px]">
        <Loading />
      </div>
    );
  }

  if (isError || !data) {
    return <div className="text-center py-6 text-red-500">Erro ao carregar informações do treino.</div>;
  }

  const workout = data.workout;

  const imageData = {
    distance: `${workout.meters}m`,
    time: formatTimeToMinutes(workout.timeInSeconds),
    rhythm:
      selectedRhythm === "50m"
        ? `${formatTime(workout.rhythmPer50m, true)} / 50m`
        : `${formatTime(workout.rhythmPer100m, true)} / 100m`,
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsGenerating(true);
    setGeneratedImage(null);

    if (!canvasRef.current || !data || !workout) {
      setIsGenerating(false);
      return;
    }

    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      const generatedImageResult = await generateImage({
        canvasRef,
        imageUrl,
        data: imageData,
      });

      setGeneratedImage(generatedImageResult);
    }

    setIsGenerating(false);
  };

  const handleRhythmChange = (rhythm: "50m" | "100m") => {
    inputRef.current!.value = "";
    setGeneratedImage(null);
    setSelectedRhythm(rhythm);
  };

  const handleDownload = () => {
    if (!generatedImage) return;

    const link = document.createElement("a");
    link.href = generatedImage;
    link.download = `workout-${workout.id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full flex flex-col gap-4 max-w-[300px]">
      <div>
        <canvas ref={canvasRef} style={{ display: "none" }} />

        <ul className="flex text-sm font-medium text-center text-gray-500 dark:text-gray-400 mb-3">
          <li className="me-2">
            <Button
              onClick={() => handleRhythmChange("50m")}
              filled={selectedRhythm === "50m"}
            >
              Rítmo/50m
            </Button>
          </li>
          <li className="me-2">
            <Button
              onClick={() => handleRhythmChange("100m")}
              filled={selectedRhythm === "100m"}
            >
              Rítmo/100m
            </Button>
          </li>
        </ul>

        <div className="cursor-pointer  mt-2">
          <label className="cursor-pointer block w-full max-w-[300px] bg-blue-50 text-blue-700 text-sm font-semibold py-2 px-4 rounded-lg text-center hover:opacity-80">
            <div className="flex items-center justify-center gap-2">
              <FaUpload />
              Selecionar imagem
            </div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
              ref={inputRef}
              capture="environment"
            />
          </label>

          <div className="mt-4 w-full">
            <Button onClick={handleDownload} disabled={!generatedImage} filled={false}>
              <div className="flex items-center justify-center gap-2">
                <FaDownload />
                Baixar imagem
              </div>
            </Button>
          </div>
        </div>
      </div>

      {!generatedImage  && isGenerating && <Skeleton width="100%" height={330} />}
      {!generatedImage && !isGenerating && (
        <div className="w-full h-[330px] rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
          <span className="text-gray-500">Nenhuma imagem selecionada</span>
        </div>
      )}

      {generatedImage && (
        <img
          src={generatedImage}
          alt="Selected"
          className="w-full rounded-lg shadow-md"
        />
      )}
    </div>
  );
}
