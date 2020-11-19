import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import IUser from '../../entities/User';
import api from '../../services/api';
import { RANDOM_AVATAR } from '../../utils/constants';
import RecentAcitivities from './RecentAcitivities';

import {
  Container,
  AvatarContainer,
  ResumeContainer,
  ResumeItem,
} from './styles';

interface IResume {
  user: IUser;
  complaints_reported: number;
  complaints_in_progress: number;
  complaints_resolved: number;
}

const ProfileResume: React.FC = () => {
  const [resume, setResume] = useState({} as IResume);
  const { id } = useParams();

  useEffect(() => {
    api
      .get('/users/profile/resume', { params: { user_id: id } })
      .then((response) => {
        setResume(response.data);
      });
  }, [id]);

  return (
    <Container>
      {resume.user && (
        <>
          <AvatarContainer>
            <img
              src={resume.user.avatar_url || RANDOM_AVATAR}
              alt={resume.user.name}
            />
            <h1>{resume.user.name || resume.user.nickname}</h1>
          </AvatarContainer>
          <ResumeContainer>
            <ResumeItem>
              <span>{resume.complaints_reported}</span>
              <h2>Denûncias reportadas</h2>
            </ResumeItem>
            <ResumeItem>
              <span>{resume.complaints_in_progress}</span>
              <h2>Denûncias sendo resolvidas</h2>
            </ResumeItem>
            <ResumeItem>
              <span>{resume.complaints_resolved}</span>
              <h2>Denûncias resolvidas</h2>
            </ResumeItem>
          </ResumeContainer>
          <RecentAcitivities user_id={id} />
        </>
      )}
    </Container>
  );
};

export default ProfileResume;
