export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  disableOverlayClick?: boolean;
  title?: string;
  subtitle?: string;
  children: ReactNode;
}