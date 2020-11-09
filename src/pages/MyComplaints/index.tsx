import React, { useState, useEffect } from 'react';

import api from '../../services/api';
import Card from '../../components/Card';
import IComplaint from '../../entities/Complaint';

import { Container, Feed } from './styles';

const MyComplaints: React.FC = () => {
  const [complaints, setComplaints] = useState([] as IComplaint[]);

  useEffect(() => {
    api.get(`/complaints/mycomplaints`).then((response) => {
      setComplaints(response.data);
    });
  }, []);

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
