import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { useParams, useNavigate } from 'react-router';

import IComplaint from '../../../entities/Complaint';
import api from '../../../services/api';
import { RANDOM_COMPLAINT_IMAGE } from '../../../utils/constants';

import { Container, Title, ComplaintList, ComplaintItem } from './styles';

const RecentAcitivities: React.FC = () => {
  const [complaints, setComplaints] = useState([] as IComplaint[]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    api
      .get('/complaints/activities/resume', { params: { user_id: id } })
      .then((response) => {
        setComplaints(response.data);
      });
  }, [id]);

  return (
    <Container>
      <Title>Atividades Recentes</Title>
      <ComplaintList>
        {complaints.length > 0 &&
          complaints.map((complaint) => (
            <ComplaintItem
              key={complaint.id}
              onClick={() => navigate(`/complaint/${complaint.id}`)}
            >
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
