import React from 'react';
import { observer, inject } from 'mobx-react';
import moment from 'moment';
import { Table } from 'antd';

const columns = [
  {
    title: '№',
    dataIndex: 'roomId',
    key: 'roomId',
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Наименование',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'дата изменения',
    dataIndex: 'lastEventDate',
    key: 'lastEventDate',
    sorter: (a, b) => new Date(a.lastEventDate) - new Date(b.lastEventDate),
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'проект',
    dataIndex: 'project',
    key: 'project',
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ['descend', 'ascend'],
  },
];

const Statistics = ({ user: { rooms } }) => {
  const data = rooms.map(({ roomId, name, lastEventDate, project }) => {
    const lastDate = moment(lastEventDate);
    return {
      key: roomId,
      roomId,
      name,
      lastEventDate: lastDate.format('YYYY-MM-DD hh:mm'),
      project,
    };
  });
  return <Table bordered columns={columns} dataSource={data} />;
};

export default inject('user')(observer(Statistics));
