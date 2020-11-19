import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import api from '../../services/api';
import Card from '../../components/Card';
import IComplaint from '../../entities/Complaint';

import EmptyMyComplaintsSVG from '../../assets/empty-my-complaints.svg';

import { Container, Feed, EmptyContainer } from './styles';
import Loader from '../../components/Loader';
import Resume from '../../components/Resume';
import { useAuth } from '../../hooks/useAuth';
import IResume from '../../entities/Resume';

const MyComplaints: React.FC = () => {
  const [complaints, setComplaints] = useState([] as IComplaint[]);
  const [resume, setResume] = useState({} as IResume);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    api
      .get('/users/profile/resume', { params: { user_id: user.id } })
      .then((response) => {
        setResume(response.data);
      });
  }, [user]);

  useEffect(() => {
    api.get(`/complaints/mycomplaints`).then((response) => {
      setComplaints(response.data);
      setLoading(false);
    });
  }, []);

  return (
    <Container>
      {loading && <Loader />}
      <Resume
        all={resume.complaints_reported}
        inProgress={resume.complaints_in_progress}
        resolved={resume.complaints_resolved}
      />
      {complaints.length === 0 && !loading && (
        <EmptyContainer>
          <h2>Você ainda não criou relatos.</h2>
          <img src={EmptyMyComplaintsSVG} alt="Lista de mensagens vazia" />
          <Link to="/report">Criar relato</Link>
        </EmptyContainer>
      )}
      {complaints.length > 0 && !loading && (
        <Feed>
          {complaints?.map((complaint) => (
            <Card key={complaint.id} complaint={complaint} />
          ))}
        </Feed>
      )}
    </Container>
  );
};

export default MyComplaints;
