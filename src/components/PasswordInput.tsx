import { useState, useMemo } from 'react';
import { FC } from 'react';

type Props = {
  resetError: () => void;
};

const PasswordInput: FC<Props> = ({ resetError }) => {
  const [password, setPassword] = useState<string>('');

  const checkStrength = (password: string) => {
    const requirements = [
      { regex: /.{8,}/, text: 'At least 8 characters' },
      { regex: /[0-9]/, text: 'At least 1 number' },
      { regex: /[a-z]/, text: 'At least 1 lowercase letter' },
      { regex: /[A-Z]/, text: 'At least 1 uppercase letter' },
      { regex: /[^A-Za-z0-9]/, text: 'At least 1 special character' },
    ];

    return requirements.map(req => {
      return {
        met: req.regex.test(password),
        text: req.text,
      };
    });
  };

  const strength = checkStrength(password);

  const passwordStrength = useMemo(() => {
    return strength.filter(req => req.met).length;
  }, [strength]);

  const getStrengthColor = (score: number) => {
    if (score === 0) return 'bg-gray-500';
    if (score < 2) return 'bg-red-500';
    if (score <= 2) return 'bg-amber-300';
    if (score <= 4) return 'bg-green-400';
    return 'bg-green-800';
  };

  const getStrengthText = (score: number) => {
    if (score === 0) return 'Enter password';
    if (score < 2) return 'Very Weak';
    if (score <= 2) return 'Weak';
    if (score <= 4) return 'Strong';
    return 'Very Strong';
  };

  return (
    <div className='flex flex-col'>
      <input
        onChange={e => {
          setPassword(e.target.value);
          resetError();
        }}
        type='password'
        placeholder='password...'
        name='password'
        className='w-full p-3 bg-neutral-900 rounded-lg text-white mb-4 outline-none focus:ring-2 border-2 border-s-gray-300'
        autoComplete='new-password'
        required
      />
      <div className='h-1 w-full bg-gray-200 rounded-full overflow-hidden'>
        <div
          className={`h-full ${getStrengthColor(passwordStrength)}`}
          style={{ width: `${(passwordStrength / 5) * 100}%` }}></div>
      </div>
      <small className='text-right'>{getStrengthText(passwordStrength)}</small>
    </div>
  );
};

export default PasswordInput;
