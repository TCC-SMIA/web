import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import api from '../../services/api';
import Card from '../../components/Card';
import IComplaint from '../../entities/Complaint';

import EmptyMyComplaintsSVG from '../../assets/empty-my-complaints.svg';

import { Container, Feed, EmptyContainer } from './styles';
import Loader from '../../components/Loader';

const MyComplaints: React.FC = () => {
  const [complaints, setComplaints] = useState([] as IComplaint[]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/complaints/mycomplaints`).then((response) => {
      setComplaints(response.data);
      setLoading(false);
    });
  }, []);

  return (
    <Container>
      {loading && <Loader />}
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
