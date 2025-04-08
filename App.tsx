import React, { useState } from 'react';
import { Cloud, AlertCircle } from 'lucide-react';
import { SearchBar } from './components/SearchBar';
import { WeatherCard } from './components/WeatherCard';
import { SearchHistory } from './components/SearchHistory';
import type { WeatherData, SearchHistoryItem } from './types';

const API_KEY = '7d256273575cd1f4cb37e83a3e0a45e9'; // Free API key for demo purposes

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);

  const fetchWeather = async (city: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error(
          response.status === 404
            ? 'City not found'
            : 'Failed to fetch weather data'
        );
      }

      const data = await response.json();
      setWeatherData(data);

      // Update search history
      setSearchHistory((prev) => {
        const newHistory = [
          { city, timestamp: Date.now() },
          ...prev.filter((item) => item.city !== city),
        ].slice(0, 5);
        return newHistory;
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100">
      <div 
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] opacity-10 bg-cover bg-center"
        style={{ zIndex: 0 }}
      />
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center gap-3 mb-10">
            <Cloud className="text-emerald-600" size={40} />
            <h1 className="text-4xl font-bold text-emerald-900 tracking-tight">Weather Dashboard</h1>
          </div>

          <div className="w-full max-w-xl backdrop-blur-sm bg-white/30 p-8 rounded-2xl shadow-lg border border-white/20">
            <SearchBar onSearch={fetchWeather} isLoading={loading} />
            <SearchHistory history={searchHistory} onSelect={fetchWeather} />

            <div className="mt-8 w-full">
              {loading ? (
                <div className="animate-pulse bg-white/50 rounded-xl shadow-lg p-6 w-full">
                  <div className="h-8 bg-emerald-200/50 rounded w-3/4 mb-4"></div>
                  <div className="h-48 bg-emerald-200/50 rounded mb-4"></div>
                  <div className="h-20 bg-emerald-200/50 rounded"></div>
                </div>
              ) : error ? (
                <div className="bg-red-50/80 text-red-600 p-4 rounded-lg flex items-center gap-2">
                  <AlertCircle size={20} />
                  <p>{error}</p>
                </div>
              ) : (
                weatherData && (
                  <WeatherCard
                    data={weatherData}
                    onRefresh={() => fetchWeather(weatherData.name)}
                  />
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;