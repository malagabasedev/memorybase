import { createPortal } from "react-dom";
import "../styles/Modal.css";

export function Modal({ children, isVisible = false, styles }) {
  const modalBackground = <div className="modal_bg"></div>;
  const modalStyles = styles ? `modal ${styles}` : "modal";

  return (
    isVisible &&
    createPortal(
      <>
        <div className={modalStyles}>{children}</div>
        {modalBackground}
      </>,
      document.body
    )
  );
}
