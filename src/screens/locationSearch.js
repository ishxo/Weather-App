import React, { useState, useCallback } from "react";
import { View, ActivityIndicator, TextInput, Text, Button, StyleSheet } from 'react-native';
import { API_KEY, API_URL } from "../utils";
import axios from "axios";

const LocationSearch = () => {
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(false);

  const {name, sys, main, id} = weatherData;

  const handleWeatherDataWithLocation = useCallback(() => {
      setLoading(true);
      setLatitude('');
       setLongitude('')
    axios({
      method: 'GET',
      url: `${API_URL}lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    })
    .then(response => setWeatherData(response.data))
    .catch((e)=> console.log(e))
    .finally(() => setLoading(false))
  },[latitude, longitude]);

  return (
    <View style={styles.container}>
      <View>
        <TextInput
            placeholder="Enter City longitude"
            onChangeText={text => setLongitude(text)}  
            value={longitude}
            style={styles.longitudeTextInput}
          />
          <TextInput
            placeholder="Enter City latitude"
            onChangeText={text => setLatitude(text)}  
            value={latitude}
            style={styles.latitudeTextInput}
          />
      </View>
     {
        loading && 
          <View>
            <ActivityIndicator size={'large'} color='#000'/>
          </View>
      }
      { 
        main && 
          <View style={styles.cityInfo}>
        {  name &&  <Text style={styles.cityText}>
              {`${name } ${sys.country}`}
            </Text>}
            <Text style={styles.dateText}> {new Date().toLocaleString()}</Text>
            <Text style={styles.tempText}> {`${Math.round(main.temp)}°`}</Text>
            <Text style={styles.tempMinMaxText}> {`Min ${Math.round(main.temp_min)}° Max ${Math.round(main.temp_max)}°`}</Text>
          </View>
      } 
      <View style={styles.searchButton}>
        <Button
          title="Search"
          onPress={handleWeatherDataWithLocation}
        />
    </View>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    flexDirection: 'column'
  },
  longitudeTextInput: {
    backgroundColor: 'fff',
    borderRadius: 10,
    marginVertical: 30,
    marginHorizontal:20,
    fontSize: 20,
    borderWidth: 1,
    padding: 15
  },
  latitudeTextInput: {
    backgroundColor: 'fff',
    borderRadius: 10,
    marginVertical: 30,
    marginHorizontal:20,
    fontSize: 20,
    borderWidth: 1,
    padding: 15
  },
  cityInfo: {
    alignItems: 'center',
  },
  cityText: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  dateText: {
    marginVertical: 8,
    fontSize: 20
  },
  tempText: {
    marginVertical: 8,
    fontSize: 35
  },
  tempMinMaxText: {
    fontSize: 20,
    marginVertical: 8,
    fontWeight: '700'
  },
  searchButton: {
    marginTop: 500, 
    left: 150,
    position: 'absolute', 
    borderWidth: 3, 
    borderRadius: 7,
    borderColor:'#000'
  }
 
});


export default LocationSearch;