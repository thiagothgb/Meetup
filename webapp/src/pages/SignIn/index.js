import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { Content } from './styles';
import { signInRequest } from '~/store/modules/auth/actions';
import logo from '~/assets/img/logo.png';

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  const schema = Yup.object().shape({
    email: Yup.string()
      .email('Email inválido')
      .required('O email é obrigatório'),
    password: Yup.string().required('A senha é obrigatória'),
  });

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <Content>
      <img src={logo} alt="MeetApp" />
      <Form onSubmit={handleSubmit} schema={schema}>
        <Input placeholder="Digite seu e-mail" name="email" type="email" />
        <Input
          placeholder="Sua senha secreta"
          type="password"
          name="password"
        />
        <button type="submit">{loading ? 'Autenticando...' : 'Entrar'}</button>
      </Form>
      <Link to="/register">Criar conta grátis</Link>
    </Content>
  );
}
