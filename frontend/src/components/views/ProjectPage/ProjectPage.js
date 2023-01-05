import { useState, useEffect, useContext,useReducer, useCallback } from "react";
import MainLayout from 'layouts/MainLayout';
import { ConfigContext } from "context/Config/index";
import { AuthContext } from "context/Auth/index";
import useApiRequest from '../../../store/useApiRequest';
import authReducer, { initialState } from '../../../store/apiReducer';
import { getUrl } from "../../../utils";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const ProjectPage = () => {
  const { api_urls } = useContext(ConfigContext);
  const { user } = useContext(AuthContext);
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [site, setSite] = useState(0)

  const params = {
    method: "GET",
    headers: { Authorization: `Bearer ${user?.token}`},
  }
  
  const handleSite = (site) => {
    setSite(site);
  }
  const handleDispatch = useCallback((action) => {
    dispatch(action);
  },[])

  const { makeRequest: getAllProjects } = useApiRequest(handleDispatch);
  const { makeRequest: deleteProperty } = useApiRequest(handleDelete);
  
  const handleDelete = ( ) => {
    deleteProperty(
      `${api_urls.backend}/search/console/delete/${site}`, 
      params
    );
  }

  useEffect(() => {
    getAllProjects(
      `${api_urls.backend}/search/console/all_projects`, 
      params
    );
  }, [getAllProjects])

  return (
    <MainLayout>
      <div className='d-md-flex flex-column align-items-center'>
        <h3>Progetti inseriti</h3>
        <ul className='col-12 col-md-6 col-lg-8 mt-3'>
          {state?.data?.map(site => {
            return (
              <div className='bg-white'>
                <li className='p-2 px-3 mt-2 shadow'>{getUrl(site)}
                  <FontAwesomeIcon icon={faTrashAlt} className={`fa-1x float-end text-danger custom-class-icon`} onClick={() => handleDelete(site)} />
                </li>
              </div>
            )
          })}
        </ul>
      </div>
    </MainLayout>
  );
};

export default ProjectPage;
