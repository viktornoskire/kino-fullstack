import AboutCard from '../about/AboutCard';
import Button from '../Button';
import Register from '../Register';
import Login from '../Login';
import { useState, FormEvent } from 'react';

const LoggedOut = () => {
  const [showLoginModal, setLoginModal] = useState<string>('hidden');
  const [showRegisterModal, setRegisterModal] = useState<string>('hidden');

  const resetForm = (event: FormEvent<HTMLFormElement>) => {
    const userForm = event.target as HTMLFormElement;
    userForm.reset();
  };

  const toggleModal = (modal: string) => {
    if (modal === 'login') {
      showLoginModal === 'hidden' ? setLoginModal('') : setLoginModal('hidden');
    } else if (modal === 'register') {
      showRegisterModal === 'hidden' ? setRegisterModal('') : setRegisterModal('hidden');
    }
  };
  return (
    <>
      <div className='max-w-6xl mx-auto bg-gradient-60 min-h-[100px] flex justify-center items-center rounded-lg'>
        <h1 className='text-2xl sm:text-5xl'>Member</h1>
      </div>
      <div className='grid grid-cols-2 gap-6 my-6 cursor-default'>
        <h2 className='text-2xl row-1'>
          Become a member today!{' '}
          <span
            className='underline text-s cursor-pointer'
            onClick={() => {
              toggleModal('register');
            }}>
            Register
          </span>
        </h2>
        <small
          className='row-2 mb-[-15px] cursor-pointer'
          onClick={() => {
            toggleModal('login');
          }}>
          Already a member? <span className='underline'>Login</span>
        </small>
        <Button
          type='button'
          className='row-3 text-s w-1/2'
          onClick={() => {
            toggleModal('register');
          }}>
          Register
        </Button>
        <p className='row-4'>
          Become a member for free and start saving instantly! Registration is quick and easy — just enter your name,
          email, and create a password. No payment needed. As a member, you’ll enjoy 10% off all ticket purchases,
          giving you more value every time you book. Sign up today and start enjoying exclusive savings with every
          cinema event!
        </p>
      </div>
      <Register showRegisterModal={showRegisterModal} onToggleModal={toggleModal} onResetForm={resetForm} />
      <Login showLoginModal={showLoginModal} onToggleModal={toggleModal} onResetForm={resetForm} />
      <div className='grid grid-cols-2 gap-5'>
        <AboutCard
          title="What's required from you!"
          description="Registering is quick, easy, and completely free. Simply provide your credentials, and create a password — no payment or credit card required. Once you sign up, you'll instantly unlock member benefits like 10% off all ticket purchases. Join in just a few clicks and start saving today!"
        />
        <AboutCard
          title='How you profit!'
          description="As a member, you enjoy exclusive benefits—most notably, 10% off all ticket purchases. It's a simple way to get more value, more experiences, and more entertainment — while spending less."
        />
        <div className='mt-[-25px]'>
          <AboutCard
            title='You are prioritized!'
            description='As a member, you get early access to events before they’re available to the public. Be the first to book tickets for popular movies, special screenings, and exclusive events — no more missing out. It’s just one more way your free membership puts you ahead of the crowd.'
          />
        </div>
        <div className='mt-[-25px]'>
          <AboutCard
            title='New feature!'
            description="We're excited to introduce a new feature: you can now leave reviews after seeing a movie! Share your thoughts, rate your experience, and help other moviegoers decide what to watch. Your feedback matters — and now it’s easier than ever to be heard. Just head to the movie page and leave your review!"
          />
        </div>
      </div>
    </>
  );
};

export default LoggedOut;
