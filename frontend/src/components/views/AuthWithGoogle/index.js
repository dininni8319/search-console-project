import Flex from 'components/common/Flex';
import Starter from 'components/pages/Starter';
import style from 'App.css';

const AuthWithGoogle = () => {
  return (
    <>
      {/* pagina per chi non ha effettuato il login con google */}
      <Flex alignItems="center" justifyContent="center">
        <div className="d-flex justify-content-center align-items-center class-custom-height">
          <Starter />
        </div>
      </Flex>
    </>
  );
};

export default AuthWithGoogle;
