import React, { useCallback } from 'react';
import { toast } from 'react-toastify';

import api from '../../../services/api';
import Loader from '../../Loader';

import { Container } from './styles';

const Modal: React.FC<{ show: string; close: any }> = ({ show, close }) => {
  const [loading, setLoading] = React.useState(false);

  const handleDeleteComplaint = useCallback(() => {
    try {
      setLoading(true);
      api
        .delete('/complaints/delete', { params: { complaint_id: show } })
        .then(() => {
          close('');
          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
      toast.error('Não foi possível apagar a denúncia.');
    }
  }, [show, close]);

  return (
    <>
      {show && (
        <Container>
          <section>
            <h1>Você tem certeza que deseja apagar a denuncia?</h1>
            <div>
              <button type="submit" onClick={handleDeleteComplaint}>
                {loading && <Loader />}
                {!loading && 'Sim'}
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
