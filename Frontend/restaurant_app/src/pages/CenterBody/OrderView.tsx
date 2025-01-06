import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-routing-machine';
import { useLocation } from 'react-router-dom';
import { websocketService } from '../../utils/websocketService';
import { useDriverLocationRetriever } from '../../utils/DriverLocationRetriever';
import { OrderDTO } from '../../data/api/modals/order';
import { renderActionButton, renderOrderStatus } from './OrderTable';
import ReactDOMServer from 'react-dom/server';
import { orderStatusMap } from '../../data/orderStatus';
import { formatDate } from '../../utils/date';
import MopedIcon from '@mui/icons-material/Moped';
import StorefrontIcon from '@mui/icons-material/Storefront';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import HomeIcon from '@mui/icons-material/Home';


const mapCenterRestaurantLocation  = { lat: 30.32649, lng: 78.042188 };

const OrderView: React.FC = () => {


  const mapRef = useRef<HTMLDivElement | null>(null);
  const currentUser = useSelector((state: any) => state.auth.userRole);
  const location = useLocation();
  const isUserDriver = currentUser === 'Driver';
  

  const order : OrderDTO  = location.state.order;

  const orderID = `${order.orderId}`;

  // Example driver ID
  const mapInstance = useRef<L.Map | null>(null);
  const [driverMarker, setDriverMarker] = useState<L.Marker | null>(null);
  const [driverLocation, setDriverLocation] = useState<L.LatLng | null>(null);
  const routingControl = useRef<L.Routing.Control | null>(null);

  const homeAddress  = { lat: order.latitude, lng: order.longitude };



  const createCustomIcon = (IconComponent: React.FC, color: string, size: string) => {
    const iconHtml = ReactDOMServer.renderToString(
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          backgroundColor: 'white',
          boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
          padding: '8px',
        }}
      >
        <IconComponent style={{ color, fontSize: size }} />
      </div>
    );

    return L.divIcon({
      className: 'custom-div-icon',
      html: iconHtml,
      iconSize: [40, 40],
      iconAnchor: [20, 20],
    });
  };

  const restaurantIcon = createCustomIcon(RestaurantIcon, 'green', '24px');
  const driverIcon = createCustomIcon(MopedIcon, 'green', '24px');
  const homeIcon = createCustomIcon(HomeIcon, 'green', '24px');



  // Use hook to retrieve and send the driver's location
  useDriverLocationRetriever(orderID, currentUser);

  useEffect(() => {
    // Connect to WebSocket
    websocketService.connect(orderID, (location) => { 
      const newLocation = L.latLng(location.latitude, location.longitude);
      const currentDestinationLocation = order.orderStatus < 3 ? mapCenterRestaurantLocation : homeAddress;
      setDriverLocation(newLocation);

      // Update driver's marker position
      if (driverMarker) {
        driverMarker.setLatLng(newLocation);
      } else if (mapInstance.current) {
        const newMarker = L.marker(newLocation, {icon : driverIcon}).addTo(mapInstance.current).bindPopup('Driver is here!');
        setDriverMarker(newMarker);
      }

      // Update route with new driver's position
      if (routingControl.current) {
        routingControl.current.setWaypoints([
          newLocation,
          L.latLng(currentDestinationLocation.lat, currentDestinationLocation.lng),
        ]);
      }
    });

   

    return () => {// Unsubscribe from WebSocket
      websocketService.disconnect(); // Disconnect WebSocket
    };
  }, [driverMarker, orderID]);


  useEffect(() => {
    // Initialize Leaflet map and routing control
    if (mapRef.current) {
      const map = L.map(mapRef.current, {
        center: mapCenterRestaurantLocation,
        zoom: 14,
      });
      mapInstance.current = map;
  
      // Add TileLayer to the map
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(map);
      


      // Add Routing Control
      const control = L.Routing.control({
        routeWhileDragging: false,
        show: isUserDriver, // Show instructions only if the user is a driver
        lineOptions: {
          styles: [
            {
              color: 'darkgreen', // Dark green color
              weight: 6,         // Thicker line
            },
          ],
        },
        createMarker: () => null
      }).addTo(map);


      routingControl.current = control;
      
      if(order.orderStatus < 3 ){

      L.polyline(
        [homeAddress, mapCenterRestaurantLocation],
         {
          color: 'black',           
          weight: 4,                
          opacity: 0.8,             
          dashArray: '10, 10',      
          lineJoin: 'round', 
         }
      ).addTo(map);
    }
  
      // Add a marker at the center of the map
     L.marker(mapCenterRestaurantLocation, {icon : restaurantIcon}).addTo(map).bindPopup('Restaurant is here!');
     
     L.marker(homeAddress, {icon : homeIcon}).addTo(map).bindPopup('Restaurant is here!');
  

      // Cleanup map on component unmount
      return () => {
        map.remove();
      };
    }
  }, []);


 

  // const sendRandomLocationUpdate = () => {
   
  //   try {
  //     // Generate random latitude and longitude
  //     const latitude : number = (Math.random() * 180 - 90); // Random latitude between -90 and 90
  //     const longitude : number  = (Math.random() * 360 - 180); // Random longitude between -180 and 180

  //     websocketService.emitDriverLocation(driverId,{latitude, longitude});
  //   } catch (exception) {
  //     console.error('Failed to send location update:', exception);
  //   }
  // };


  return (
    <div className="flex-1 p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-color-darkGreen mb-6">Track Your Order</h1>
      <div className="m-4 shadow-lg rounded-lg p-6 bg-white border border-gray-200">
  {/* Current Status Row */}
  <div className="mb-6">
    <h2 className="text-lg font-semibold text-green-800 mb-4">
      Order Details
    </h2>
    <div className="bg-lime-100 p-4 shadow-sm rounded-lg">
      <p className="text-gray-700">
        <strong className="text-green-900">Order ID:</strong> {order.orderId}
      </p>
      <p className="text-gray-700">
        <strong className="text-green-900">Order Status:</strong> {orderStatusMap.get(order.orderStatus)?.statusOfTheOrder}
      </p>
      <p className="text-gray-700">
        <strong className="text-green-900">Order Date:</strong> {formatDate(order.orderDate)}
      </p>
      <p className="text-gray-700">
        <strong className="text-green-900">Total Amount:</strong> ${order.totalAmount}
      </p>
    </div>
  </div>

  {/* Buttons */}
  <div className="flex justify-center">
    {isUserDriver && (
      <div className="flex flex-col items-center">
        <p className="text-gray-600 mb-2">Take Action:</p>
        {renderActionButton(order.orderStatus, currentUser)}
      </div>
    )}
    {!isUserDriver && (
      <div className="flex flex-col items-center">
        <p className="text-gray-600 mb-2">Order Progress:</p>
        {renderOrderStatus(order.orderStatus)}
      </div>
    )}
  </div>
</div>


      <div 
        ref={mapRef} // Use mapRef to bind the map container
        style={{ height: '600px', width: '100%'}}
      />

      {/* <button
        onClick={sendRandomLocationUpdate}
        className={`mt-4 px-4 py-2 rounded text-white  bg-blue-600`}
      >
        Send Random Location Update
      </button> */}

    </div>
  );
};


export default OrderView;
