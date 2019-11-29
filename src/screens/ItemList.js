import React, { Component } from 'react';
import { Text, StyleSheet,ScrollView } from 'react-native';
import ItemComponent from '../components/ItemComponent';

import { db } from '../config/config';

let itemsRef = db.ref('/shopitemlist');

export default class ItemList extends Component {
  state = {
    items: []
  };

  componentDidMount() {
    itemsRef.on('value', snapshot => {
      let data = snapshot.val();
      let items = Object.values(data);
      this.setState({ items });
    });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {this.state.items.length > 0 ? (
          <ItemComponent items={this.state.items} />
        ) : (
          <Text>No items</Text>
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#101357'
  }
});