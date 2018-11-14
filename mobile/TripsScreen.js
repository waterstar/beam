import React from 'react';
import { View, ListView, StyleSheet, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import { getTrips } from './reducer';

class Trips extends React.Component {

    static navigationOptions = {
        title: 'My Trips History',
        headerStyle: {
            backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        }
    };

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = { dataSource: ds };
    }

    componentWillMount() {
        this.props.getTrips();
    }

    componentWillReceiveProps(nextProps) {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({dataSource: ds.cloneWithRows(nextProps.trips)})
    }

    render() {
        return (
        <ListView
            style={styles.container}
            dataSource={this.state.dataSource}
            renderRow={(data) => <Row {...data} />}
            renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
            renderHeader={() => <Header />}
        />
        );
    }
}

const Row = (props) => (
  <View style={styles.rowContainer}>
    <Text style={styles.dateText}>
      { props.date }
    </Text>
    <Text style={styles.rowText}>
      { props.duration }
    </Text>
    <Text style={styles.rowText}>
      ${ parseFloat(1 + props.duration * 0.15).toFixed(2)  }
    </Text>
  </View>
);

const Header = (props) => (
    <View style={{flex:1, 
        flexDirection:'row', 
        justifyContent:'center',
        alignItems:'center',
        height:36, 
        backgroundColor:'darkgreen'}}>
    <Text style={styles.headerText}>
        Date
    </Text>
    <Text style={styles.headerText}>
        Duration(min)
    </Text>
    <Text style={styles.headerText}>
        Cost
    </Text>
    </View>
  );

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
  rowContainer: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowText: {
    flex: 1,
    fontSize: 16,
    textAlign:'center'
  },
  dateText: {
    flex: 1,
    fontSize: 16,
    textAlign:'left'
  },
  headerText: {
    flex: 1,
    fontSize: 16,
    textAlign:'center',
    color:'white'
  },
});

const mapStateToProps = state => {
    return {
      trips: state.trips
    };
};
  
const mapDispatchToProps = {
  getTrips
};
  
export default connect(mapStateToProps, mapDispatchToProps)(Trips);