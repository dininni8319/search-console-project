import { useState,useEffect, useContext, useReducer, useCallback } from 'react';
import Flex from 'components/common/Flex';
import { ConfigContext } from "context/Config/index";
import { AuthContext } from "context/Auth/index";
import useApiRequest from '../../../store/useApiRequest';
import authReducer, { initialState } from '../../../store/apiReducer';
import MainLayout from 'layouts/MainLayout';
import { useNavigate } from "react-router";
import { getUrl } from "../../../utils";

const GoogleAuth = () => {
  const navigate = useNavigate();
  const { api_urls } = useContext(ConfigContext);
  const { user } = useContext(AuthContext);
  const [state, dispatch] = useReducer(authReducer, initialState);

  const params = {
    method: "GET",
    headers: { Authorization: `Bearer ${user?.token}`},
  }

  const [ analytics, setAnalytic ] = useState([]);
  const [formData, setFormData ] = useState('');

  const handleChange = (e) => {
    setFormData(e.target.value);
  }

  useEffect(() => {
    const paramsGet = {
      method: "GET",
      headers: 
      {  
        Authorization: `Bearer ${user?.token}`
      },
    }

    const site = getUrl(formData);
    fetch(`${api_urls.backend}/search/console/weekly_data/${site}`, paramsGet)
    .then(response => response.json())
    .then(data => {

      console.log(data, 'testing the data');

      if (data.success) {
        // navigate('/analytics_page');
  
      } else {
        // navigate('/');
      }
    }) 
  }, [formData])

  const handleDispatch = useCallback((action) => {
    dispatch(action)
  },[])

  const { makeRequest: getAllProjects } = useApiRequest(handleDispatch);

  useEffect(() => {
   
    getAllProjects(
      `${api_urls.backend}/search/console/all_projects`, 
      params
    );

  }, [getAllProjects])


  return (
    <>
     {/* pagina del dettagli delle analytics */}
      <MainLayout 
        data={state?.data} 
        handleChange={handleChange}
      >
      <Flex alignItems="center" justifyContent="between">
    
        <h1 className='bg-danger fs-1'>Congratulazione il tuo progetto è stato creato, Analitics Page</h1>
      </Flex>
     </MainLayout>
    </>
  );
};

export default GoogleAuth;
