import FormSelect from 'components/UI/FormSelect';
import { useLocation } from 'react-router-dom';
import MainLayout from 'layouts/MainLayout';

const LandingPage = () => {
  return (
    <MainLayout>
      <FormSelect />
    </MainLayout>
  );
};

export default LandingPage;
