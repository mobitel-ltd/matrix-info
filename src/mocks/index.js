import { parsedRoomsFactory } from '__tests__/fixtures';
import { UserStore } from 'store';

export const rooms = [...Array(150)].map(parsedRoomsFactory);

export const store = new UserStore({});
store.rooms = rooms;
store.isAuth = true;
