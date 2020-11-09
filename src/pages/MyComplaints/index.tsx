import React, { useState, useEffect } from 'react';

import api from '../../services/api';
import Card from '../../components/Card';
import IComplaint from '../../entities/Complaint';

import { Container, Feed } from './styles';
import { useAuth } from '../../hooks/useAuth';

const MyComplaints: React.FC = () => {
  const [complaints, setComplaints] = useState([] as IComplaint[]);
  const { user } = useAuth();

  useEffect(() => {
    api
      .get(`/complaints/${user.id}`, { params: { take: 15 } })
      .then((response) => {
        setComplaints(response.data);
      });
  }, [user.id]);

  return (
    <Container>
      <Feed>
        {complaints?.map((complaint) => (
          <Card key={complaint.id} complaint={complaint} />
        ))}
      </Feed>
    </Container>
  );
};

export default MyComplaints;
