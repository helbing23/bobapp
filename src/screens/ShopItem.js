import React, { Component } from 'react';
import SearchableDropdown from 'react-native-searchable-dropdown';
import { View, Text , StyleSheet,TouchableHighlight } from 'react-native';

import { db } from '../config/config';


let shopsRef = db.ref('/shops');

 
export default class ShopItem extends Component {
  static navigationOptions = {
    title: 'Select Shop',
    headerStyle: {
      backgroundColor: '#101357',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      color: '#fff',
      textAlign: 'center'

    },
  };
  constructor(props) {
    super(props);
    this.state = {
      shopSource: [], //db.ref('/shops');
      selectedShops: ''
    }
  }

  componentDidMount() {
    shopsRef.on("value", dataSnapshot => {
     var shops = [];
     dataSnapshot.forEach(child => {
       shops.push({
         name: child.val().shop_name,
         key: child.key
       });
     });

     this.setState({
      shopSource: shops
     });
   });
  }

  onSelectedShopsChange = selectedShops => {
    this.setState({ selectedShops });
    //Set Selected Items
  };

  render() {
    const { selectedShops } = this.state;
  return (
        <View style={styles.main}>
            {/* Single */}
          <SearchableDropdown
            onItemSelect={this.onSelectedShopsChange}
            selectedItems={selectedShops}
            containerStyle={{ padding: 5 }}
            onRemoveItem={(item, index) => {
              const selectedShops = this.state.selectedItems.filter((sitem) => sitem.id !== item.id);
              this.setState({ selectedItems: selectedShops });
            }}
            itemStyle={{
              padding: 10,
              marginTop: 2,
              backgroundColor: '#ddd',
              borderColor: '#bbb',
              borderWidth: 1,
              borderRadius: 5,
            }}
            itemTextStyle={{ color: '#222' }}
            itemsContainerStyle={{ maxHeight: 173 }}
            items={this.state.shopSource}
            defaultIndex={this.state.selectedindex}
            resetValue={false}
            textInputProps={
              {
                placeholder: "select shops ...",
                underlineColorAndroid: "transparent",
                style: {
                    padding: 12,
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 5,
                    color:'#ccc',
                },
                onTextChange: selectedShops => console.log(selectedShops)
              }
            }
            listProps={
              {
                nestedScrollEnabled: true,
              }
            }
        />
          <TouchableHighlight
            style={styles.button}
            underlayColor="white"
            onPress={() => this.props.navigation.navigate('AddItems', {  
              shop_name: selectedShops.name})  }
          >
            <Text style={styles.buttonText}>Go</Text>
          </TouchableHighlight>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 25,
    flexDirection: 'column',
    backgroundColor: '#101357'
  },
  

  buttonText: {
    fontSize: 20,
    color: '#111',
    alignSelf: 'center'
    
  },
  button: {
      height: 30,
      width:'20%',
      flexDirection: 'column',
      backgroundColor: 'white',
      borderColor: 'white',
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: 10,
      marginTop: 10,
      alignSelf: 'center',
      justifyContent: 'center'
  }
});