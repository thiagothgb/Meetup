import React from 'react';
import history from '~/services/history';
import { Container } from './styles';

export default function NotFound() {
  return (
    <Container>
      <p>Página não encontrada ou link quebrado</p>
      <p>:(</p>
      <button type="button" onClick={() => history.push('/')}>
        Voltar
      </button>
    </Container>
  );
}
