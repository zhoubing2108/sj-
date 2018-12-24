import {observable} from 'mobx';
import moment from 'moment';
const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);


const texts = [
    {
      label: '文体活动场地',
      value: '文体活动场地',
    },
    {
      label: '功能室场地',
      value: '功能室场地',
    },  
  ];
class Store{
    @observable data = [];
    @observable prespace_type = [];
    @observable space = '';
    @observable cols = 1;
    @observable asyncValue = ['文体活动场地'];
    @observable user_count = '';
    @observable reason = '';
    @observable time_begin = now;
    @observable time_end = now;
    @observable listParams = {
      time_begin: moment().startOf('month'),
      time_end: moment(),
      access: '全部',
      username: '全部',
      department: '全部',
      status: 3,
    }

}
export default new Store();