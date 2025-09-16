import { Button } from "@/components/lib/Button";
import { Modal } from "@/components/lib/Modal";
import { ModalProps } from "@/components/lib/Modal/types";
import { useWorkouts } from "@/hooks/useWorkouts";
import { Workout } from "@/models/Workout";
import { formatDate } from "@/utils";

interface DeleteWorkoutModalProps
  extends Omit<ModalProps, "title" | "children"> {
  workout: Workout;
  onSuccess: () => void;
}

export default function DeleteWorkoutModal(props: DeleteWorkoutModalProps) {
  const { remove } = useWorkouts();

  const handleDelete = (id: number) => {
    remove.mutate(id, {
      onSuccess: () => {
        props.onSuccess();
      },
    });
  };

  return (
    <Modal
      {...props}
      title={`Deletar treino`}
      subtitle="Esta ação não pode ser desfeita"
      disableOverlayClick={remove.isPending}
    >
      <p className="my-8">
        Tem certeza que deseja deletar o treino do dia{" "}
        <b>{formatDate(props.workout.date)}</b>?
      </p>

      <div className="flex justify-end mt-4 gap-4">
        <Button
          onClick={props.onClose}
          color="gray"
          variant="outlined"
          disabled={remove.isPending}
        >
          Cancelar
        </Button>

        <Button
          onClick={() => handleDelete(props.workout.id)}
          color="red"
          isLoading={remove.isPending}
        >
          Deletar
        </Button>
      </div>
    </Modal>
  );
}
