import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";
import CabinTable from "./CabinTable";

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens={"new-cabin-form"}>
          <Button>Add a new Cabin</Button>
        </Modal.Open>

        <Modal.Window name="new-cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddCabin;
