import { getUrl } from "../../../utils";

const FormSelectComponent = ({ handleChange, data}) => {
  return ( 
    <div className="my-3">
    <select 
      className="form-select js-choice" 
      id="organizerSingle2" size="1" 
      required="required" 
      name="project" 
      data-options='{"removeItemButton":true,"placeholder":true}'
      required
      onChange={handleChange}
    >
      <option value="">Seleziona una proprietà.</option>
      {data?.map((site, id) => {
        return <option 
                  key={id} 
                  value={site}
                >{getUrl(site)}
                </option>
      })}
    </select>
  </div>
   );
}
 
export default FormSelectComponent;