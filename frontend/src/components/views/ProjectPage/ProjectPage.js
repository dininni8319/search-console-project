import {
  useState,
  useEffect,
  useContext,
  useReducer,
  useCallback
} from 'react';
import { Link } from 'react-router-dom';
import MainLayout from 'layouts/MainLayout';
import { ConfigContext } from 'context/Config/index';
import { AuthContext } from 'context/Auth/index';
import useApiRequest from '../../../store/useApiRequest';
import authReducer, { initialState } from '../../../store/apiReducer';
import { getUrl } from '../../../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

const ProjectPage = () => {
  const { t } = useTranslation();
  const { api_urls } = useContext(ConfigContext);
  const { user } = useContext(AuthContext);
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [site, setSite] = useState(0);

  const params = {
    method: 'GET',
    headers: { Authorization: `Bearer ${user?.token}` }
  };

  const handleDispatch = useCallback(action => {
    dispatch(action);
  }, []);

  const { makeRequest: getAllProjects } = useApiRequest(handleDispatch);

  useEffect(() => {
    getAllProjects(`${api_urls.backend}/search/console/all_projects`, params);
  }, [getAllProjects]);

  const handleDelete = async site => {
    try {
      const response = await fetch(
        `${api_urls.backend}/search/console/delete/${site.id}`,
        {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${user?.token}` }
        }
      );

      const data = await response.json();
      if (data.success) {
        let newSites = state.data.filter(project => project.id !== site.id);

        dispatch({ type: 'SUCCESS', data: newSites });
      } else {
        alert('error while fetching!');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MainLayout>
      <div className="d-md-flex flex-column align-items-center">
        <h3 className='text-center'>{t('entered_projects')}</h3>
        <ul className="col-12 col-md-6 col-lg-8 mt-3">
          {state?.data?.map(site => {
            return (
              <div className="bg-white">
                <li className="p-2 px-3 mt-2 shadow">
                  {getUrl(site)}
                  <FontAwesomeIcon
                    icon={faTrashAlt}
                    className={`fa-1x float-end text-danger custom-class-icon`}
                    onClick={() => handleDelete(site)}
                  />
                </li>
              </div>
            );
          })}
          <div className="text-center mt-3">
            {state.data.length === 0 && (
              <Link to="/landing_page">{t('create_project')}</Link>
            )}
          </div>
        </ul>
      </div>
    </MainLayout>
  );
};

export default ProjectPage;
