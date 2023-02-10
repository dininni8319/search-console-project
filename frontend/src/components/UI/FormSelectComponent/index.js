import { getUrl } from '../../../utils';
import { useTranslation } from 'react-i18next';

const FormSelectComponent = ({ handleChange, data }) => {
  const { t } = useTranslation();

  return (
    <div className="my-3">
      <select
        className="form-select js-choice"
        id="organizerSingle2"
        size="1"
        required="required"
        name="project"
        data-options='{"removeItemButton":true,"placeholder":true}'
        required
        onChange={handleChange}
      >
        <option value="">{t('select')}</option>
        {data?.map((site, id) => {
          return (
            <option key={id} value={site}>
              {getUrl(site)}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormSelectComponent;
