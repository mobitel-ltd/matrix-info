import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import { getUserId, parseRoom } from 'utils';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import Statistics from '../components/Statistics';
import { fakeRooms } from './fixtures';

Enzyme.configure({ adapter: new Adapter() });
let fakeMembers;
let fakeMatrixUsers;

beforeEach(() => {
  fakeMembers = ['ivanov', 'petrov', 'sidorov'];
  fakeMatrixUsers = fakeMembers.map(getUserId);
});

it('render correctly text component', () => {
  const rooms = fakeRooms(fakeMatrixUsers).map(parseRoom);
  const StatisticsComponent = renderer.create(<Statistics user={{ rooms }} />).toJSON();
  expect(StatisticsComponent).toMatchSnapshot();
});

it('render with enzim', () => {
  const rooms = fakeRooms(fakeMatrixUsers).map(parseRoom);
  const wrapper = shallow(<Statistics user={{ rooms }} />);
  expect(wrapper).toMatchSnapshot();
});
