import React, { useState, useCallback } from 'react';

import { Container, Header, Option } from './styles';

const Report: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();

      const data = {
        title,
        description,
      };

      console.log(data);
    },
    [description, title],
  );

  const handleChangeTitle = useCallback((event) => {
    setTitle(event.target.value);
  }, []);

  const handleChangeDescription = useCallback((event) => {
    setDescription(event.target.value);
  }, []);

  return (
    <Container>
      <Header>
        <h1>Relatar</h1>
      </Header>
      <hr color="#d3d3d3" />
      <form>
        <Option>
          <p>Adicione a imagem</p>
          <button type="submit">Adicionar</button>
        </Option>

        <Option>
          <p>Localização</p>
          <input placeholder="" name="localizacao" />
        </Option>

        <Option>
          <p>Título do relato</p>
          <input
            onChange={(event) => handleChangeTitle(event)}
            placeholder=""
            name="titulo do relato"
          />
        </Option>

        <Option>
          <p>Deseja publicar como anônimo</p>
        </Option>

        <Option>
          <p>Descrição do relato</p>
        </Option>
        <textarea onChange={(event) => handleChangeDescription(event)} />

        <hr color="#d3d3d3" />
        <footer>
          <button type="submit" onClick={handleSubmit}>
            Publicar
          </button>
        </footer>
      </form>
    </Container>
  );
};

export default Report;
