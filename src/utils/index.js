import { groupBy, head, last, get } from 'lodash/fp';
import url from 'url';
import { baseColors } from './consts';

const protocol = 'https';
const matrixHost = 'matrix';
export const bots = process.env.REACT_APP_BOTS.split(' ');

// export const isEnglish = val => /[\w]/.test(val);

export const getMatrixHostName = domain => [matrixHost, domain].join('.');

export const getBaseUrl = domain => url.format({ protocol, hostname: getMatrixHostName(domain) });

export const getUserId = (userName, domain) => `@${userName}:${getMatrixHostName(domain)}`;

export const getProjectName = name => {
  const [h, tail] = name.split('-');

  return tail ? h : 'custom room';
};

export const getLastEventDate = messages => last(messages) |> get('date');

const takeName = matrixId => matrixId.slice(1).split(':') |> head;

/**
 * @param {matrixSdk.Room} room matrix room
 * @returns {{name: string, roomId: string, members: string[], project: string, messages: {sender: string, date: string}[]}}
 */
export const parseRoom = room => {
  const { name } = room;
  const messages = room.timeline
    .filter(e => !e.target)
    .filter(e => !bots.some(bot => e.getSender().includes(bot)))
    .map(e => ({
      date: e.getDate(),
      sender: takeName(e.getSender()),
    }));
  const members = room.getJoinedMembers().map(({ userId }) => takeName(userId));

  return {
    name,
    messages,
    lastEventDate: getLastEventDate(messages),
    members,
    roomId: room.roomId,
    project: getProjectName(name),
  };
};

export const getRoomsUsersCount = rooms => groupBy(({ members }) => members.length, rooms) |> Object.entries;
export const getGroupedByProjects = rooms => groupBy('project', rooms) |> Object.entries;

const groupedFunc = {
  user: getRoomsUsersCount,
  project: getGroupedByProjects,
};

export const getGroupedData = type => rooms => groupedFunc[type](rooms);

export const getColors = (len, cur = 0) => {
  const currentColor = cur > baseColors.length - 1 ? 0 : cur;
  return len ? [baseColors[currentColor], ...getColors(len - 1, currentColor + 1)] : [];
};
