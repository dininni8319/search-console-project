import classes from "./Modal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { createPortal } from "react-dom";
import React, { useState, useContext } from 'react';
import { ConfigContext } from "context/Config/index";
import { useNavigate } from "react-router";
import { AuthContext } from "context/Auth/index";
import FormModal from '../FormModal';
// import DatePicker from "react-datepicker";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.closeModal}></div>;
};

const Overlay = (props) => {
  const { api_urls } = useContext(ConfigContext);
  const { user } = useContext(AuthContext);
  const [checkValue, setCheckValue] = useState(false)
  const [formData, setFormData] = useState({
    num:'',
    start: '',
    end:''
  });
  
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    formData.site = props?.site;
    
    fetch(`${api_urls.backend}/google/search/console/analytics`, {
      method: "POST",
      headers: { 
        Authorization: `Bearer ${user?.token}`,
        "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {   
          props.setAnalytic({
            ...props.analytics,
            data
          })
          navigate("/analytics_page")
          props.closeModal()
        }
      });     
  };

  return (
    <div className={classes.modal}>
      <div className="text-center">
        {/* <FontAwesomeIcon icon={faSpinner} className="fa-1x text-main mx-1 text-success" /> */}
        <h3 className="fx-bold"> {props.title}</h3>
      </div>
      {/* <p>{props.message}</p> */}
       <FormModal 
          handleSubmit={handleSubmit}
          formData={formData}
          setFormData={setFormData}
          closeModal={props.closeModal}
       />
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

