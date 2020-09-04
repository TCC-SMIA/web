import React, { useState, useEffect } from 'react';

import { Container, Feed } from './styles';
import api from '../../services/api';
import Card from '../../components/Card';
import IComplaint from '../../entities/Complaint';
import Header from '../../components/Header';

const Dashboard: React.FC = () => {
  const [complaints, setComplaints] = useState([] as IComplaint[]);

  useEffect(() => {
    api.get('/complaints').then((response) => {
      setComplaints(response.data);
    });
  }, [complaints]);

  return (
    <Container>
      <Header />
      <Feed>
        {complaints?.map((complaint) => (
          <Card key={complaint.id} complaint={complaint} />
        ))}
      </Feed>
    </Container>
  );
};

export default Dashboard;
