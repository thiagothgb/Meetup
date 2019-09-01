import React from 'react';

import { FaSpinner } from 'react-icons/fa';
import { Container } from './styles';

export default function Loading() {
  return (
    <Container>
      <FaSpinner color="rgba(255,255,255,0.6)" size={40} />
      <strong>Carregando dados...</strong>
    </Container>
  );
}
