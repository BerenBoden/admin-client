import ReactDOM from "react-dom";
import {useEffect,ReactElement} from "react";

type ModalProps = {
  onClose: () => void;
  children: string;
  actionBar: ReactElement;
  };

function Main({onClose, children, actionBar}: ModalProps) {
    useEffect(() => {
        document.body.classList.add('overflow-hidden');
        return () => {
            document.body.classList.remove('overflow-hidden')
        }
    }, [])
    const modalContainer = document.querySelector("#modal-container");
    if (!modalContainer) return null;

  return ReactDOM.createPortal(
    <div>
      <div onClick={onClose} className="fixed inset-0 bg-gray-300 opacity-70 z-50"></div>
      <div className="fixed inset-80 p-10 bg-white z-[51]">
        <p>{children}</p>
        <div>{actionBar}</div>
      </div>
    </div>,
    modalContainer
  );
}

export default Main;
