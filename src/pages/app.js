import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';



class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path='/useplace' render={()=> <WrapperComponent Comp={import('./UsePlace/bottomtab')} name='useplace' /> } />

          <Route path='/dinning' render={()=> <WrapperComponent Comp={import('./DinningAround/bottomtab')} name='entrance' /> } />
          <Route path='/reception' render={()=> <WrapperComponent Comp={import('./MeetingReception/bottomtab')} name='reception' /> } />
          <Route path='/' render={()=> <WrapperComponent Comp={import('./Entrance/Entrance')} name='entrance' /> } />
        </Switch>
      </div>
    )
  }
}

class WrapperComponent extends React.Component {
  state = {
    Comp: null
  }
  componentDidMount() {
    this.updateComp(this.props);
  }
  render() {
    let Comp = this.state.Comp;
    let { globalStore, match, history } = this.props;
    return Comp ? <Comp match={match} globalStore={globalStore} history={history} /> : Comp;
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.Comp !== this.props.Comp) {
      this.updateComp(nextProps);
    }
  }
  updateComp = (props) => {
    props.Comp.then(C => {
      this.setState({
        Comp: C.default
      })
    });
  }
}

export default App