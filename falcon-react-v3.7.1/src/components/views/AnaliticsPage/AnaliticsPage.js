import { useState,useEffect, useContext, useReducer, useCallback } from 'react';
// import Flex from 'components/common/Flex';
import { ConfigContext } from "context/Config/index";
import { AuthContext } from "context/Auth/index";
import useApiRequest from '../../../store/useApiRequest';
import authReducer, { initialState } from '../../../store/apiReducer';
import MainLayout from 'layouts/MainLayout';
import { useNavigate } from "react-router";
import { getUrl, getOptions, turnObjIntoArray } from "../../../utils";
import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import {
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers'
import Saas from 'components/dashboard/saas';

const GoogleAuth = () => {
  const navigate = useNavigate();
  const { api_urls } = useContext(ConfigContext);
  const { user } = useContext(AuthContext);
  const [state, dispatch] = useReducer(authReducer, initialState);

  const params = {
    method: "GET",
    headers: { Authorization: `Bearer ${user?.token}`},
  }

  const [ analytics, setAnalytic ] = useState({});
  
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

      if (data.success) {

        setAnalytic({
          ...analytics,
          data
        })
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

  echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LineChart,
    CanvasRenderer,
    LegendComponent
  ]);

  return (
    <>
     {/* pagina del dettagli delle analytics */}
      <MainLayout 
        data={state?.data} 
        handleChange={handleChange}
      >
        <Saas />
        {/* <div className='d-flex align-items-center justify-content-center class-custom-height'>
            <div className='bg-white p-1 shadow rounded-1 chart-custom-style'>
              <ReactEChartsCore
                echarts={echarts}
                option={getOptions(analytics?.data)}
                style={{ height: '16.25rem' }}
              />
            </div>

        </div> */}
     </MainLayout>
    </>
  );
};

export default GoogleAuth;
