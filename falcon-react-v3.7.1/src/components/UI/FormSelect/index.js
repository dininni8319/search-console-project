import { useState, useEffect, useContext, useCallback } from 'react';
import { ConfigContext } from "context/Config/index";
import { getUrl } from '../../../utils';
import { AuthContext } from "context/Auth/index";
import useApiRequest from '../../../store/useApiRequest';

const FormSelect = () => {
  
  const { api_urls } = useContext(ConfigContext);
  const { user } = useContext(AuthContext);

  const params = {
    method: "GET",
    headers: { Authorization: `Bearer ${user?.token}`},
  }
  
  const { state, makeRequest: fetchAllSites} = useApiRequest( 
    `${api_urls.backend}/search/console/allsites`, 
    params
  )

  const handleRequest = useCallback(() => {
    fetchAllSites()
  },[])
  
  useEffect(() =>{
    handleRequest();
  }, [handleRequest])

  return (
    <> 
      <form className="needs-validation col-11 col-md-6 mt-5 pt-5 d-flex flex-column bg-white p-5 shadow rounded">
        <div className="mb-3">
          <label htmlFor="organizerSingle" className='h3 mb-3'>Seleziona il sito che desideri collegare</label>
          <select className="form-select js-choice" id="organizerSingle2" size="1" required="required" name="organizerSingle" data-options='{"removeItemButton":true,"placeholder":true}'>
            <option value="">Seleziona una proprietà.</option>
            {state?.data.map((site, id) => {
              return <option key={id}>{getUrl(site)}</option>
            })}
          </select>
        </div>
        <button className="btn btn-primary mb-3" type="submit">Submit form</button>
        {/* {state.data && <span className='text-danger'>{state.data.message}</span>} */}
      </form>
    </>
   );
}
 
export default FormSelect;