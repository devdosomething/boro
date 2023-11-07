import { FC } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";
import { config } from "../../config";

const Modal: FC<{
  isOpen: boolean;
  onClose: () => void;
  image: string | null;
}> = ({ isOpen, onClose, image }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button onClick={onClose} className={styles.closeButton}>
          Close
        </button>
        <img
          src={(config.PUBLIC_URL + image) as string}
          alt="Modal"
          width="500px"
        />
      </div>
    </div>,
    document.getElementById("portal") as HTMLElement
  );
};

export default Modal;
