import React from 'react';
import { name } from 'faker';
import { getUserId, parseRoom } from 'utils';
import renderer from 'react-test-renderer';
import Statistics from '../components/Statistics';
import { fakeRooms } from './fixtures';

let fakeMembers;
let fakeMatrixUsers;

beforeEach(() => {
  fakeMembers = [name, name, name].map(item => item.firstName().toLowerCase());
  fakeMatrixUsers = fakeMembers.map(getUserId);
});

it('render correctly text component', () => {
  const rooms = fakeRooms(fakeMatrixUsers).map(parseRoom);
  const StatisticsComponent = renderer.create(<Statistics user={{ rooms }} />).toJSON();
  expect(StatisticsComponent).toMatchSnapshot();
});
