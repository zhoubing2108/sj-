import React, { Component, Fragment } from 'react';
import { Tabs, WhiteSpace, InputItem, Flex, Radio, List, Checkbox, DatePicker, Button, WingBlank } from 'antd-mobile';
import request from '../../helpers/request';
import st from './entrance.css';
import store from './store';
import { createForm } from 'rc-form';
import { observer } from 'mobx-react';
import moment from 'moment';


const user_type = ['干部职工', '借调人员', '其他人员'];
const access = ['资料室', '会议室', '地下车库', '餐厅', '电梯及步梯', '档案室门牌(5、6楼)', '科室门牌号']
const FlexItem = Flex.Item;
const CheckboxItem = Checkbox.CheckboxItem;
const AgreeItem = Checkbox.AgreeItem;

@observer
class Apply extends Component {

  onRadioChange = (i) => {
    store.RadioValue = i;
  }
  render() {
    const { getFieldProps } = this.props.form;
    let { deadline } = store
    return (
      <Fragment>
        <WhiteSpace/>
        <InputItem {...getFieldProps('role_name')} placeholder='请输入职务' style={{ width: '100%' }}>职务:</InputItem>
        <WhiteSpace />
        <Flex style={{ padding: '15px', fontSize: 14, backgroundColor:'white' }}>
          <FlexItem>
            人员类型：
                </FlexItem>
          {user_type.map(i => (
            <FlexItem key={i}>
              <Radio className='my-radio' key={i} checked={store.RadioValue === i} onChange={() => this.onRadioChange(i)} >
                {i}
              </Radio>
            </FlexItem>
          ))}
        </Flex>
        <WhiteSpace />
        <Flex wrap="wrap" style={{ padding: '15px', fontSize: 14, backgroundColor: 'white' }} >
          <FlexItem>
            开通功能：
                </FlexItem>
          {
            access.map((v, i) => {
              if (i < 2) {
                return (
                  <FlexItem key={i}>
                    <AgreeItem style={{ fontSize: '10px' }} name='test' value={v} onChange={e => console.log('checkbox', e)}>{v}</AgreeItem>
                  </FlexItem>)
              }
            }
            )
          }
          {
            access.map((v, i) => {
              if (i > 1 && i < 3) {
                return (
                  <FlexItem key={i}>
                    <AgreeItem style={{ fontSize: '10px' }} name='test' onChange={e => console.log('checkbox', e)}>{v}</AgreeItem>
                  </FlexItem>)
              }
            }
            )
          }
        </Flex>
        <Flex style={{ padding: '15px', fontSize: 14, backgroundColor: 'white'}}>
          {
            access.map((v, i) => {
              if (i > 2 && i < 7) {
                return (
                  <FlexItem key={i}>
                    <AgreeItem name='test' onChange={e => console.log('checkbox', e)}>{v}</AgreeItem>
                  </FlexItem>)
              }
            }
            )
          }
        </Flex>
        <WhiteSpace />

        <DatePicker
          mode="date"
          title="请选择日期"
          value={deadline}
          onChange={(e) => { store.deadline = e }}
          onOk={(e) => { console.log(e) }}
        >
          <List.Item arrow="horizontal">工作截止时间(外来人员):</List.Item>
        </DatePicker>
        <Button style={{ position: 'fixed', width: '100%', bottom: 50 }} type='primary' onClick={this.submit} >提交</Button>
      </Fragment>
    )
  }

  submit = () => {
    let { getFieldsValue } = this.props.form;
    let {deadline, RadioValue} = store;
    deadline = moment(deadline).format('YYYY-MM-DD');
    let obj = document.getElementsByName("test");
    let check_val = [];
    for (let k in obj) {
      if (obj[k].checked) {
        check_val.push(obj[k].labels[0].innerText);
      }
    }
    let access = check_val.toString();
    request({
      url:'/api/v1/access/save',
      method:'POST',
      data:{
        deadline,
        user_type:RadioValue,
        access
      },
      beforeSend: (xml) => {
        xml.setRequestHeader('token','6fd5ad9d1304deb856ecac94df1849a7')
      },
      success: (res)=>{
        console.log(res);
      }
    })
  }
}
const ApplyCom = createForm()(Apply);

export default ApplyCom