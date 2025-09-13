import { Button } from "@/components/lib/Button";
import { Modal } from "@/components/lib/Modal";
import { ModalProps } from "@/components/lib/Modal/types";
import { useAuth } from "@/hooks/useAuth";

interface LogoutModalProps
  extends Omit<ModalProps, "title" | "children"> {
  onSuccess: () => void;
}

export default function LogoutModal(props: LogoutModalProps) {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout.mutate(undefined, {
      onSuccess: () => {
        props.onSuccess();
      },
    });
  };

  return (
    <Modal
      {...props}
      title={`Sair do Go Swim`}
      subtitle="Você será redirecionado para a página de login"
      disableOverlayClick={logout.isPending}
    >
      <p className="my-8">
        Tem certeza que deseja sair?
      </p>

      <div className="flex justify-end mt-4 gap-4">
        <Button
          onClick={props.onClose}
          color="gray"
          variant="outlined"
          disabled={logout.isPending}
        >
          Cancelar
        </Button>

        <Button
          onClick={handleLogout}
          isLoading={logout.isPending}
        >
          Sair
        </Button>
      </div>
    </Modal>
  );
}
