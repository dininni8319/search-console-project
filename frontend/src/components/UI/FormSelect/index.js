import {
  useEffect,
  useReducer,
  useContext,
  useCallback,
  useState
} from 'react';
import { ConfigContext } from 'context/Config/index';
import { getUrl } from '../../../utils';
import { AuthContext } from 'context/Auth/index';
import useApiRequest from '../../../store/useApiRequest';
import authReducer, { initialState } from '../../../store/apiReducer';
import FormHeader from 'components/UI/FormSelect/FormHeader';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

const FormSelect = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ project: '' });
  const [state, dispatch] = useReducer(authReducer, initialState);
  const { api_urls } = useContext(ConfigContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const params = {
    method: 'GET',
    headers: { Authorization: `Bearer ${user?.token}` }
  };

  const handleChange = e => {
    setFormData({
      ...formData,
      project: e.target.value
    });
  };

  const handleDispatch = useCallback(action => {
    dispatch(action);
  }, []);

  const { makeRequest: fetchAllSites } = useApiRequest(handleDispatch);

  const handleSubmit = event => {
    event.preventDefault();

    const paramsPost = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user?.token}`
      },
      body: JSON.stringify(formData)
    };

    fetch(`${api_urls.backend}/search/console/new_project`, paramsPost)
      .then(resp => resp.json())
      .then(data => {
        if (data.success) {
          navigate('/analytics_page');
        } else {
          navigate('/home');
        }
      });
  };

  useEffect(() => {
    fetchAllSites(`${api_urls.backend}/search/console/allsites`, params);
  }, [fetchAllSites]);

  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <FormHeader title={t('Select')} />
      <form
        className="needs-validation col-11 col-md-8 mt-3 pt-5 d-flex flex-column bg-white px-3 shadow rounded"
        onSubmit={handleSubmit}
      >
        <label htmlFor="organizerSingle" className="h4 mb-3">
          {state.data.length > 0 ? t('select_property') : t('no_property')}
        </label>
        <div className="row">
          <div className="mb-3 col-12 col-md-9">
            <select
              className="form-select-custom col-12"
              id="organizerSingle2"
              size="1"
              required="required"
              name="project"
              data-options='{"removeItemButton":true,"placeholder":true}'
              onChange={handleChange}
              required
            >
              <option value="">{t('select')}</option>
              {state?.data?.map((site, id) => {
                return (
                  <option key={id} value={site}>
                    {getUrl(site)}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-12 col-md-3 py-2 py-md-0">
            <button
              className="btn btn-primary text-small mx-md-2 col-12"
              type="submit"
            >
              {t('connect')}
            </button>
          </div>
        </div>
        {/* {state.data && <span className='text-danger'>{state.data.message}</span>} */}
      </form>
    </div>
  );
};

export default FormSelect;
