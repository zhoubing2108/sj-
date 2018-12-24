import {observable} from 'mobx';
import moment from 'moment';

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);
class Store{
    @observable data = [];
    @observable phone = '';
    @observable password='qsss';
    @observable meal_date = now;
    @observable product = [];//数据的格式会影响展示的结果
    @observable content = '';
    @observable meal_space = ['机关食堂'];
    @observable member = 3;
    @observable table_number = 1;
    @observable premeals = {
        meal_first:'',
        meal_second:'',
        meal_third:'',
    };
    @observable meal_type = '';
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

}

export default new Store();