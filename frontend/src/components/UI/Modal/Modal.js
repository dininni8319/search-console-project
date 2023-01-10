import classes from "./Modal.module.css";
import { createPortal } from "react-dom";
import React, { useState, useContext } from 'react';
import { ConfigContext } from "context/Config/index";
import { useNavigate } from "react-router";
import { AuthContext } from "context/Auth/index";
import FormModal from '../FormModal';

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.closeModal}></div>;
};

const Overlay = (props) => {
  const { api_urls } = useContext(ConfigContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    num:'',
    start: '',
    end:''
  });

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
      <div className="text-md-center">
        <h3 className="fx-md-bold modal-title"> {props.title}</h3>
      </div>
       <FormModal 
          handleChange={props.handleChange}
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

