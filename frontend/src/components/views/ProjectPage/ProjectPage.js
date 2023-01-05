import { useState, useEffect, useContext,useReducer, useCallback } from "react";
import MainLayout from 'layouts/MainLayout';
import { ConfigContext } from "context/Config/index";
import { AuthContext } from "context/Auth/index";
import useApiRequest from '../../../store/useApiRequest';
import authReducer, { initialState } from '../../../store/apiReducer';
import { getUrl } from "../../../utils";

const ProjectPage = () => {
  
  const { api_urls } = useContext(ConfigContext);
  const { user } = useContext(AuthContext);
  const [state, dispatch] = useReducer(authReducer, initialState);
  const params = {
    method: "GET",
    headers: { Authorization: `Bearer ${user?.token}`},
  }
  
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
    <MainLayout>
      <div className='d-md-flex flex-column align-items-center'>
        <h3>Progetti inseriti</h3>
        <ul className='col-12 col-md-6 col-lg-8 mt-3'>
          {state?.data?.map(site => {
            return (
              <li className='bg-white p-2 px-3 mt-2 shadow'>{getUrl(site)}</li>
            )
          })}
        </ul>
      </div>
    </MainLayout>
  );
};

export default ProjectPage;
