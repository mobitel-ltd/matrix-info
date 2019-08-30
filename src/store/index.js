import matrixSdk from 'matrix-js-sdk';
import { observable, action } from 'mobx';
import { message } from 'antd';
import { getBaseUrl, getUserId, parseRoom } from 'utils';

const spinLoginText = 'login with password';
const spinSyncText = 'wait for sync with matrix server\n';

const getReadyClient = client => {
  return new Promise(resolve => {
    client.on('sync', state => {
      if (state === 'SYNCING') {
        resolve(client);
      }
    });
  });
};

export class UserStore {
  constructor({ sdk = matrixSdk, domain = process.env.REACT_APP_MATRIX_DOMAIN }) {
    this.sdk = sdk;
    this.domain = domain;
  }

  @observable isAuth = false;

  @observable rooms = [];

  @observable matrixClient = null;

  @observable fetching = false;

  @observable fetchingTip = '';

  @action('Start')
  start = async data => {
    await this.login(data);
    await this.getRooms();
  };

  @action('Login')
  login = async data => {
    this.fetchingTip = spinLoginText;
    this.fetching = true;
    try {
      const baseUrl = getBaseUrl(this.domain);
      const userId = getUserId(data.userName, this.domain);
      const client = this.sdk.createClient(baseUrl);
      const { access_token: accessToken } = await client.loginWithPassword(userId, data.password);
      const matrixClient = this.sdk.createClient({
        baseUrl,
        accessToken,
        userId,
      });
      await matrixClient.startClient({ initialSyncLimit: Number(process.env.REACT_APP_EVENTS_LIMIT) });
      this.fetchingTip = spinSyncText;
      this.matrixClient = await getReadyClient(matrixClient);
      this.isAuth = true;
    } catch (e) {
      message.error('Неверные параметры входа');
      this.isAuth = false;
    }
    this.fetchingTip = '';
    this.fetching = false;
  };

  @action('Get rooms')
  getRooms = async () => {
    const allRooms = await this.matrixClient.getRooms();
    this.rooms = allRooms.map(parseRoom);
    return this.rooms;
  };
}

export default new UserStore({});
