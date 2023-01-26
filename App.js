import React  from 'react';
import { useState,useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Button,Image,NativeModules, TextInput, View,Text,StyleSheet,FlatList,ScrollView, Alert, TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const Tab = createBottomTabNavigator();

function HomeScreen() {
  const [fruits, setFruits] = useState(null);

  useEffect(() => {
    fetch("http://192.168.42.90:8080/fruits")
    .then(Response => Response.json())
    .then((reponseJson) => {
      console.log('getting data from fetch',reponseJson);
      setFruits(reponseJson);
    })
    .catch(error => console.log(error));
  }, [])


  var fotos = [
    {name:"pera",photo: "https://cdn-icons-png.flaticon.com/512/1202/1202078.png"},
    {name:"naranja",photo: "https://images.vexels.com/media/users/3/143191/isolated/preview/925871db899c05172adae868b7ca93c0-icono-de-color-naranja.png"},
    {name:"piña",photo: "https://img.lovepik.com/free-png/20210919/lovepik-pineapple-png-image_400360363_wh1200.png"},
    {name:"manzana",photo:"https://toppng.com/uploads/preview/manzana-png-imagen-de-manzana-11563323571ka8dg9tooe.png"},
    {name:"melocoton" ,photo: "https://images.vexels.com/media/users/3/262151/isolated/preview/40e219b64f8e6354ae89ceca40155181-alimento-plano-de-melocota-n.png"},
    {name:"uva" ,photo: "https://static.vecteezy.com/system/resources/previews/009/596/910/original/grape-fruit-illustration-cartoon-png.png"},
    {name:"kiwi" ,photo: "https://cdn.pixabay.com/photo/2012/04/16/13/31/kiwi-36015_1280.png"}
  ]
  var defaul = [
    {name:"def",photo: "https://img.freepik.com/vector-gratis/coleccion-iconos-coloridos-frutas-bayas_1284-20043.jpg?w=2000"}
  ]

  const printElement = ({item}) => {

    const img = fotos.find(({ name }) => name === item.name) == undefined? defaul.find(({name})=> name == "def") : fotos.find(({ name }) => name == item.name) ;


    return(
      <ScrollView style={styles.container} 
                  contentContainerStyle ={{flexDirection:'row'}}>
          <Text style={styles.textCenter}>
            Nombre: 
            <Text style={{color:'orange'}}>
              {item.name}
            </Text>
          </Text>
          <Text style={styles.textCenter}>
            Precio: 
            <Text style={{color:'blue'}}>
              {item.price}€
            </Text>
          </Text>
          <Image style={{width:70,height:70,margin:5,marginLeft:30}} 
                 source ={{uri: img.photo}}/>
      </ScrollView>
    )
  }

return(
      <FlatList data={fruits} renderItem = {printElement}/>
  )
}



function AddScreen() {

  const [Text, onChangeText] = React.useState('');
  const [Precio, onChangeTextPrecio] = React.useState('');
  
  
  return(
    <View style={{ flex: 1, alignItems: "center",marginTop:50}}>

      <TextInput style={styles.input}
                onChangeText={onChangeText}
                value={Text}
                placeholder={"Nombre"}
      
      />

      <TextInput style={styles.input}
                onChangeText={onChangeTextPrecio}
                value={Precio}
                placeholder={"Precio"}
      
      />

      <Button style={{marginTop:20, borderRadius:20,width:300,}}
      onPress = {() => Add(Text,Precio)}
      title="                        aniadir Fruta                        "
      
     />
   


    </View>
    
  )

}

function Add(Text,Precio) {

  let data = {
    method: 'POST',
    body: JSON.stringify({
      name: Text,
      price: Precio
    }),
    headers: {
      'Accept':       'application/json',
      'Content-Type': 'application/json',
    }
  }
  return (fetch('http://192.168.42.90:8080/fruits', data)
          .then(response => response.json()) 
          .catch(error => console.log(error)),
          NativeModules.DevSettings.reload()
      );   
  } 

function App(){
  
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Listado') {
              iconName = focused
                ? 'ios-list-sharp'
                : 'ios-list-outline';
            } else if (route.name === 'Anadir') {
              iconName = focused ? 'add-sharp' : 'add-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'green',
          tabBarInactiveTintColor: 'gray',
        })}>   
        <Tab.Screen name="Listado" component={HomeScreen} />
        <Tab.Screen name="Anadir" component={AddScreen}/>
      </Tab.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container:{
    margin: 8,
    backgroundColor: 'white',
    borderWidth: 4,
    borderColor:'gray',
    borderRadius:70,
    display:'flex',
    
  },

  textCenter:{
  fontFamily: 'Verdana',
  fontWeight: 'bold',
  alignSelf:'center',
  fontSize: 14,
  marginLeft: 10
  
},


  textLeft:{fontFamily: 'Verdana',
  fontWeight: 'bold',
  fontSize: 12

  },
  nombre:{
    
  },


  input:{
    height:40,width:300,margin:12,padding:10,borderWidth:3,borderRadius:10,
                      borderColor:'gray'}
})

export default App;
