import React, { useReducer, useEffect } from 'react';
import axios from 'axios';
import './app.css';
import SearchInput from './components/SearchInput';
import WeatherInfo from './components/WeatherInfo';

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_WEATHER_DATA':
      return { ...state, weatherData: action.payload };
    case 'SET_QUERY':
      return { ...state, query: action.payload };
    case 'SET_RESULTS':
      return { ...state, results: action.payload };
    case 'SET_SHOW_DROPDOWN':
      return { ...state, showDropdown: action.payload };
    default:
      return state;
  }
};

const initialState = {
  weatherData: null,
  query: '',
  results: [],
  showDropdown: false,
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        dispatch({ type: 'SET_SHOW_DROPDOWN', payload: false });
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const handleChange = (event) => {
    const value = event.target.value;
    dispatch({ type: 'SET_QUERY', payload: value });

    if (value.length > 2) {
      fetchSuggestions(value);
      dispatch({ type: 'SET_SHOW_DROPDOWN', payload: true });
    } else {
      dispatch({ type: 'SET_RESULTS', payload: [] });
      dispatch({ type: 'SET_SHOW_DROPDOWN', payload: false });
    }
  };

  const fetchSuggestions = async (query) => {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${query}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      dispatch({ type: 'SET_RESULTS', payload: data });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSelect = (result) => {
    dispatch({ type: 'SET_QUERY', payload: result.display_name });
    dispatch({ type: 'SET_RESULTS', payload: [] });
    dispatch({ type: 'SET_SHOW_DROPDOWN', payload: false });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (state.query) {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${state.query}&appid=eebac2b236501ab0cfa5b85cc864e1f7`;
      try {
        const response = await axios.get(url);
        dispatch({ type: 'SET_WEATHER_DATA', payload: response.data });
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    }
  };

  return (
    <div className="app">
      <SearchInput
        query={state.query}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        results={state.results}
        showDropdown={state.showDropdown}
        handleSelect={handleSelect}
      />
      {state.weatherData ? (
        <WeatherInfo weatherData={state.weatherData} />
      ) : (
        <p className="message">Please enter a city name or search for a location and click "Search".</p>
      )}
    </div>
  );
}

export default App;