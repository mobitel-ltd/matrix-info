import { Typography } from 'antd';
import React from 'react';
import { observer } from 'mobx-react';
import { getRoomsUsersCount } from 'utils';

const { Title } = Typography;

export default observer(({ user: { rooms } }) => {
  const groupedRooms = getRoomsUsersCount(rooms);

  return (
    <div style={{ padding: 24, background: '#fff', overflow: 'hidden' }}>
      <Title>You have {rooms.length} rooms</Title>
      <ul>
        {groupedRooms.map(([ammount, len], index) => (
          <li key={index}>
            You have {len} rooms with {ammount} users
          </li>
        ))}
      </ul>
    </div>
  );
});
