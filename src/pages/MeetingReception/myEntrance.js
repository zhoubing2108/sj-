import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { List, Pagination, Tabs, Card,ListView } from 'antd-mobile';
import store from './store';
import request from '../../helpers/request';
import {observer} from 'mobx-react';
import getQueryVarible from '../../helpers/get-query-variable';
const Item = List.Item;

// const tabs = [
//   { title: '当前申请' },
//   { title: '历史申请' },
//   { title: '审核记录'}
// ];
const tabs = [
  {title:'所有列表'}
]
const _status = {
  '-1': '不通过',
  '0': '保存中',
  '1': '审批中',
  '2': '通过'
}

var data = [
  {
    id: 1,
    create_time: "2018-12-03 10:26:55",
    username: "朱明良",
    department: "办公室",
    role_name: "管理员",
    user_type: "干部职工",
    access: "资料室,会议室",
    deadline: "2018-12-30 00:00:00",
    status: 0,
    admin_id: 1,
    official_time:''
  },
  {
    id: 2,
    create_time: "2018-12-15 10:26:55",
    username: "rush",
    department: "办公室",
    role_name: "管理员",
    user_type: "干部职工",
    access: "资料室,会议室",
    deadline: "2018-12-30 00:00:00",
    status: 0,
    admin_id: 2
  },
  {
    id: 3,
    create_time: "2018-12-17 10:26:55",
    username: "天华",
    department: "办公室",
    role_name: "管理员",
    user_type: "干部职工",
    access: "资料室,会议室",
    deadline: "2018-12-30 00:00:00",
    status: 0,
    admin_id: 4
  },
  {
    official_time:'',
    id:'4',
    unit:'',
    leader:'',
    count:'',
    hotel:'',
    department:'',
    meeting_date:'',
    meeting_count:'',
    accompany:'',
    project:'',
    meals:'',
    status:''
  }
];

const NUM_ROWS = 5;
let pageIndex = 0;

function genData(pIndex = 0) {
  const dataBlob = {};

  for (let i = 0; i < NUM_ROWS; i++) {
    const ii = (pIndex * NUM_ROWS) + i;
    dataBlob[`${ii}`] = `row - ${ii}`;
  }
  return dataBlob;
}

@observer
class MyMeeting extends Component {
  componentDidMount() {
    this.getUser();
    // this.fetchList(1);
  }
  getUser = () => {
    let code = getQueryVarible('code');
    request({
      url:'/api/v1/token/user',
      data:{
        code
      },
      method:'GET',
      success:(res)=>{
        sessionStorage.setItem('token',res.token);
        sessionStorage.setItem('u_id',res.u_id);
        sessionStorage.setItem('account',res.token);
        sessionStorage.setItem('role',res.u_id);
        sessionStorage.setItem('username',res.token);
        this.fetchList();
        }
    })

  }

  fetchList = (page, size = 10) => {
    let { time_begin, time_end, status, username, department } = store.listParams;
    page = page?page:1;
    // status = 0;默认为3，取出全部
    let meal_type = '全部';
    let u_id = sessionStorage.getItem('u_id')
    request({
      url: '/api/v1/meeting/recept/list',
      method: 'GET',
      data: {
        u_id,
        time_begin:time_begin.format('YYYY-MM-DD'),
        time_end: time_end.format('YYYY-MM-DD'),
        status,
        username,
        department,
        page: page ,
        size,
        meal_type
      },
      beforeSend: (xml) => {
        xml.setRequestHeader('token', sessionStorage.getItem('token'))
      },
      success: (res) => {
        console.log('会议的列表数据',res);
        data = res.data;
        store.data = res.data;
        //对store里的data进行更新
        store.total = res.total
      }
    })

  }

  onEndReached = (event) => {
    // if (this.state.isLoading && !this.state.hasMore) {
    //   return;
    // }
    // console.log('reach end', event);
    // this.setState({ isLoading: true });
    // setTimeout(() => {
    //   this.rData = { ...this.rData, ...genData(++pageIndex) };
    //   this.setState({
    //     dataSource: this.state.dataSource.cloneWithRows(this.rData),
    //     isLoading: false,
    //   });
    // }, 1000);
  }
  whichTab = (e) => {
    this.secWhichTab(e);
  }
  secWhichTab = (e) => {
    let { time_begin, time_end, status, username, department } = store.listParams;
    // let status;
    if(e.title == '当前申请'){
      status = 0;
     }else if(e.title == '历史申请'){
      status = 1 + '&' + 2 ;
     }else if(e.title){
       status = 1 + '&' + 2;
     }
     let meal_type = '全部';
     let page = 1;
     let size = 10;
     request({
       url:'/api/v1/official/list',
       method:'GET',
       data:{
        department,
        username,
        time_begin:time_begin.format('YYYY-MM-DD'),
        time_end:time_end.format('YYYY-MM-DD'),
        status,
        meal_type,
        page,
        size
       },
       beforeSend: (xml) => {
         xml.setRequestHeader('token','b6fd24791485e261d300b41dc5bf4221')
        },
        success: (res) => {
          console.log('统一statu后的数据',res);
        }
     })


  }
  render() {
    let {total,dataSource} = store;
    console.log(store);
    let { official_time,id,unit,leader,count,hotel,department,meeting_date,meeting_count,accompany,project,meals,status} = store;
    let mydata = store.data;
    // 在store中监听一个空数组，用来装请求回来的data，map操作最新的data，循环打印
    //拿到最新的store
    return (
      <Fragment>
        <div style={{ marginTop: 5 }}>
        {/* onTabClick={this.whichTab} */}
          <Tabs tabs={tabs} initialPage={0} animated={false} useOnPan={false}  onChange={(tab, index) => { console.log('onChange', index, tab); }}>
            <div style={{ height: '100%', backgroundColor: '#fff' }}>
             <List>
               {mydata.map(e => (
                
                <Item style={{fontWeight:'bold'}} key = {e.id}>
                <Card>
                <Card.Body>
                  <pre>
                  <span>{e.official_time}</span>&nbsp;
                  <span>{e.unit}</span>&nbsp;
                  <span>{e.leader}</span>&nbsp;
                  <span>{e.count}</span><br />

                  <span>{e.hotel}</span>&nbsp;
                  <span>{e.department}</span>&nbsp;
                  <span>{e.meeting_date}</span>&nbsp;
                  <span>{e.meeting_count}</span>&nbsp;
                  <span>{e.accompany}</span><br />

                  <span>{e.project}</span><br />

                  <span>{e.meals.replace('A','\n')}</span>
                  <span style={{float:'right'}}><a href="" onClick={(e) => e.preventDefault()}>{_status[e.status]}</a></span><br />
                  </pre>
                </Card.Body>
                </Card>
                </Item>
                
               ))}
             </List>
            </div>
            {/* <div style={{ height: '100%', backgroundColor: '#fff' }}>
            第二个展示内容
            </div>
            <div>第三个内容</div> */}
          </Tabs>
        </div>
      </Fragment>
    )
  }
}

export default MyMeeting;