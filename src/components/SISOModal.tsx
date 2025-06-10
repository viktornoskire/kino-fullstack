import Register from './Register';
import Login from './Login';
import { FormEvent, useState, FC, useEffect } from 'react';

type Props = {
  show: string;
  onToggleModal: (modal: string) => void;
};

export const SISO: FC<Props> = ({ show, onToggleModal }) => {
  const [showLoginModal, setLoginModal] = useState<string>('hidden');
  const [showRegisterModal, setRegisterModal] = useState<string>('hidden');
  const [showLoggedInModal, setLoggedInModal] = useState<string>('hidden');
  const [showRegisteredModal, setRegisteredModal] = useState<string>('hidden');

  const resetForm = (event: FormEvent<HTMLFormElement>) => {
    const userForm = event.target as HTMLFormElement;
    userForm.reset();
  };

  useEffect(() => {
    // Automatically open modal based on `show` prop
    if (show === 'login') setLoginModal('');
    else if (show === 'register') setRegisterModal('');
  }, [show]);

  const toggleModal = (modal: string) => {
    if (modal === 'login') {
      if (showLoginModal === 'hidden') {
        setLoginModal('');
      } else {
        setLoginModal('hidden');
      }
    } else if (modal === 'register') {
      if (showRegisterModal === 'hidden') {
        setRegisterModal('');
      } else {
        setRegisterModal('hidden');
      }
    } else if (modal === 'logged in') {
      if (showLoggedInModal === 'hidden') {
        setLoggedInModal('');
      } else {
        setLoggedInModal('hidden');
      }
    } else if (modal === 'registered') {
      if (showRegisteredModal === 'hidden') {
        setRegisteredModal('');
      } else {
        setRegisteredModal('hidden');
      }
    }
    onToggleModal('');
  };

  return (
    <>
      <Register
        showRegisterModal={showRegisterModal}
        showRegisteredModal={showRegisteredModal}
        onToggleModal={toggleModal}
        onResetForm={resetForm}
      />
      <Login
        showLoginModal={showLoginModal}
        showLoggedInModal={showLoggedInModal}
        onToggleModal={toggleModal}
        onResetForm={resetForm}
      />
    </>
  );
};

export default SISO;
