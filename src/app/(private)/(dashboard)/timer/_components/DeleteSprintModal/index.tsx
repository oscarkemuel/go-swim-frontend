import { Button } from "@/components/lib/Button";
import { Modal } from "@/components/lib/Modal";
import { ModalProps } from "@/components/lib/Modal/types";
import { Sprint } from "@/models/Workout";
import { formatTime } from "@/utils";

interface DeleteSprintModalProps extends Omit<ModalProps, "title" | "children"> {
  handleConfirm: () => void;
  sprint: Sprint;
}

export default function DeleteSprintModal(props: DeleteSprintModalProps) {
  return (
    <Modal
      {...props}
      title="Remover sprint"
      subtitle="Você está prestes a remover este sprint"
      disableOverlayClick={false}
    >
      <div className="my-8">
        <p>Deseja realmente remover este sprint?</p>
        <p><u>Tempo atual</u>: <b>{formatTime(props.sprint.timeInSeconds!)}</b></p>
        <p><u>Distância atual</u>: <b>{props.sprint.meters} metros</b></p>
      </div>

      <div className="flex justify-end mt-4 gap-4">
        <Button onClick={props.onClose} color="gray" variant="outlined">
          Cancelar
        </Button>

        <Button onClick={props.handleConfirm} color="red">
          Remover
        </Button>
      </div>
    </Modal>
  );
}
