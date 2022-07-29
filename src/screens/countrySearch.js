import React, { useState, useCallback } from "react";
import { View, ActivityIndicator, TextInput,Text, Button, StyleSheet } from 'react-native';
import { API_KEY, API_URL } from "../utils";
import axios from "axios";

const CountrySearch = ({ navigation }) => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(false);
  const {name, sys, main} = weatherData;

  const handleWeatherData = useCallback(() => {
    setLoading(true);
    setCity('');
    axios({
      method: 'GET',
      url: `${API_URL}q=${city}&appid=${API_KEY}&units=metric`
    })
    .then(response => setWeatherData(response.data))
    .catch((e)=> console.log(e))
    .finally(() => setLoading(false))
  },[city]);

  return (
    <View style={styles.container}>
      <View>
        <TextInput
            placeholder="Enter City"
            onChangeText={text => setCity(text)}  
            onSubmitEditing={handleWeatherData}
            value={city}
            style={styles.textInput}
          />
      </View>
      { 
        loading && 
          <View>
            <ActivityIndicator size={'large'} color='#000'/>
          </View>
      }
      { 
        name && 
          <View style={styles.cityInfo}>
            <Text style={styles.cityText}>
              {`${name} ${sys.country}`}
            </Text>
            <Text style={styles.dateText}> {new Date().toLocaleString()}</Text>
            <Text style={styles.tempText}> {`${Math.round(main.temp)}°`}</Text>
            <Text style={styles.tempMinMaxText}> {`Min ${Math.round(main.temp_min)}° Max ${Math.round(main.temp_max)}°`}</Text>
          </View>
      } 
      <View style={styles.locationSearchButton}>
      <Button
          title="Location Search"
          onPress={() => navigation.navigate('LocationSearch')}
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
  textInput: {
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
  locationSearchButton: {
    marginTop: 500, 
    left: 130,
    position: 'absolute'
  }
});

export default CountrySearch;