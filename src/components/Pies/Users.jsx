import React from 'react';
import { getRoomsUsersCount, getColors } from 'utils';
import { Pie } from 'react-chartjs-2';
import { observer } from 'mobx-react';

const RoomsPie = ({ user: { rooms } }) => {
  const groupedByProjects = getRoomsUsersCount(rooms);
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

  return (
    <div>
      <h2>Pie Example</h2>
      <Pie data={dataPie} />
    </div>
  );
};

export default observer(RoomsPie);
