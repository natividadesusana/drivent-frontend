import dayjs from 'dayjs';
import 'dayjs/locale/pt';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import { useState } from 'react';
import ActivitiesLocation from './ActivitiesLocation';
import useGetActivityDays from '../../../hooks/api/useGetActivityDays';
import { useEffect } from 'react';
import useGetActivityOfDay from '../../../hooks/api/useGetActivityOfDay';

const customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);

function convertData(arraydata) {
  return arraydata.filter((item, index) => arraydata.indexOf(item) === index);
}

export default function ActivitiesSelection() {
  const [selectedDay, setSelectedDay] = useState(null);
  const { getactivitydays } = useGetActivityDays();
  const { getactivityofday } = useGetActivityOfDay();
  const [dateData, setDateData] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    getactivitydays().then((res) => {
      const data = convertData(res);
      setDateData(data);
    });
  }, []);

  useEffect(() => {
    if (selectedDay) {
      getactivityofday(selectedDay).then((res) => {
        setData(res);
      });
    }
  }, [selectedDay]);

  return (
    <>
      <StyledTypography variant="h4">Escolha de Atividades</StyledTypography>
      {selectedDay == null ? <SubTitle>Primeiro, filtre pelo dia do evento:</SubTitle> : null}
      <Container>
        {dateData?.map((el, index) => {
          return (
            <ActivityDate
              key={index}
              selected={selectedDay === el}
              onClick={() => {
                setSelectedDay(el);
              }}
            >
              {dayjs(el).locale('pt').format('dddd, DD/MM')}
            </ActivityDate>
          );
        })}
      </Container>
      {selectedDay == null ? null : (
        <GridVenue>
          {data?.map((el) => {
            return <ActivitiesLocation key={el.id} name={el.name} data={el.Activities} />;
          })}
        </GridVenue>
      )}
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
  text-align: left;
`;

const SubTitle = styled.span(() => ({
  color: '#8E8E8E',
  marginTop: '20px',
  fontSize: '20px',
  lineHeight: '23px',
}));

const Container = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 60px;
`;

const ActivityDate = styled.div`
  width: 150px;
  height: 40px;
  background-color: ${(props) => (props.selected ? '#FFD37D' : '#e0e0e0')};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 23px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  cursor: pointer;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
`;

const GridVenue = styled.div`
  display: flex;
  min-height: 365px;
  height: auto;
  width: 100%;
  margin: 0 0 55px 0;
`;
