import React from 'react';
import { Droplets, Wind, RefreshCw } from 'lucide-react';
import type { WeatherData } from '../types';

interface WeatherCardProps {
  data: WeatherData;
  onRefresh: () => void;
}

export function WeatherCard({ data, onRefresh }: WeatherCardProps) {
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-8 w-full">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-3xl font-bold text-emerald-900">{data.name}</h2>
          <p className="text-emerald-600 capitalize mt-1">{data.weather[0].description}</p>
        </div>
        <button
          onClick={onRefresh}
          className="text-emerald-500 hover:text-emerald-700 p-2 rounded-full hover:bg-emerald-50 transition-all duration-200"
          aria-label="Refresh weather data"
        >
          <RefreshCw size={22} />
        </button>
      </div>

      <div className="flex items-center justify-center my-8">
        <img
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
          alt={data.weather[0].description}
          className="w-32 h-32"
        />
        <div className="text-6xl font-bold text-emerald-900 ml-4">
          {Math.round(data.main.temp)}°C
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-8">
        <div className="flex items-center bg-emerald-50/50 p-4 rounded-xl">
          <Droplets className="text-emerald-500 mr-3" size={24} />
          <div>
            <p className="text-sm text-emerald-600">Humidity</p>
            <p className="text-xl font-semibold text-emerald-900">{data.main.humidity}%</p>
          </div>
        </div>
        <div className="flex items-center bg-emerald-50/50 p-4 rounded-xl">
          <Wind className="text-emerald-500 mr-3" size={24} />
          <div>
            <p className="text-sm text-emerald-600">Wind Speed</p>
            <p className="text-xl font-semibold text-emerald-900">{data.wind.speed} km/h</p>
          </div>
        </div>
      </div>
    </div>
  );
}