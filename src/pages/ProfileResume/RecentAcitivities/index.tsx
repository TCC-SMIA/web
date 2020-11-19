import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';

import IComplaint from '../../../entities/Complaint';
import api from '../../../services/api';
import { RANDOM_COMPLAINT_IMAGE } from '../../../utils/constants';

import { Container, Title, ComplaintList, ComplaintItem } from './styles';

const RecentAcitivities: React.FC<{ user_id: string }> = ({ user_id }) => {
  const [complaints, setComplaints] = useState([] as IComplaint[]);

  useEffect(() => {
    api.get('/complaints', { params: { take: 15 } }).then((response) => {
      setComplaints(response.data);
    });
  }, []);

  return (
    <Container>
      <Title>Atividades Recentes</Title>
      <ComplaintList>
        {complaints.length > 0 &&
          complaints.map((complaint) => (
            <ComplaintItem key={complaint.id}>
              <img
                src={complaint.image_url || RANDOM_COMPLAINT_IMAGE}
                alt={complaint.title}
              />
              <div>
                <h1>{complaint.title}</h1>
                <p>{complaint.description}</p>
                <span>{format(new Date(complaint.date), 'dd/MM HH:mm')}</span>
              </div>
            </ComplaintItem>
          ))}
      </ComplaintList>
    </Container>
  );
};

export default RecentAcitivities;
