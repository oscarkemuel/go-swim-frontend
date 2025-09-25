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
  query: UseQueryResult<GetByIdResponse | null, unknown>;
}

export default function ShareWorkoutContent({ query }: ShareWorkoutPageProps) {
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedRhythm, setSelectedRhythm] = useState<number>(0);
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
    return (
      <div className="text-center py-6 text-red-500">
        Erro ao carregar informações do treino.
      </div>
    );
  }

  const workout = data.workout;

  const hasRhythm = workout.rhythm.length > 0;

  const defaultRhythms = [50, 100];

  const getSelectedRhythm = () => {
    if (!hasRhythm) {
      const defaultFormatedRhythms = {
        50: `${formatTime(workout.rhythmPer50m!)} / 50m`,
        100: `${formatTime(workout.rhythmPer100m!)} / 100m`,
      };

      return defaultFormatedRhythms[selectedRhythm as 50 | 100];
    }

    if (selectedRhythm === 0) return undefined;

    const selectedRhythmExists = workout.rhythm.find(
      (r) => r.meters === selectedRhythm
    );

    return `${formatTime(
      selectedRhythmExists!.timeInSeconds
    )} / ${selectedRhythm}m`;
  };

  const imageData = {
    distance: `${workout.meters}m`,
    time: formatTimeToMinutes(workout.timeInSeconds),
    rhythm: getSelectedRhythm(),
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
        placement: "center",
      });

      setGeneratedImage(generatedImageResult);
    }

    setIsGenerating(false);
  };

  const handleRhythmChange = (rhythm: number) => {
    inputRef.current!.value = "";
    setGeneratedImage(null);

    rhythm === selectedRhythm
      ? setSelectedRhythm(0)
      : setSelectedRhythm(rhythm);
  };

  const downloadImage = (dataUrl: string) => {
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `workout-${workout.id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadOrShare = async () => {
    if (!generatedImage) return;

    // Checa se o navegador suporta Web Share API com arquivos
    if (navigator.canShare && navigator.canShare({ files: [] })) {
      try {
        // Converte base64 em Blob
        const res = await fetch(generatedImage);
        const blob = await res.blob();
        const file = new File([blob], `workout-${workout.id}.png`, {
          type: blob.type,
        });

        // Abre menu de compartilhamento nativo
        await navigator.share({
          title: `Workout ${workout.id}`,
          text: "Olha meu treino!",
          files: [file],
        });
      } catch (err) {
        downloadImage(generatedImage);
      }
    } else {
      downloadImage(generatedImage);
    }
  };

  return (
    <div className="w-full flex flex-col gap-4 max-w-[300px]">
      <div>
        <canvas ref={canvasRef} style={{ display: "none" }} />

        <ul className="flex text-sm font-medium text-center text-gray-500 dark:text-gray-400 mb-3 gap-2 overflow-x-auto pb-2">
          {!hasRhythm &&
            defaultRhythms.map((rhythm) => (
              <li key={rhythm}>
                <Button
                  onClick={() => handleRhythmChange(rhythm)}
                  variant={selectedRhythm === rhythm ? "filled" : "outlined"}
                >
                  Rítmo/{rhythm}
                </Button>
              </li>
            ))}
          {hasRhythm &&
            workout.rhythm.map((rhythm) => (
              <li key={rhythm.meters}>
                <Button
                  onClick={() => handleRhythmChange(rhythm.meters)}
                  variant={
                    selectedRhythm === rhythm.meters ? "filled" : "outlined"
                  }
                >
                  Rítmo/{rhythm.meters}
                </Button>
              </li>
            ))}
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
            />
          </label>

          <div className="mt-4 w-full">
            <Button
              onClick={handleDownloadOrShare}
              disabled={!generatedImage}
              variant="outlined"
            >
              <div className="flex items-center justify-center gap-2">
                <FaDownload />
                {navigator.canShare({ files: [] })
                  ? "Compartilhar"
                  : "Baixar imagem"}
              </div>
            </Button>
          </div>
        </div>
      </div>

      {!generatedImage && isGenerating && (
        <Skeleton width="100%" height={330} />
      )}
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
