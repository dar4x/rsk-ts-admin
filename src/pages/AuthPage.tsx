import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import Rsk_Logo from '../assets/images/RSK_Bank_Logo.svg';
import Eye_Off from '/src/assets/images/eye-off-outline.svg';
import Eye_On from '../assets/images/eye-outline.svg';
import BackGr from '../assets/images/Авторизация_background.jpg';
import styles from './AuthPage.module.scss';
import { useAuthContext } from 'src/context/AuthContext';
import '../styles.scss';

export const AuthPage: React.FC = () => {
  const [eyeState, setEyeState] = React.useState(false);
  const [inputType, setInputType] = React.useState('password');
  const [labelEmailState, setLabelEmailState] = React.useState(false);
  const [labelPasswordState, setLabelPasswordState] = React.useState(false);

  const [ isSubmit, setIsSubmit ] = useState(false);

  const [isLogin, setIsLogin] = React.useState(true);
  const { register, login, user } = useAuthContext();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (isLogin) {
      login(data);
    } else {
      register(data);
    }
  };

  if (user) {
    return <Navigate replace to="/" />;
  }

  return (
    <div className={styles.auth_block}>
      <div className={styles.auth_block__img}>
        <img src={BackGr} />

        <div className={styles.auth_block__form}>
          <div className={styles.auth_block__form__child}>
            <div className={styles.logo}>
              <img src={Rsk_Logo} alt="" />
            </div>

            <div className={styles.logo__title}>
              Система электронных очередей
            </div>
            <form className={styles.auth__form} onSubmit={handleSubmit}>
              <input
                type="text"
                className={`${styles.auth__form__email} ${ isSubmit ? `${styles.submited}` : "" }`}
                name="username"
                placeholder='Username'
                onChange={(e) => {
                  e.target.value !== ''
                    ? setLabelEmailState(true)
                    : setLabelEmailState(false);
                }}
              />
              
              {/* {!isLogin ? (<></>):null} */}

              <input
                type={inputType}
                className={`${styles.auth__form__password} ${ isSubmit ? `${styles.submited}` : "" }`}
                name="password"
                placeholder='Password'
                onChange={(e) => {
                  e.target.value !== ''
                    ? setLabelPasswordState(true)
                    : setLabelPasswordState(false);
                }}
              />
              {eyeState ? (
                <div
                  className={styles.eye}
                  onClick={() => {
                    setEyeState(!eyeState);
                    setInputType('password');
                  }}
                >
                  <img src={Eye_Off} alt="" />
                </div>
              ) : (
                <div
                  className={styles.eye}
                  onClick={() => {
                    setEyeState(!eyeState);
                    setInputType('text');
                  }}
                >
                  <img src={Eye_On} alt="" />
                </div>
              )}
              <div className={styles.block__of__a}>
                {/* <Link
                  to={'/auth'}
                  className={styles.forgot__password__second}
                  onClick={(e) => setIsLogin(!isLogin)}
                >
                  {isLogin ? 'Зарегистрироваться' : 'Уже есть аккаунт?'}
                </Link> */}
                <Link to={'/auth'} className={styles.forgot__password}>
                  Забыли пароль?
                </Link>
              </div>
              <button onClick={() => setIsSubmit(true)} className={`${styles.auth__form__btn} ${ isSubmit ? `${styles.clicked}` : "" } `}>
                {isLogin ? 'Войти' : 'Регистрация'}
              </button>
              { isSubmit ? (
                <>
                  <div className={styles.jumping_dots_loader}> <span></span> <span></span> <span></span> </div>
                  <div className={styles.moving_gradient}></div>
                </>
              ) : (null) }
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// import React, { useState } from 'react';
// import axios from 'axios';

// interface UserData {
//   name: string;
//   email: string;
//   Другие поля пользователя
// }

// const ChangeUserData: React.FC = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');

//   const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setName(event.target.value);
//   };

//   const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setEmail(event.target.value);
//   };

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     const userData: UserData = {
//       name,
//       email,
//       Другие поля пользователя
//     };

//     try {
//       const response = await axios.patch('https://api.example.com/user/users/me', userData);
//       console.log('Данные пользователя успешно изменены:', response.data);
//     } catch (error) {
//       console.error('Ошибка при изменении данных пользователя:', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Имя:
//         <input type="text" value={name} onChange={handleNameChange} />
//       </label>
//       <br />
//       <label>
//         Email:
//         <input type="email" value={email} onChange={handleEmailChange} />
//       </label>
//       <br />
//       {/* Другие поля для изменения данных */}
//       <button type="submit">Изменить данные</button>
//     </form>
//   );
// };

// export default ChangeUserData;
