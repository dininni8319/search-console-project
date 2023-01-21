import {
  useState,
  useEffect,
  useContext,
  useCallback,
  useReducer
} from 'react';
import { checkBoxInputs } from '../checkBoxInputs';
import { ConfigContext } from 'context/Config/index';
import { AuthContext } from 'context/Auth/index';
import useApiRequest from '../../../store/useApiRequest';
import authReducer, { initialState } from '../../../store/apiReducer';
import FormSelectComponent from '../FormSelectComponent';

const FormModal = ({
  handleChange,
  handleSubmit,
  formData,
  setFormData,
  closeModal
}) => {
  const [checked, setChecked] = useState([]);
  const [state, dispatch] = useReducer(authReducer, initialState);
  const { api_urls } = useContext(ConfigContext);
  const { user } = useContext(AuthContext);

  console.log(state, 'authreducer');
  const handleChecked = value => {
    if (checked?.length > 0) {
      setChecked([]);
    } else setChecked([value.concat(checked)]);
    setFormData({
      ...formData,
      num: value
    });
  };

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

  return (
    <form
      className="d-flex flex-column mt-2 align-items-center"
      onSubmit={handleSubmit}
    >
      <FormSelectComponent handleChange={handleChange} data={state?.data} />
      {checkBoxInputs?.map(inputs => {
        return (
          <div className="col-8 col-md-6 mb-1" key={inputs.id}>
            <input
              type="checkbox"
              className="mx-3 checkbox-round"
              // checked={checked?.filter(item => item.num === inputs.num)}
              checked={checked[0] === inputs?.num}
              onChange={e => {
                handleChecked(inputs?.num);
              }}
            />
            <label
              className="form-label fs-md-1 mt-1 mt-md-3 "
              htmlFor="userName"
            >
              {inputs?.description}
            </label>
          </div>
        );
      })}
      <div className="d-md-flex justify-content-around my-3 my-md-2">
        <div className="d-flex flex-column col-12 col-md-6">
          <label className="form-label text-center mt-2" htmlFor="userName">
            Data di inizio
          </label>
          <input
            type="date"
            className="date-input"
            value={formData.start}
            disabled={checked.length > 0}
            onChange={e => {
              setFormData({
                ...formData,
                start: e.target.value
              });
            }}
          />
        </div>
        <div className="col-12 col-md-6 d-flex flex-column">
          <label className="form-label text-center mt-2" htmlFor="userName">
            Data di fine
          </label>
          <input
            type="date"
            className="date-input"
            disabled={checked.length > 0}
            onChange={e => {
              setFormData({
                ...formData,
                end: e.target.value
              });
            }}
          />
        </div>
      </div>
      <div className="d-flex justify-content-between w-100 p-2">
        <button
          type="submit"
          onClick={closeModal}
          className="btn btn-secondary rounded-0 px-3 fw-bold"
        >
          Annula
        </button>
        <button
          type="submit"
          className="btn btn-secondary rounded-0 px-3 fw-bold"
        >
          Applica
        </button>
      </div>
    </form>
  );
};

export default FormModal;
