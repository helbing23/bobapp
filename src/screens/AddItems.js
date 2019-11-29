import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  Alert,
  TextInput
} from 'react-native';

//import MultiSelect from 'react-native-multiple-select';
//import NumericInput from 'react-native-numeric-input';
import SearchableDropdown from 'react-native-searchable-dropdown';

import { db } from '../config/config';

let tasksRef = db.ref('/items');
let botRef = db.ref('/bottles');


export default class AddItems extends Component {
  static navigationOptions = {
    title: 'Add Items',
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
      dataSource: [],
      bottleType:[],
      selectedItem:'',
      bottle_type: '',
      quantity: '',
      note: '',
    };
  }

  componentDidMount() {
    tasksRef.on("value", dataSnapshot => {
     var tasks = [];
     dataSnapshot.forEach(child => {
       tasks.push({
         name: child.val().name,
       });
     });

     this.setState({
       dataSource: tasks
     });
   });

   botRef.on("value", dataSnapshot => {
    var tasks = [];
    dataSnapshot.forEach(child => {
      tasks.push({
        name: child.val().bot,
      });
    });

    this.setState({
      bottleType: tasks
    });
  });
 }

  handleSubmit = () => {

    const { navigation } = this.props; 

    const shop_name = navigation.getParam('shop_name'); 

    let date = new Date().getDate(); //Current Date

    let month = new Date().getMonth() + 1; //Current Month

    let year = new Date().getFullYear(); //Current Year

    db.ref('/shopitemlist').push({
      items: this.state.selectedItem,
      shop_name:JSON.stringify(shop_name),
      order_date: date +'/'+ month +'/'+ year,
      bottle_type: this.state.bottle_type,
      quantity: this.state.quantity,
      note: this.state.note,
    });
    Alert.alert('Item saved successfully');
  };

  onSelectedItemChange = selectedItem => {
    this.setState({ selectedItem });
    //Set Selected Items
  };

  onSelectedbotChange = bottle_type => {
    this.setState({ bottle_type });
    //Set Selected Items
  };

  render() {
    const { navigation } = this.props; 
    const shop_name = navigation.getParam('shop_name', 'NO-Shops'); 
    const { selectedItem } = this.state;
    const { bottle_type } = this.state;
    return (
      <View style={styles.main}>
        <Text style={styles.title}>Add Item for {JSON.stringify(shop_name)}</Text>
        <SearchableDropdown
            onItemSelect={this.onSelectedItemChange}
            selectedItems={selectedItem}
            containerStyle={{ padding: 5 }}
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
            items={this.state.dataSource}
            defaultIndex={2}
            resetValue={false}
            textInputProps={
              {
                placeholder: "Add items ...",
                underlineColorAndroid: "transparent",
                style: {
                    height: 45,
                    padding: 12,
                    marginRight: 5,
                    fontSize: 18,
                    borderWidth: 1,
                    borderColor: 'white',
                    borderRadius: 8,
                    color: 'white',
                    alignSelf: 'stretch'
                },
                onTextChange: selectedItem => console.log(selectedItem)
              }
            }
            
            listProps={
              {
                nestedScrollEnabled: true,
              }
            }
          />
          <SearchableDropdown
            onItemSelect={this.onSelectedbotChange}
            selectedItems={bottle_type}
            containerStyle={{ padding: 5 }}
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
            items={this.state.bottleType}
            defaultIndex={2}
            resetValue={false}
            textInputProps={
              {
                placeholder: "Add Bottle types ...",
                underlineColorAndroid: "transparent",
                style: {
                    height: 45,
                    padding: 12,
                    marginRight: 5,
                    fontSize: 18,
                    borderWidth: 1,
                    borderColor: 'white',
                    borderRadius: 8,
                    color: 'white',
                    alignSelf: 'stretch'
                },
                onTextChange: bottle_type => console.log(bottle_type)
              }
            }
            
            listProps={
              {
                nestedScrollEnabled: true,
              }
            }
          />
          <TextInput  
            placeholder="Quantity required..."  
            underlineColorAndroid='transparent'  
            style={styles.TextInputStyle}  
            keyboardType={'numeric'}
            onChangeText={quantity => this.setState({ quantity })}
          />
          <TextInput  
            placeholder="Add note..."  
            underlineColorAndroid='transparent'  
            style={styles.NoteInputStyle}  
            onChangeText={note => this.setState({ note })}
          /> 
        <TouchableHighlight
          style={styles.button}
          underlayColor="white"
          //onPress={textInput.CheckTextInputIsEmptyOrNot}
          onPress={this.handleSubmit}
        >
          <Text style={styles.buttonText}>Add</Text>
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
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    margin: 5,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  TextInputStyle: {  
    height: 45,
    padding: 12,
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white',
    flexDirection: 'row',
    margin: 5,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  NoteInputStyle: {  
    height: 70,
    padding: 12,
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white',
    flexDirection: 'row',
    margin: 5,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }   
});