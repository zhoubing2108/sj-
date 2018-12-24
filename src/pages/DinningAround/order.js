import React from 'react';
import {observer} from 'mobx-react';
import store from './store';
import request from '../../helpers/request';
import style from './index.css'
import { DatePicker, List , Picker, WhiteSpace, InputItem, Card, WingBlank, Radio, Flex, Button} from 'antd-mobile';
import moment from 'moment'
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
const table_nums = [
  {
    label: '1桌',
    value: '1',
  },
  {
    label: '2桌',
    value: '2',
  },
  {
    label: '3桌',
    value: '3',
  },
  {
    label: '4桌',
    value: '4',
  },
  {
    label: '5桌',
    value: '5',
  },
  {
    label: '6桌',
    value: '6',
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
  handleData = (e) => {
    console.log('我的store',store);
    let {meal_date, content, meal_space, meal_type, premeals, table_number, member, product, phone } = store;
    let breakfast ='早餐,' + (premeals.meal_first.length == 0 ? '' : premeals.meal_first) ;
    let lunch ='A午餐,' + (premeals.meal_second.length == 0 ? '' : premeals.meal_second) ;
    let dinner ='A晚餐,' + (premeals.meal_third.length == 0 ? '' : premeals.meal_third) ;
    let meals = breakfast + lunch + dinner + parseInt((premeals.meal_first.length==0?0:1)+(premeals.meal_second.length==0?0:1)+(premeals.meal_third==0?0:1));
    meal_space = meal_space.toString();
    product = product.toString();
    phone = phone.toString();
    table_number = parseInt(table_number);
    member = parseInt(member);
    request({
      url:'/api/v1/official/save',
      method:'POST',
      data:{
        phone,
        meal_date:moment(meal_date).format('YYYY-MM-DD'),
        content,
        meal_space,
        meal_type,
        meals,
        table_number,
        member,
        product
      },
      // data:{
      //   content:'111',
      //   meal_date:'2018-12-20',
      //   meal_space:"金瑞酒店",
      //   meal_type:'工作餐',
      //   member:1,
      //   phone:'13612285422',
      //   product:'公务接待',
      //   table_number:1,
      //   meals:'早餐,1111午餐,727272晚餐,3333'
      // },
      beforeSend:(xml) => {
        xml.setRequestHeader('token','3653410c3846638b3641df2585ecd749')
      },
      success: (res) => {
        console.log(res);
      }
    })
  }
  getData = (e) => {
    request({
      url:'/api/v1/official/list',
      method:'GET',
      success: (e) => {
        console.log(e.data)
      }
    })

  }
  render() {
    console.log(store);
    let {meal_date, content, meal_space, meal_type, premeals, table_number, member, product ,phone} = store;
    let breakfast = premeals.meal_first.length == 0 ? '' : premeals.meal_first + 'A早餐，' ;
    let lunch = premeals.meal_second.length == 0 ? '' : premeals.meal_second + 'A午餐，';
    let dinner = premeals.meal_third.length == 0 ? '' : premeals.meal_third + 'A晚餐';
    let mymeals = breakfast + lunch + dinner;
    console.log('mymeals',mymeals);
    return (
      <div>
            <List>
                <InputItem
                  placeholder="输入手机号"
                  onChange={(e) => {store.phone = e}}
                >手机号</InputItem>
                <DatePicker
                  mode="date"
                  title="Select Date"
                  extra="Optional"
                  value={store.meal_date}
                  onChange={date => store.meal_date = date}
                  onOk={date => store.mealdate = date}
                >
                  <List.Item arrow="horizontal">日期选择</List.Item>
                </DatePicker>
                <Picker 
                  data={products} 
                  cols={1} 
                  className="forss"
                  value={store.product}
                  onChange={(e) => {store.product = e}}
                  onOk={(e) => store.product = e}
                >
                  <List.Item arrow="horizontal">承办项目</List.Item>
                </Picker>
                <InputItem
                  placeholder="请输入业务内容"
                  onChange={(e) => {store.content = e}}
                >业务内容</InputItem>
                <Picker 
                  data={places} 
                  cols={1} 
                  className="forss"
                  value={store.meal_space}
                  onChange={(e) => {store.meal_space = e;}}
                  onOk={(e) => store.meal_space = e}
                >
                  <List.Item arrow="horizontal">餐饮地点</List.Item>
                </Picker>
                <InputItem
                  placeholder="输入人数"
                  onChange={(e) => {store.member = e}}
                >餐饮人数</InputItem>
                <Picker 
                  data={table_nums} 
                  cols={1} 
                  className="forss"
                  value={store.table_number}
                  onChange={(e) => {store.table_number = e}}
                >
                  <List.Item arrow="horizontal">桌数</List.Item>
                </Picker>
                <WingBlank size="lg">
                  <WhiteSpace size="lg" />
                  <Card>
                    <Card.Body>
                    {/* <List>
                      {meal_types.map(i => (
                        <RadioItem key={i.value} checked={store.meal_type === i.value} onChange={(e) => {store.meal_type = i.value}}>
                          {i.label}
                        </RadioItem>
                      ))}
                    </List> */}
                    <Flex style={{ padding: '15px' }}>
                      {meal_types.map((i) => (
                        <Flex.Item key={i.value}>
                        <Radio className='my-radio' checked={store.meal_type === i.value} onChange={(e) => {store.meal_type = i.value}}>{i.label}</Radio>
                        </Flex.Item>
                      ))}
                    </Flex>
                    <InputItem
                      placeholder="多个菜式请用、隔开"
                      onChange={(e) => {store.premeals.meal_first = e}}
                    >早餐菜式</InputItem>
                    <InputItem
                      placeholder="多个菜式请用、隔开"
                      onChange={(e) => {store.premeals.meal_second = e}}
                    >午餐菜式</InputItem>
                    <InputItem
                      placeholder="多个菜式请用、隔开"
                      onChange={(e) => {store.premeals.meal_third = e}}
                    >晚餐菜式</InputItem>


                    </Card.Body>
                  </Card>
                  <WhiteSpace size="lg" />
                </WingBlank>
                <WhiteSpace size="lg" />
                <Button style={{ position: 'fixed', width: '100%', bottom: 50 }} type="primary" onClick={this.handleData}>提交</Button>
                <WhiteSpace size="lg" />
                
            </List>
      </div>
    )
  }
}
export default Order