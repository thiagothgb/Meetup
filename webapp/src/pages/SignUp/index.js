import React from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { Content } from './styles';
import { singUpRequest } from '~/store/modules/auth/actions';
import logo from '~/assets/img/logo.png';

export default function SingUp() {
  const dispatch = useDispatch();

  const schema = Yup.object().shape({
    name: Yup.string().required('O campo nome completo é obrigatório'),
    email: Yup.string()
      .email('Email inválido')
      .required('O email é obrigatório'),
    password: Yup.string()
      .required('A senha é obrigatória')
      .min(5, 'A senha deve ter no mínimo 5 caracteres'),
  });

  function handleSubmit({ name, email, password }) {
    dispatch(singUpRequest(name, email, password));
  }

  return (
    <Content>
      <img src={logo} alt="MeetApp" />
      <Form onSubmit={handleSubmit} schema={schema}>
        <Input placeholder="Nome Completo" name="name" />
        <Input placeholder="Digite seu e-mail" name="email" type="email" />
        <Input
          placeholder="Sua senha secreta"
          type="password"
          name="password"
        />
        <button type="submit">Criar Conta</button>
      </Form>
      <Link to="/">Já tenho conta</Link>
    </Content>
  );
}
