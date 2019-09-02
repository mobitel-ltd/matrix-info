import React, { useState } from 'react';
import { getColors, getGroupedData } from 'utils';
import { Pie } from 'react-chartjs-2';
import { Radio } from 'antd';
import { observer, inject } from 'mobx-react';
import Statistics from 'components/Statistics';

const RoomsPie = ({ user: { rooms } }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [typeStatistic, setTypeStatistic] = useState('user');

  const groupedData = getGroupedData(typeStatistic)(rooms);
  const backgroundColor = getColors(groupedData.length);
  const dataPie = {
    labels: groupedData.map(([project]) => project),
    datasets: [
      {
        data: groupedData.map(([, innerRooms]) => innerRooms.length),
        backgroundColor,
      },
    ],
  };

  const onClick = event => {
    if (event.length === 0) {
      return;
    }
    const [{ _index: index }] = event;
    const [, handleRooms] = groupedData[index];
    setSelectedRooms(handleRooms);
  };

  const handlePaginationChange = e => {
    const { value } = e.target;
    setTypeStatistic(value);
    setSelectedRooms([]);
  };

  return (
    <>
      <Radio.Group value={typeStatistic} onChange={handlePaginationChange}>
        <Radio.Button value="user">Пользователи</Radio.Button>
        <Radio.Button value="project">Проекты</Radio.Button>
      </Radio.Group>
      <Pie data={dataPie} onElementsClick={onClick} />
      {selectedRooms.length !== 0 && <Statistics user={{ rooms: selectedRooms }} />}
    </>
  );
};

export default inject('user')(observer(RoomsPie));
