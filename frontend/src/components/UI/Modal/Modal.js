import classes from "./Modal.module.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { createPortal } from "react-dom";
import DatePicker from "react-datepicker";
const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.closeModal}></div>;
};

const Overlay = (props) => {

  return (
    <div className={classes.modal}>
      <div className="text-center">
        <h3 className="fx-bold h2"> {props.title}</h3>
      </div>
      <p>{props.message}</p>
      <div className="mt-5 d-flex justify-content-between">
        <form>

           <DatePicker
             placeholderText="Seleziona una data di inzio"
           />
            <DatePicker
             placeholderText="Seleziona la data fine"
           />
        </form>


        <button
          className="btn btn-outline-success rounded-0 px-3 fw-bold"
          onClick={props.closeModal}
        >
          {props.declineMessage}
        </button>

        {/* <button
          className="btn btn-outline-danger rounded-0 px-3 fw-bold"
          // onClick={() => props.action()}
        >
          {props.confirmMessage}
        </button> */}
      </div>
    </div>
  );
};

const Modal = (props) => {
  return (
    <>
      {createPortal(
        <Backdrop closeModal={props.closeModal} />,
        document.getElementById("backdrop")
      )}
      {createPortal(<Overlay {...props} />, document.getElementById("overlay"))}
    </>
  );
};

export default Modal;

