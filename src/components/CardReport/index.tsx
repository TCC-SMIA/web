import React from 'react';

import {
  Container,
  Header,
  Option,
} from './styles';

const CardReport: React.FC = () => {
  return (
    <Container>
      <Header>
        <h1>Relatar</h1>
      </Header>
      <hr color='#d3d3d3' />
      <form>

        <Option>
          <p>Adicione a imagem</p>
          <button type="submit">Adicionar</button>
        </Option>

        <Option>
          <p>Localização</p>
          <input
            placeholder=""
            name="localizacao"
          />
        </Option>

        <Option>
          <p>Título do relato</p>
          <input
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
        <textarea></textarea>

        <hr color='#d3d3d3' />
        <footer>
          <button type="submit">Publicar</button>
        </footer>
      </form>
    </Container>
  );
};

export default CardReport;