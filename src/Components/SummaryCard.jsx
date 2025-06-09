import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  flex: 1;
  padding: 1.5rem;
  border-radius: 8px;
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  background: rgba(255, 255, 255, 0.6);
`;

const Label = styled.div`
  font-family: 'Lexend', sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: #0052CC;
  margin-bottom: 0.5rem;
`;

const Number = styled.div`
  font-family: 'Lexend', sans-serif;
  font-weight: 600;
  font-size: 24px;
  color: #FF5630;
`;

const SummaryCard = ({ label, number }) => (
  <Card>
    <Label>{label}</Label>
    <Number>{number}</Number>
  </Card>
);

export default SummaryCard;
