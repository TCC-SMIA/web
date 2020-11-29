import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Button from '../../components/Button';
import Resume from '../../components/Resume';
import IResume from '../../entities/Resume';
import { useAuth } from '../../hooks/useAuth';

import api from '../../services/api';
import { RANDOM_AVATAR } from '../../utils/constants';
import RecentAcitivities from './RecentAcitivities';

import { Container, AvatarContainer, ChatButtonContainer } from './styles';

interface ICreateChatRequestParams {
  contact_id: string;
}

const ProfileResume: React.FC = () => {
  const [resume, setResume] = useState({} as IResume);
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get('/users/profile/resume', { params: { user_id: id } })
      .then((response) => {
        setResume(response.data);
      });
  }, [id]);

  const handleCreateChatWithReporter = useCallback(
    (user_id) => {
      api
        .post('/chats', {
          contact_id: user_id,
        } as ICreateChatRequestParams)
        .then(() => {
          navigate('/messages');
        });
    },
    [navigate],
  );

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
          <Resume
            all={resume.complaints_reported}
            inProgress={resume.complaints_in_progress}
            resolved={resume.complaints_resolved}
          />
          {user.id !== resume.user.id && (
            <ChatButtonContainer>
              <Button
                onClick={() => handleCreateChatWithReporter(resume.user.id)}
              >
                Entrar em contato
              </Button>
            </ChatButtonContainer>
          )}

          <RecentAcitivities />
        </>
      )}
    </Container>
  );
};

export default ProfileResume;
