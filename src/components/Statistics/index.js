import React, { useState } from 'react';
import { observer, inject } from 'mobx-react';
import moment from 'moment';
import { Table } from 'antd';

const columns = [
  {
    title: 'Проект',
    dataIndex: 'project',
    key: 'project',
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Наименование',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => {
      return a.name.localeCompare(b.name);
    },
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Дата изменения',
    dataIndex: 'lastEventDate',
    key: 'lastEventDate',
    sorter: (a, b) => new Date(a.lastEventDate) - new Date(b.lastEventDate),
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Количество пользователей',
    dataIndex: 'countMembers',
    key: 'countMembers',
    sorter: (a, b) => a.countMembers - b.countMembers,
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Количество сообщений',
    dataIndex: 'countMessages',
    key: 'countMessages',
    sorter: (a, b) => a.countMessages - b.countMessages,
    sortDirections: ['descend', 'ascend'],
  },
];

const title = () => 'Статистика по комнатам';

const expandedRowRender = record => (
  <ul>
    {record.members.map((member, ind) => (
      <li key={ind}>{member}</li>
    ))}
  </ul>
);

const rowSelection = setSelectedRooms => ({
  onSelect: (_, __, selectedRows) => setSelectedRooms(selectedRows),
  onSelectAll: (_, selectedRows) => setSelectedRooms(selectedRows),
});

const Statistics = ({ user: { rooms } }) => {
  // eslint-disable-next-line no-unused-vars
  const [selectedRooms, setSelectedRooms] = useState([]);
  const data = rooms.map(({ roomId, name, lastEventDate, project, messages, members }) => {
    const lastDate = moment(lastEventDate);
    return {
      key: roomId,
      name,
      members,
      countMembers: members.length,
      countMessages: messages.length,
      lastEventDate: lastDate.format('YYYY-MM-DD hh:mm'),
      project,
    };
  });
  return (
    <Table
      rowSelection={rowSelection(setSelectedRooms)}
      title={title}
      pagination={{ pageSize: 50 }}
      expandedRowRender={expandedRowRender}
      bordered
      columns={columns}
      dataSource={data}
    />
  );
};

export default inject('user')(observer(Statistics));
