import { useState } from "react";
import { checkBoxInputs } from "../checkBoxInputs";
  const FormModal = ({ handleSubmit, formData, setFormData , closeModal}) => {
  const [ checked, setChecked ] = useState([]);

  const handleChecked = (value) => {
    //  if (checked?.length > 0) {
    //   setChecked([]);
    //  } else 
       setChecked([...value])
       setFormData({
         ...formData,
         num: value
       });
  
    }
  
  return ( 
    <form className="d-flex flex-column mt-2 align-items-center" onSubmit={handleSubmit}>
     
     {checkBoxInputs?.map((inputs, id) => {
       return (
        <div className="col-md-5 mb-2" key={id}>
          <input 
              type='checkbox'  
              className='mx-3 checkbox-round'
              checked={checked[0] === inputs?.num}
              onChange={(e) => {
                handleChecked(inputs?.num
              )
          }}/>
        <label className="form-label fs-1 mt-3" htmlFor="userName">{inputs?.description}</label>
      </div>
       );
     })}
    <div className='d-flex justify-content-around my-2'>
      <div className="col-12 col-md-6">
          <label className="form-label" htmlFor="userName">Data di inizio</label>
          <input
            type='date'  
            className='date-input'
            value={formData.start}  
            disabled={checked.length > 0}
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
          disabled={checked.length > 0}
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
          onClick={closeModal}
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
   );
}
 
export default FormModal;