import React from 'react';
import styled from 'styled-components';
import BarChartIcon from '@mui/icons-material/BarChart';

const Header = styled.h2`
  display: flex;
  align-items: center;
  font-family: 'Lexend', sans-serif;
  font-weight: 600;
  font-size: 24px;
  color: #0052CC;
  margin-bottom: 1.5rem;

  svg {
    margin-right: 0.5rem;
    color: #FF5630;
  }
`;

const PageHeader = ({ title }) => (
  <Header>
    <BarChartIcon fontSize="inherit" />
    {title}
  </Header>
);

export default PageHeader;
