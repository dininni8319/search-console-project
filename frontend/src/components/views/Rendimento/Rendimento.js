import {
  useState,
  useEffect,
  useContext,
  useReducer,
  useCallback
} from 'react';
import { ConfigContext } from 'context/Config/index';
import { AuthContext } from 'context/Auth/index';
import useApiRequest from '../../../store/useApiRequest';
import authReducer, { initialState } from '../../../store/apiReducer';
import MainLayout from 'layouts/MainLayout';
import { useNavigate } from 'react-router';
import { getUrl } from '../../../utils';
import Modal from '../../UI/Modal/Modal';
import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import {
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import Saas from 'components/dashboard/saas';
import { useTranslation } from 'react-i18next';

const GoogleAuth = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { api_urls } = useContext(ConfigContext);
  const { user } = useContext(AuthContext);
  const [state, dispatch] = useReducer(authReducer, initialState);

  const params = {
    method: 'GET',
    headers: { Authorization: `Bearer ${user?.token}` }
  };
  const [isOpen, setIsOpen] = useState(false);
  const [analytics, setAnalytic] = useState({});
  const [formData, setFormData] = useState('');

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleChange = e => {
    setFormData(e.target.value);
  };

  const site = getUrl(formData);
  useEffect(() => {
    const paramsGet = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${user?.token}`
      }
    };

    fetch(`${api_urls.backend}/search/console/weekly_data/${site}`, paramsGet)
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setAnalytic({
            ...analytics,
            data
          });
        }
      });
  }, [formData]);

  const handleDispatch = useCallback(action => {
    dispatch(action);
  }, []);

  const { makeRequest: getAllProjects } = useApiRequest(handleDispatch);

  useEffect(() => {
    getAllProjects(`${api_urls.backend}/search/console/all_projects`, params);
  }, [getAllProjects]);

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
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        <Saas analytics={analytics} isOpen={isOpen} setIsOpen={setIsOpen} />
      </MainLayout>
      {isOpen && (
        <Modal
          closeModal={closeModal}
          title={t('custom_search')} 
          message="sel"
          confirmMessage={t("delete")}
          declineMessage={t("cancel")}
          site={site}
          setAnalytic={setAnalytic}
          analytics={analytics}
        />
      )}
    </>
  );
};

export default GoogleAuth;
