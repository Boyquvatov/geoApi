import { useState, useEffect } from 'react';
import axios from 'axios';
import Leaflet from './leaflet';
import "./App.css"

const App = () => {
  const [ipData, setIpData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ipAddress, setIpAddress] = useState('213.230.97.152'); 
  const [inputIp, setInputIp] = useState(''); 

  useEffect(() => {
    const fetchIpData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://geo.ipify.org/api/v2/country,city', {
          params: {
            apiKey: 'at_FrrOcRReRJ458Dsqfd7SSQMSGJowT',  
            ipAddress: ipAddress
          }
        });
        setIpData(response.data);
        setError(null);
      } catch (err) {
        setError(err);
        setIpData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchIpData();
  }, [ipAddress]); 

  const handleSubmit = (e) => {
    e.preventDefault();
    setIpAddress(inputIp);
  };

  if (loading) return <div className="loader"></div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container m-2">
      <h1>IP Information</h1>
      <form onSubmit={handleSubmit} className="space-y-4 mb-3">
        <input 
          type="text" 
          value={inputIp}
          onChange={(e) => setInputIp(e.target.value)}
          placeholder="Enter IP address"
          className="p-2 border border-gray-300 rounded mr-3"
        />
        <button type="submit" className="btn btn-success bg-green-500 text-white p-2 rounded">
          Get Info
        </button>
      </form>

      {ipData && (
        <div>
          <p><strong>IP Address:</strong> {ipData.ip}</p>
          <p><strong>Country:</strong> {ipData.location.country}</p>
          <p><strong>City:</strong> {ipData.location.region}</p>
          <p><strong>Latitude:</strong> {ipData.location.lat}</p>
          <p><strong>Longitude:</strong> {ipData.location.lng}</p>
          <p><strong>ISP:</strong> {ipData.isp}</p>
        </div>
      )}

      <div>
        <Leaflet data={ipData} />
      </div>
    </div>
  );
};

export default App;
