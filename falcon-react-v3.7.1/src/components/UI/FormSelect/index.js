import { useEffect, useReducer, useContext, useCallback, useState } from 'react';
import { ConfigContext } from "context/Config/index";
import { getUrl } from '../../../utils';
import { AuthContext } from "context/Auth/index";
import useApiRequest from '../../../store/useApiRequest';
import authReducer, { initialState } from '../../../store/apiReducer';
import { useNavigate } from "react-router";

const FormSelect = () => {

  const [formData, setFormData ] = useState({project: ''});
  const [state, dispatch] = useReducer(authReducer, initialState);
  const { api_urls } = useContext(ConfigContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  console.log(state);
  const params = {
    method: "GET",
    headers: { Authorization: `Bearer ${user?.token}`},
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      project: e.target.value
    });
  }

  const handleDispatch = useCallback((action) => {
    dispatch(action)
  },[])
  
  const { makeRequest: fetchAllSites } = useApiRequest(handleDispatch);
  
  const handleSubmit = (event) => {
    event.preventDefault();

    const paramsPost = {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`},
      body: JSON.stringify(formData)
    }
    
    fetch(`${api_urls.backend}/search/console/new_project`, paramsPost)
      .then(resp => resp.json())
      .then(data => {

        if (data.success) {
          navigate('/analytics_page');
        } else {
          navigate('/home');

        }   
      })
  }

  useEffect(() => {
   
      fetchAllSites(
        `${api_urls.backend}/search/console/allsites`, 
        params
      );
  
  }, [fetchAllSites])

  return (
    <> 
      <form className="needs-validation col-11 col-md-6 mt-5 pt-5 d-flex flex-column bg-white p-5 shadow rounded" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="organizerSingle" className='h3 mb-3'>Seleziona il sito che desideri collegare</label>
          <select 
            className="form-select js-choice" 
            id="organizerSingle2" size="1" 
            required="required" 
            name="project" 
            data-options='{"removeItemButton":true,"placeholder":true}'
            onChange={handleChange}
            required
          >
            <option value="">Seleziona una proprietà.</option>
            {state?.data?.map((site, id) => {
              return <option key={id} value={site}>{getUrl(site)}</option>
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