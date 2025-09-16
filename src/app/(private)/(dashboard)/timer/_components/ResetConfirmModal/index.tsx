import { Button } from "@/components/lib/Button";
import { Modal } from "@/components/lib/Modal";
import { ModalProps } from "@/components/lib/Modal/types";

interface ResetConfirmModalProps extends Omit<ModalProps, "title" | "children"> {
  onSuccess: () => void;
}

export default function ResetConfirmModal(props: ResetConfirmModalProps) {
  const handleConfirm = () => {
    props.onSuccess();
  };

  return (
    <Modal
      {...props}
      title="Resetar Timer"
      subtitle="Seu timer será resetado "
      disableOverlayClick={false}
    >
      <p className="my-8">Deseja realmente resetar o timer?</p>

      <div className="flex justify-end mt-4 gap-4">
        <Button onClick={props.onClose} color="gray" variant="outlined">
          Cancelar
        </Button>

        <Button onClick={handleConfirm} color="red">
          Resetar
        </Button>
      </div>
    </Modal>
  );
}
