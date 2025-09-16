import { Button } from "@/components/lib/Button";
import { Modal } from "@/components/lib/Modal";
import { ModalProps } from "@/components/lib/Modal/types";
import { useWorkouts } from "@/hooks/useWorkouts";
import { Workout } from "@/models/Workout";
import { formatTime } from "@/utils";
import { toast } from "sonner";

interface FinishConfirmModalProps extends Omit<ModalProps, "title" | "children"> {
  onSuccess: () => void;
  data: Partial<Workout>;
}

export default function FinishConfirmModal(props: FinishConfirmModalProps) {
  const { create: createWorkoutMutation } = useWorkouts();
  

  const handleConfirm = () => {
    createWorkoutMutation.mutate(props.data, {
      onSuccess: () => {
        props.onSuccess();
      },
      onError: () => {
        toast.error("Erro ao salvar treino. Tente novamente.");
      },
    });
  }


  return (
    <Modal
      {...props}
      title="Finalizar treino"
      subtitle="Seu treino será finalizado"
      disableOverlayClick={false}
    >
      <div className="my-8">
        <p>Deseja realmente finalizar seu treino?</p>
        <p><u>Tempo atual</u>: <b>{formatTime(props.data.timeInSeconds!)}</b></p>
        <p><u>Distância atual</u>: <b>{props.data.meters} metros</b></p>
      </div>

      <div className="flex justify-end mt-4 gap-4">
        <Button onClick={props.onClose} color="gray" variant="outlined" disabled={createWorkoutMutation.isPending}>
          Cancelar
        </Button>

        <Button onClick={handleConfirm} color="green" isLoading={createWorkoutMutation.isPending}>
          Finalizar
        </Button>
      </div>
    </Modal>
  );
}
