import React from 'react';

import { ResumeContainer, ResumeItem } from './styles';

interface IResumeQuantity {
  all: number;
  inProgress: number;
  resolved: number;
}

const Resume: React.FC<IResumeQuantity> = ({ all, inProgress, resolved }) => {
  return (
    <ResumeContainer>
      <ResumeItem>
        <span>{all}</span>
        <h2>Denûncias reportadas</h2>
      </ResumeItem>
      <ResumeItem>
        <span>{inProgress}</span>
        <h2>Denûncias sendo resolvidas</h2>
      </ResumeItem>
      <ResumeItem>
        <span>{resolved}</span>
        <h2>Denûncias resolvidas</h2>
      </ResumeItem>
    </ResumeContainer>
  );
};

export default Resume;
