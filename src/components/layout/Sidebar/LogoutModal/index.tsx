import { Button } from "@/components/lib/Button";
import { Modal } from "@/components/lib/Modal";
import { ModalProps } from "@/components/lib/Modal/types";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

interface LogoutModalProps extends Omit<ModalProps, "title" | "children"> {
  onSuccess: () => void;
}

export default function LogoutModal(props: LogoutModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    
    const response = await authClient.signOut();

    if (response.error) {
      setIsLoading(false);
      return;
    }

    props.onSuccess();
  };

  return (
    <Modal
      {...props}
      title={`Sair do Go Swim`}
      subtitle="Você será redirecionado para a página de login"
      disableOverlayClick={isLoading}
    >
      <p className="my-8">Tem certeza que deseja sair?</p>

      <div className="flex justify-end mt-4 gap-4">
        <Button
          onClick={props.onClose}
          color="gray"
          variant="outlined"
          disabled={isLoading}
        >
          Cancelar
        </Button>

        <Button onClick={handleLogout} isLoading={isLoading}>
          Sair
        </Button>
      </div>
    </Modal>
  );
}
