import React, { useState } from 'react';
import { getGroupedByProjects, getColors } from 'utils';
import { Pie } from 'react-chartjs-2';
import { observer, inject } from 'mobx-react';
import Statistics from 'components/Statistics';

const RoomsPie = ({ user: { rooms } }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);

  const groupedByProjects = getGroupedByProjects(rooms);
  const backgroundColor = getColors(groupedByProjects.length);
  const dataPie = {
    labels: groupedByProjects.map(([project]) => project),
    datasets: [
      {
        data: groupedByProjects.map(([, innerRooms]) => innerRooms.length),
        backgroundColor,
      },
    ],
  };

  const onClick = ([{ _index: index }]) => {
    const [, handleRooms] = groupedByProjects[index];
    setSelectedRooms(handleRooms);
  };

  return (
    <div>
      <Pie data={dataPie} onElementsClick={onClick} />
      {selectedRooms.length && <Statistics user={{ rooms: selectedRooms }} />}
    </div>
  );
};

export default inject('user')(observer(RoomsPie));
