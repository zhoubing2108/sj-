import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { TabBar } from 'antd-mobile';
import MyMeeting from './myEntrance';
import { observer } from 'mobx-react';
import st from './entrance.css';
import Order from './meeting_reception';

const tabs = [
  { title: '申请' },
  { title: '我的' },
];



@observer
class Meeting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'redTab',
      hidden: false,
      fullScreen: true,
    };
  }
  renderContent(pageText) {
    return (
      <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
        <div style={{ paddingTop: 60 }}>Clicked “{pageText}” tab， show “{pageText}” information</div>
        <a style={{ display: 'block', marginTop: 40, marginBottom: 20, color: '#108ee9' }}
          onClick={(e) => {
            e.preventDefault();
            this.setState({
              hidden: !this.state.hidden,
            });
          }}
        >
          Click to show/hide tab-bar
        </a>
        <a style={{ display: 'block', marginBottom: 600, color: '#108ee9' }}
          onClick={(e) => {
            e.preventDefault();
            this.setState({
              fullScreen: !this.state.fullScreen,
            });
          }}
        >
          Click to switch fullscreen
        </a>
      </div>
    );
  }

  render() {
    return (
      <div style={this.state.fullScreen ? { position: 'fixed', height: '100%', width: '100%', top: 0 } : { height: 400 }}>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          hidden={this.state.hidden}
        >
          <TabBar.Item
            title="申请"
            key="apply"
            icon={<div className={st.unSelectedIcon} />
            }
            selectedIcon={
              <div className={st.selectedIcon}
              />
            }
            selected={this.state.selectedTab === 'blueTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'blueTab',
              });
            }}
            data-seed="logId"
          >
            <Order />
          </TabBar.Item>
          <TabBar.Item
            icon={
              <div className={st.mineSelectedIcon}
              />
            }
            selectedIcon={
              <div className={st.unMineSelectedIcon}
              />
            }
            title="我的"
            key="mine"
            selected={this.state.selectedTab === 'redTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'redTab',
              });
            }}
            data-seed="logId1"
          >
            <MyMeeting />
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}

export default withRouter(Meeting);