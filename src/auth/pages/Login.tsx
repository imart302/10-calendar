import React, { useEffect, useRef } from 'react';
import './login.css';
import { useForm, Resolver } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { resetError, resetLogin, startLogin } from '../../store/auth';
import { ICreateUser, ILoginUser } from '../../types';
import { SimpleSpinner } from '../../ui/components/SimpleSpinner';
import { useAuthStore } from '../../hooks/useAuthStore';
import { startRegister } from '../../store/auth/thunks/startRegister';
import Swal from 'sweetalert2';

interface ILoginFormValues {
  email: string;
  password: string;
}

interface IRegisterFormValues {
  email: string;
  username: string;
  password: string;
  repeatPass: string;
}

export const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { auth } = useAuthStore();
  const loginContainer = useRef<HTMLDivElement | null>(null);
  const registerContainer = useRef<HTMLDivElement | null>(null);

  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    formState: loginFormState,
  } = useForm<ILoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const {
    register: registerRegister,
    handleSubmit: handleSubmitRegister,
    formState: registerFormState,
    reset: resetFormRegister,
  } = useForm<IRegisterFormValues>({
    defaultValues: {
      email: '',
      password: '',
      username: '',
      repeatPass: '',
    },
  });
  const onSubmitLogin = handleSubmitLogin((data) => {
    console.log(data);
    dispatch(startLogin(data as ILoginUser));
  });

  const onSubmitRegister = handleSubmitRegister((data) => {
    console.log(data);

    if (data.password !== data.repeatPass) {
      Swal.fire('Las contraseñas no coinciden');
      return;
    }

    const user: ICreateUser = {
      email: data.email,
      password: data.password,
      username: data.username,
    };

    dispatch(startRegister(user));
    resetFormRegister();
  });

  const handleSwitchToCreateAccount = () => {
    console.log('handleSwitchCreate');
    registerContainer.current?.classList.add('form-container-register-active');
    loginContainer.current?.classList.remove('form-container-login-active');
  };

  const handleSwitchToLogin = () => {
    console.log('handleSwitchLogin');
    registerContainer.current?.classList.remove(
      'form-container-register-active'
    );
    loginContainer.current?.classList.add('form-container-login-active');
  };

  useEffect(() => {
    if (auth.state === 'created') {
      Swal.fire('Usuario creado').then(() => {
        dispatch(resetLogin());
      });
    }

    if (auth.error) {
      if (auth.error.where === 'login') {
        Swal.fire('Email o password incorrectos').then(() => {
          dispatch(resetError());
        });
      }
    }
  }, [auth.state]);

  if (auth.state === 'renew') {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          justifyItems: 'center',
          alignContent: 'center',
          alignItems: 'center',
          height: '100%',
          marginTop: '40%'
        }}
      >
        <SimpleSpinner />
      </div>
    );
  }

  return (
    <div className="main-container">
      {/* LOGIN */}
      <div
        ref={loginContainer}
        className="form-container form-container-login form-container-login-active"
      >
        <h3>Ingreso</h3>
        <form onSubmit={onSubmitLogin}>
          <div className="form-group mb-2">
            <input
              {...registerLogin('email', {
                required: true,
                pattern:
                  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              })}
              type="text"
              className="form-control"
              placeholder="Correo"
            />
          </div>
          <div className="form-group mb-2">
            <input
              {...registerLogin('password', { required: true, minLength: 6 })}
              type="password"
              className="form-control"
              placeholder="Contraseña"
            />
          </div>
          <div className="form-group mb-2">
            {auth.state === 'creating' || auth.state === 'fetching' ? (
              <SimpleSpinner />
            ) : (
              <button type="submit" className="btn btn-primary btn-submit">
                Login
              </button>
            )}
          </div>
          <div className="form-group form-group-aux mb-2">
            <span>
              No tiene una cuenta{' '}
              <a href="#" onClick={handleSwitchToCreateAccount}>
                Crear una cuenta
              </a>
            </span>
          </div>
        </form>
      </div>

      {/* REGISTER */}
      <div
        ref={registerContainer}
        className="form-container form-container-register"
      >
        <h3>Registro</h3>
        <form onSubmit={onSubmitRegister}>
          <div className="form-group mb-2">
            <input
              {...registerRegister('username')}
              type="text"
              className="form-control"
              placeholder="Nombre"
            />
          </div>
          <div className="form-group mb-2">
            <input
              {...registerRegister('email', {
                required: true,
                pattern:
                  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              })}
              type="email"
              className="form-control"
              placeholder="Correo"
            />
          </div>
          <div className="form-group mb-2">
            <input
              {...registerRegister('password', {
                required: true,
                minLength: 6,
              })}
              type="password"
              className="form-control"
              placeholder="Contraseña"
            />
          </div>

          <div className="form-group mb-2">
            <input
              {...registerRegister('repeatPass', {
                required: true,
                minLength: 6,
              })}
              type="password"
              className="form-control"
              placeholder="Repita la contraseña"
            />
          </div>

          <div className="form-group mb-2">
            {auth.state === 'creating' || auth.state === 'fetching' ? (
              <SimpleSpinner />
            ) : (
              <button type="submit" className="btn btn-primary btn-submit">
                Crear Cuenta
              </button>
            )}
          </div>
          <div className="form-group form-group-aux mb-2">
            <span>Ya tiene cuenta? </span>
            <a href="#" onClick={handleSwitchToLogin}>
              Inicie sesion
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};
