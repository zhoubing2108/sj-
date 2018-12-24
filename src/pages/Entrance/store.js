import { observable } from 'mobx';
import moment from 'moment';

class Store {
  @observable data = [];
  @observable dataleft = [];
  @observable RadioValue = 0;
  @observable deadline = new Date(Date.now());
  @observable listParams = {
    time_begin: moment().startOf('month'),
    time_end: moment(),
    access: '全部',
    username: '全部',
    department: '全部',
    status: 3,
  }
  @observable total = 5;
  @observable totalleft = 5;
}

export default new Store();