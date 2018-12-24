import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { ListView, Pagination, Tabs, Card, List } from 'antd-mobile';
import store from './store';
import request from '../../helpers/request';
import {observer} from 'mobx-react';
import st from './entrance.css';
import getQueryVarible from '../../helpers/get-query-variable';
const Item = List.Item;



const tabs = [
  { title: '申请列表' },
  { title: '审批记录' },
];
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
const NUM_ROWS = 1;
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
class MyEntrance extends Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      dataSource,
      isLoading: true,
    };
  }


  componentDidMount() {
    // setTimeout(() => {
    //   this.rData = genData();
    //   this.setState({
    //     dataSource: this.state.dataSource.cloneWithRows(this.rData),
    //     isLoading: false,
    //   });
    // }, 600);

    // if(!sessionStorage.getItem('token')){
    //   this.getUser();

    // }
    this.getUser();
    // this.fetchList();
    

  }

  
  getUser = () => {
    // let code = getQueryVarible('code');
    let code = '5Vmnwe1CoxxuqLqhJdsRt27-Zfi6xd-bPz_eIq-rZGo';
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
        this.fetchListLeft();
        }
    })
  }

  test = ()=>{
    console.log(sessionStorage);
    this.fetchList(1);
  }
  fetchList = (page) => {
    let { time_begin, time_end, status, username, access, department } = store.listParams;
    console.log(time_begin, time_end);
    page = page?page:1;
    let u_id = sessionStorage.getItem('u_id');
    request({
      // url: '/api/v1/meeting/place/list',
      url: '/api/v1/flow/complete',
      method: 'GET',
      data: {
        page:page,
        size:10,
        wf_type:'access_control_t'

      },
        
      beforeSend: (xml) => {
        xml.setRequestHeader('token', sessionStorage.getItem('token'))
      },
      success: (res) => {
        console.log('右边',res);
        data = res.data;
        store.data = res.data;
        store.total = res.total
      }
    })

  }
  fetchListLeft = () => {
    let { time_begin, time_end, status, username, access, department } = store.listParams;
    console.log(time_begin, time_end);
    let u_id = sessionStorage.getItem('u_id');
    request({
      url: '/api/v1/flow/ready',
      method: 'GET',
      data: {
        wf_type:'access_control_t'
      },
        
      beforeSend: (xml) => {
        xml.setRequestHeader('token', sessionStorage.getItem('token'))
      },
      success: (res) => {
        console.log('左边',res); 
        data = res.data;
        store.dataleft = res.data;
        store.totalleft = res.total
      }
    })

  }

  

  render() {
    
    console.log(sessionStorage)
    let mydata = store.data;
    let mydataleft = store.dataleft;
    console.log(mydata);
    console.log('mydataleft',mydataleft);
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
    return (

      <Fragment>
        <div style={{ marginTop: 5 }}>
          <Tabs tabs={tabs} initialPage={0} animated={false} useOnPan={false}>
            <div style={{ height: '100%', backgroundColor: '#fff' }}>
              <List>
               {mydataleft.map(e => (
                
                  <Item style={{fontWeight:'bold'}} key = {e.id}>
                  <Card>
                  <Card.Body>
                    <pre>
                    <span>{e.flow.create_time}</span>&nbsp;
                    <span className={st.content}>{e.flow.members}</span>
                    <span>{e.flow.access}</span>&nbsp;
                    <span>{e.flow.deadline}</span>&nbsp;
                    <span>{e.flow.user_type}</span><br />

                    <span>{e.deadline}  <button onClick={this.test}>test</button>  </span>

                    <span style={{float:'right'}}><a href="" onClick={(e) => e.preventDefault()}>{_status[e.status]}</a></span><br />
                    <span>{e.process[0].admin.username+':'+ "申请"}</span>&nbsp;&nbsp;

                    {e.process.map(i =>(
                        <span key={i.id}>                 
                        <span>{i.admin.username+':'+i.btn}<br /></span>
                        </span> ))}
                    {/* <span>{e.process[1].admin.username+':'+e.process[1].btn}</span><br />
                    <span>{e.process[2].admin.username+':'+e.process[2].btn}</span> */}
                    {/* <span>{e.process[3].admin.username+':'+e.process[3].btn}</span> */}
                    </pre>
                  </Card.Body>
                  </Card>
                  </Item>
                
               ))}
              </List>
            </div>
            <div style={{ height: '100%', backgroundColor: '#fff'}}>
              <List>
               {mydata.map(e => (
                
                  <Item style={{fontWeight:'bold'}} key = {e.id}>
                  <Card>
                  <Card.Body>
                    <pre style={{}}>
                    <span>{e.flow.create_time}</span>&nbsp;
                    <span className={st.content}>{e.flow.members}</span>
                    <span>{e.flow.access}</span>&nbsp;
                    <span>{e.flow.deadline}</span>&nbsp;
                    <span>{e.flow.user_type}</span><br />

                    {/* <span className={st.content}>{e.access}</span> */}
                    {/* 在<pre>标签下实现文本自动换行 */}

                    <span>{e.deadline}  <button onClick={this.test}>test</button>  </span>

                    <span style={{float:'right'}}><a href="" onClick={(e) => e.preventDefault()}>{_status[e.status]}</a></span><br />
                    <span>{e.process[0].admin.username+':'+ "申请"}</span>&nbsp;&nbsp;

                    {e.process.map(i =>(
                        <span key={i.id}>                 
                        <span>{i.admin.username+':'+i.btn}<br /></span>
                        </span> ))}
                    {/* <span>{e.process[1].admin.username+':'+e.process[1].btn}</span><br />
                    <span>{e.process[2].admin.username+':'+e.process[2].btn}</span> */}
                    {/* <span>{e.process[3].admin.username+':'+e.process[3].btn}</span> */}
                    </pre>
                  </Card.Body>
                  </Card>
                  </Item>
                
               ))}
              </List>
            </div>
            
          </Tabs>
        </div>
      </Fragment>
    )
  }
}

export default MyEntrance