// @flow
import React, { Component } from 'react';
import { NavigationExperimental, StyleSheet } from 'react-native';

import { connect } from 'react-redux';
// import { actions } from 'react-native-navigation-redux-helpers';

import type { ReduxState } from '../../reducers';
import Home from '../../components/Home';

// const { popRoute } = actions;
const { CardStack: NavigationCardStack } = NavigationExperimental;

function mapStateToProps(state: ReduxState) {
  return {
    navigation: state.navigation,
  };
}

type Props = {
  navigation: any,
};

class Navigation extends Component {
  props: Props;

  constructor(props: Props) {
    super(props);

    this.renderHeader = this.renderHeader.bind(this);
    this.renderScene = this.renderScene.bind(this);
  }

  render() {
    return (
      <NavigationCardStack
        onNavigate={this.handleNavigate}
        style={styles.main}
        navigationState={this.props.navigation}
        renderHeader={this.renderHeader}
        renderScene={this.renderScene}
      />
    );
  }

  handleNavigate = () => {
    return null;
  };

  renderScene = () => {
    return <Home/>;
  };

  renderHeader = () => {
    return null;
  };
}

export default connect(mapStateToProps)(Navigation);

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
  },
});
