import {observable} from 'mobx';
import moment from 'moment';

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);

class Store{
    @observable data = [];
    @observable apply_date = now;
    @observable time_begin = now;
    @observable time_end = now;
    @observable project = '';
    @observable unit = '';
    @observable leader = '';
    @observable post = '';
    @observable grade = '';
    @observable departmental = [''];
    @observable section = [''];
    @observable under_section = ['3'];
    @observable male = [''];
    @observable female = [''];
    @observable meeting_place = '';
    @observable meeting_date = '';
    @observable meeting_count = [''];
    @observable hotel = '';
    @observable accompany = '';
    @observable meals = ''

    @observable deadline = new Date(Date.now());
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