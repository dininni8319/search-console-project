import classes from "./Modal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { createPortal } from "react-dom";
import React, { useState, useContext } from 'react';
import { ConfigContext } from "context/Config/index";
import { useNavigate } from "react-router";
import { AuthContext } from "context/Auth/index";
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

  console.log(formData, props?.site, 'testing the form data');

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

        <form className="d-flex flex-column mt-2 align-items-center" onSubmit={handleSubmit}>
          <div className="col-md-5 mb-2">
            <input 
                type='checkbox'  
                className='mx-3 checkbox-round' 
                // checked={checkValue}
                onChange={(e) => {
                  // setCheckValue(!checkValue)
                  setFormData({
                    ...formData,
                    num: '7'
                })
            }}/>
            <label className="form-label fs-1" htmlFor="userName">Ultimi 7 giorni</label>
          </div>
          <div className="col-md-5 mb-2">
            <input 
              type='checkbox'  
              className='mx-3 checkbox-round'
              /*  value={date} */ 
              onChange={(e) => {
                setFormData({
                  ...formData,
                  num: '28'
                })
              }}
            />
            <label className="form-label fs-1" htmlFor="userName">Ultimi 28 giorni</label>
          </div>
          <div className="col-md-5 mb-2">
            <input 
              type='checkbox'  
              className='mx-3 checkbox-round'
              /*  value={date} */ 
              onChange={(e) => {
                setFormData({
                  ...formData,
                  num: '3'
                })   
              }}
            />
            <label className="form-label fs-1" htmlFor="userName">Ultimi 3 mesi</label>

          </div>
          <div className="col-md-5 mb-2">
            <input 
              type='checkbox'  
              className='mx-3 checkbox-round'
              /*  value={date} */ 
              onChange={(e) => {
                setFormData({
                  ...formData,
                  num: '6'
                })   
              }}
            />
            <label className="form-label fs-1" htmlFor="userName">Ultimi 6 mesi</label>
          </div>

          <div className="col-md-5 mb-2">
            <input 
              type='checkbox'  
              className='mx-3 checkbox-round'
              /*  value={date} */ 
              onChange={(e) => {
                setFormData({
                  ...formData,
                  num: '12'
                })   
              }}
            />
            <label className="form-label fs-1" htmlFor="userName">Ultimi 12 mesi</label>

          </div>
          <div className="col-md-5 mb-2">
            <input 
              type='checkbox'  
              className='mx-3 checkbox-round'
              /*  value={date} */ 
              onChange={(e) => {
                setFormData({
                  ...formData,
                  num: '16'
                })   
              }} 
            />
            <label className="form-label fs-1" htmlFor="userName">Ultimi 16 mesi</label>

          </div>
          <div className='d-flex justify-content-around my-2'>
            <div className="col-12 col-md-6">
                <label className="form-label" htmlFor="userName">Data di inizio</label>
                <input
                  type='date'  
                  className='date-input'
                  value={formData.start}  
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      start: e.target.value
                    })   
                  }}
                />
            </div>
            <div className="d-flex flex-column col-12 col-md-6">
              <label className="form-label" htmlFor="userName">Data di fine</label>
              <input
                type='date'
                className='date-input'
                onChange={(e) => {
                setFormData({
                  ...formData,
                  end: e.target.value
                })   
              }}
              />
            </div>
          </div>
          <div className='d-flex justify-content-between w-100 p-2'>
            <button
                type="submit"
                onClick={props.closeModal}
                className="btn btn-secondary rounded-0 px-3 fw-bold"
            >
              Annula
            </button>
            <button
              type="submit"
              className="btn btn-secondary rounded-0 px-3 fw-bold"
            >
              Applica
            </button>
          </div>
          </form>
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

