import { useState, useEffect } from 'react';
import { websocketService } from './websocketService';

export const useDriverLocationRetriever = (
  driverId: string,
  user: string,
) => {
  const [isPermissionGranted, setIsPermissionGranted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const requestLocationPermission = async () => {
      if ('geolocation' in navigator) {
        // First, get the initial position
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const location = { latitude, longitude };
            console.log("Initial Driver Location:", location);
            
            // Emit initial location immediately
            // websocketService.emitDriverLocation(driverId, location);
            setIsPermissionGranted(true);
  
            // Emit the location every 10 seconds
            const intervalId = setInterval(() => {
              console.log("Emitting Driver Location Every 10 Seconds");
              websocketService.emitDriverLocation(driverId, location); // Emit the same location
            }, 10000); // 10 seconds interval
  
            // Cleanup the interval when the component unmounts or user changes
            return () => clearInterval(intervalId);
          },
          (err) => {
            setError(err.message);
            setIsPermissionGranted(false);
          }
        );
      } else {
        setError('Geolocation is not supported by your browser.');
      }
    };
  
    if (user === 'Driver') requestLocationPermission();
  }, [user, driverId]);

  return { isPermissionGranted, error };
};

 export default { useDriverLocationRetriever };