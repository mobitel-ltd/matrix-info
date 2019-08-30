import React from 'react';
import { getGroupedByProjects, getColors } from 'utils';
import { Pie } from 'react-chartjs-2';
import { observer, inject } from 'mobx-react';

const RoomsPie = ({ user: { rooms } }) => {
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

  return <Pie data={dataPie} />;
};

export default inject('user')(observer(RoomsPie));
