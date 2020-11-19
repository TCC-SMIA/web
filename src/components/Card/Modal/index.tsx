import React, { useCallback } from 'react';
import api from '../../../services/api';

import { Container } from './styles';

const Modal: React.FC<{ show: string; close: any }> = ({ show, close }) => {
  const handleDeleteComplaint = useCallback(() => {
    api
      .delete('/complaints/delete', { params: { complaint_id: show } })
      .then(() => {
        close('');
      });
  }, [show, close]);

  return (
    <>
      {show && (
        <Container>
          <section>
            <h1>Você tem certeza que deseja apagar a denuncia?</h1>
            <div>
              <button type="submit" onClick={handleDeleteComplaint}>
                Sim
              </button>
              <button type="submit" onClick={() => close('')}>
                Não
              </button>
            </div>
          </section>
        </Container>
      )}
    </>
  );
};

export default Modal;
