import React from 'react';
import {observer} from 'mobx-react';
import store from './store';
import request from '../../helpers/request';
import style from './index.css'
import { DatePicker, List , Picker, WhiteSpace, InputItem, Card, WingBlank, Radio, Flex, Button, TextareaItem} from 'antd-mobile';
import moment from 'moment';
const products = [
  {
    label: '公务接待',
    value: '公务接待',
  },
  {
    label: '会议',
    value: '会议',
  },
  {
    label: '培训',
    value: '培训',
  },
  {
    label: '党建活动',
    value: '党建活动',
  },
  {
    label: '离退休活动',
    value: '离退休活动',
  },
  {
    label: '学会活动',
    value: '学会活动',
  }  
];
const places = [
  {
    label: '金瑞酒店',
    value: '金瑞酒店',
  },
  {
    label: '机关食堂',
    value: '机关食堂',
  },  
];
const meeting_counts = [
  {
    label: '1',
    value: '1',
  },
  {
    label: '2',
    value: '2',
  },
  {
    label: '3',
    value: '3',
  },
  {
    label: '4',
    value: '4',
  },
  {
    label: '5',
    value: '5',
  },
  {
    label: '6',
    value: '6',
  },
  {
    label: '7',
    value: '7',
  },
  {
    label: '8',
    value: '8',
  },
  {
    label: '9',
    value: '9',
  },
  {
    label:'10',
    value:'10',
  } 
];
const meal_types = [
  {
    label: '工作餐',
    value: '工作餐',
  },
  {
    label: '会议餐',
    value: '会议餐',
  }, 
  {
    label:'培训餐',
    value:'培训餐',
  } 
];
// const RadioItem = Radio.RadioItem;

@observer
class Order extends React.Component {
    componentDidMount(){
      this.getUser();
    }
    getUser = () => {
      let code = getQueryVarible('code');
      request({
        url:'/api/v1/token/user',
        data:{
          code
        },
        success:(res)=>{
          sessionStorage.setItem('token',res.token);
          sessionStorage.setItem('u_id',res.u_id);
          sessionStorage.setItem('username',res.username);
          sessionStorage.setItem('account',res.account);
          sessionStorage.setItem('role',res.role);
          }
      })


    };

    handleData =  (e) => {
        let {apply_date,time_begin,time_end,project,unit,leader,post,grade,departmental,section,under_section,male,female,meeting_place,meeting_date,meeting_count,hotel,accompany,meals} = store;
        departmental = departmental.toString();
        section = section.toString();
        under_section = under_section.toString();
        male = male.toString();
        female = female.toString();
        meeting_count = meeting_count.toString();
        meals = meals.replace(/[\r\n]/g, 'A');
        request({
            url:'/api/v1/meeting/recept/save',
            method:'POST',
            data:{
                apply_date:moment(apply_date).format('YYYY-MM-DD'),
                time_begin:moment(time_begin).format('YYYY-MM-DD'),
                time_end:moment(time_end).format('YYYY-MM-DD'),
                project,
                unit,
                leader,
                post,
                grade,
                departmental,
                section,
                under_section,
                male,
                female,
                meeting_place,
                meeting_date,
                meeting_count,
                hotel,
                accompany,
                meals
            },
            beforeSend: (xml) => {
                xml.setRequestHeader('token',sessionStorage.getItem('token'))

            },
            success: (res) => {
                console.log(res);
            }
            
        })
    }
  render() {
      
    return (
      <div>
            <List>
                <DatePicker
                  mode="date"
                  title="开始时间"
                  extra="Optional"
                  value={store.time_begin}
                  onChange={date => store.time_begin = date}
                  onOk={date => store.time_begin = date}
                >
                  <List.Item arrow="horizontal">会议开始</List.Item>
                </DatePicker>
                <DatePicker
                  mode="date"
                  title="结束时间"
                  extra="Optional"
                  value={store.time_end}
                  onChange={date => store.time_end = date}
                  onOk={date => store.time_end = date}
                >
                  <List.Item arrow="horizontal">会议结束</List.Item>
                </DatePicker>
                <Flex style={{ padding: '15px' }}>
                    <Flex.Item>
                        <InputItem
                        placeholder="来访单位"
                        onChange={(e) => {store.unit = e}}
                        >来访单位</InputItem>
                    </Flex.Item>
                    <Flex.Item>
                        <Picker 
                        data={meeting_counts} 
                        cols={1} 
                        className="forss"
                        value={store.meeting_count}
                        onChange={(e) => {store.meeting_count = e}}
                        >
                        <List.Item arrow="horizontal">人数：</List.Item>
                        </Picker>
                    </Flex.Item>  
                </Flex>
                
                <InputItem
                  placeholder="请输入"
                  onChange={(e) => {store.leader = e}}
                >领队人</InputItem>

                <InputItem
                  placeholder="请输入"
                  onChange={(e) => {store.post = e}}
                >领队人职务</InputItem>

                <InputItem
                  placeholder="请输入"
                  onChange={(e) => {store.grade = e}}
                >领队人级别</InputItem>

                <Flex style={{ padding: '15px' }}>
                    <Flex.Item>
                        <Picker 
                        data={meeting_counts} 
                        cols={1} 
                        className="forss"
                        value={store.departmental}
                        onChange={(e) => {store.departmental = e}}
                        >
                        <List.Item arrow="horizontal">厅级人数：</List.Item>
                        </Picker>
                    </Flex.Item> 
                    <Flex.Item>
                        <Picker 
                        data={meeting_counts} 
                        cols={1} 
                        className="forss"
                        value={store.section}
                        onChange={(e) => {store.section = e}}
                        >
                        <List.Item arrow="horizontal">处级人数：</List.Item>
                        </Picker>
                    </Flex.Item> 
                </Flex>
                <Flex>
                    <Flex.Item>
                        <Picker 
                        data={meeting_counts} 
                        cols={1} 
                        className="forss"
                        value={store.under_section}
                        onChange={(e) => {store.under_section = e}}
                        >
                        <List.Item arrow="horizontal">处级以下人数：</List.Item>
                        </Picker>
                    </Flex.Item>
                </Flex>

                <Flex style={{ padding: '15px' }}>
                    <Flex.Item>
                        <Picker 
                        data={meeting_counts} 
                        cols={1} 
                        className="forss"
                        value={store.male}
                        onChange={(e) => {store.male = e}}
                        >
                        <List.Item arrow="horizontal">男：</List.Item>
                        </Picker>
                    </Flex.Item> 
                    <Flex.Item>
                        <Picker 
                        data={meeting_counts} 
                        cols={1} 
                        className="forss"
                        value={store.female}
                        onChange={(e) => {store.female = e}}
                        >
                        <List.Item arrow="horizontal">女：</List.Item>
                        </Picker>
                    </Flex.Item> 
                </Flex>

                <InputItem
                  placeholder="请输入"
                  onChange={(e) => {store.hotel = e}}
                >拟住宿酒店：</InputItem>
                <InputItem
                  placeholder="请输入"
                  onChange={(e) => {store.meeting_place = e}}
                >使用会场：</InputItem>
                <InputItem
                  placeholder="2018-12-30 09:00"
                  onChange={(e) => {store.meeting_date = e}}
                >会议时间：</InputItem>

                <Picker 
                data={meeting_counts} 
                cols={1} 
                className="forss"
                value={store.meeting_count}
                onChange={(e) => {store.meeting_count = e}}
                >
                <List.Item arrow="horizontal">会议人数：</List.Item>
                </Picker>
                <InputItem
                  placeholder="请输入"
                  onChange={(e) => {store.accompany = e}}
                >拟陪同人名单：</InputItem>
                <InputItem
                  placeholder="请输入"
                  onChange={(e) => {store.project = e}}
                >公务活动项目：</InputItem>

                <List renderHeader={() => '订餐信息：就餐日期,餐次,用餐人数,就餐地点,费用（例：2018-01-01,早餐,12,食堂,250）多条数据换行填写'}>
                    <TextareaItem
                        placeholder="2018-01-01,早餐,12,食堂,250"
                        rows={5}
                        value={store.meals}
                        onChange={e => {store.meals = e}}
                    />
                </List>

                <WhiteSpace size="lg" />
                <Button type="primary" onClick={this.handleData}>提交</Button>
                <WhiteSpace size="lg" />
                
            </List>
      </div>
    )
    
  }
}
export default Order