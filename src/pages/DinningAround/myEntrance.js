import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { ListView, Pagination, Tabs, Card, List } from 'antd-mobile';
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
  {title:'当前列表'},
  {title: '审核记录'}
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
    admin_id: 1
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
];
const NUM_ROWS = 10;
let pageIndex = 0;

function genData(pIndex = 0) {
  const dataBlob = {};
  console.log('dataBlob',dataBlob);
  console.log(store.total);

  let NUM_ROWS = store.total === 0 ? 1:10;
  for (let i = 0; i < NUM_ROWS; i++) {
    const ii = (pIndex * NUM_ROWS) + i;
    dataBlob[`${ii}`] = `row - ${ii}`;
  }
  return dataBlob;
}

@observer
class MyEntrance extends Component {
  componentDidMount() {
    // if(!sessionStorage.getItem('token')){
    //   this.getUser();

    // }
    this.getUser();
    // console.log('getQueryVarible',getQueryVarible);
    // let u_id = getQueryVarible('code');
    // sessionStorage.setItem('u_id',u_id);
    // this.fetchList();
    
  }
  getUser = () => {
    // let code = getQueryVarible('code');
    let code = 'OWxzHwwZzqK2682-K9BQlZZUKMvXc97FCeYiFCfU42U';
    request({
      url:'/api/v1/token/user',
      data:{
        code
      },
      method:'GET',
      success:(res)=>{
        sessionStorage.setItem('token',res.token);
        sessionStorage.setItem('u_id',res.u_id);
        sessionStorage.setItem('username',res.username);
        sessionStorage.setItem('account',res.account);
        sessionStorage.setItem('role',res.role);
        this.fetchList(1);
        }
    })
  }
  fetchList = (page) => {
    let { time_begin, time_end, status, username, department } = store.listParams;
    console.log(time_begin, time_end);
    page = page?page:1;
    status = 0;
    let meal_type = '全部';
    let u_id = sessionStorage.getItem('u_id');
    request({
      // url: '/api/v1/official/list',
      url:'/api/v1/flow/complete',
      method: 'GET',
      data:{
        size:10,
        page:page,
        wf_type:'meeting_recept_t'

      },
      // data: {
      //   u_id,
      //   time_begin:time_begin.format('YYYY-MM-DD'),
      //   time_end: time_end.format('YYYY-MM-DD'),
      //   status,
      //   username,
      //   department,
      //   page: page ,
      //   size: 10,
      //   meal_type
      // },
      beforeSend: (xml) => {
        xml.setRequestHeader('token','3653410c3846638b3641df2585ecd749')
      },
      success: (res) => {
        console.log('响应的数据',res);
        data = res.data;
        store.data = res.data;
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
    // console.log('secWhich',e);
    // let status;
    if(e.title == '当前申请'){
      status = 0;
      // console.log('新的status',status);
     }else if(e.title == '历史申请'){
      status = 1 + '&' + 2 ;
      // console.log('新的status',status)
     }else if(e.title){
       status = 1 + '&' + 2;
      //  console.log('新的status',status)
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
         xml.setRequestHeader('token','7d377662cb83bcf56cd1ab775f8c0dba')
        },
        success: (res) => {
          console.log('统一statu后的数据',res);
        }
     })

  }
  render() {
    console.log(sessionStorage);
    let mydata = store.data;
    let {total} = store;
    if (mydata.length == 0) {
      return (
      <div>
        <Fragment>
          <div style={{ marginTop: 5 }}>
            <Tabs tabs={tabs} initialPage={0} animated={false} useOnPan={false}  onChange={(tab, index) => { console.log('onChange', index, tab); }}>
              <div style={{ height: '100%', backgroundColor: '#fff' }}>
              <List>
                    <Item style={{fontWeight:'bold'}}>
                    <Card>
                    <Card.Body>
                      <pre>
                        <div style={{textAlign:'center'}}>暂无数据</div>
                      </pre>
                    </Card.Body>
                    </Card>
                    </Item>
              </List>
              </div>
            </Tabs>
          </div>
        </Fragment>
      </div>)
    }
    //如果有问题就把上面的if都删了
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
                    <span>{e.username}</span>&nbsp;
                    <span>{e.create_time}</span>&nbsp;
                    <span>{e.phone}</span>&nbsp;
                    <span>{e.department}</span>&nbsp;
                    <span>{e.product}</span><br />

                    <span>{e.content}</span>&nbsp;
                    <span>{e.meal_space}</span>&nbsp;
                    <span>{e.member}</span>&nbsp;
                    <span>{e.table_number}</span><br />

                    <span>{e.meals.replace('A','\n')}</span>
                    {/* 将A换回换行符,需要<pre>标签配合 */}
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

export default MyEntrance