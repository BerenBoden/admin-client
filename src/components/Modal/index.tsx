import { Dialog } from "../../base-components/Headless";
import Button from "../../base-components/Button";
import Lucide from "../../base-components/Lucide";

function Main({
  handleSubmit,
  confirmationModal,
  setConfirmationModal,
  icon,
  question,
  information,
  buttonText,
  buttonType,
}: any) {
  return (
    <Dialog
      open={confirmationModal}
      onClose={() => {
        setConfirmationModal(!confirmationModal);
      }}
    >
      <Dialog.Panel>
        <div className="p-5 text-center">
          <Lucide icon={icon} className="w-16 h-16 mx-auto mt-3 text-danger" />
          <div className="mt-5 text-3xl">{question}</div>
          <div className="mt-2 text-slate-500">{information}</div>
        </div>
        <div className="px-5 pb-8 text-center">
          <Button
            variant="secondary"
            type="button"
            onClick={() => {
              setConfirmationModal(!confirmationModal);
            }}
            className="w-24 mr-1"
          >
            Cancel
          </Button>
          <Button
            variant={buttonType}
            type="button"
            className="w-24"
            onClick={handleSubmit}
          >
            {buttonText}
          </Button>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}

export default Main;
