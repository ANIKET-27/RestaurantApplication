import { Client } from '@stomp/stompjs';

class WebSocketService {
  private clientPublish: Client | null = null;
  private clientSubscribe: Client | null = null;

  // Connect to WebSocket Server
  connect(driverId : string,
    onLocationUpdate: (location: { latitude: number; longitude: number }) => void
  ) {
    this.clientSubscribe = new Client({
      brokerURL: 'ws://localhost:8080/ws',
      reconnectDelay: 5000,
      debug: (msg) => console.log('WebSocket Debug:', msg),
      onConnect: () => {
        console.log('Aniketx connected to WebSocket Subscriber');
          
           this.clientSubscribe?.subscribe(`/topic/driver/${driverId}/location`, (message) => {
            const { latitude, longitude } = JSON.parse(message.body);
            onLocationUpdate({latitude,longitude});
          });

      },
      onDisconnect: () => console.log('Disconnected from WebSocket'),
      onStompError: (frame) => {
        console.error('STOMP Error:', frame.body);
      },
    });
    this.clientSubscribe.activate();
  }

  // Emit Driver's Location
  emitDriverLocation(driverId: string, location: { latitude: number; longitude: number }) {
    const message = JSON.stringify({ latitude: location.latitude, longitude: location.longitude });
  
    // Check if the clientPublish is already initialized
    // if (!this.clientPublish) {
      // Initialize the WebSocket client only once if it doesn't exist
      
      this.clientPublish = new Client({
        brokerURL: 'ws://localhost:8080/ws',
        reconnectDelay: 5000,
        debug: (msg) => console.log('WebSocket Debug:', msg),
        onConnect: () => {
          console.log('Aniketx connected to WebSocket Publish');
  
          // Publish the location once connected
          this.clientPublish?.publish({
            destination: `/app/driver/${driverId}/updateLocation`,
            body: message,
          });
        },
        onDisconnect: () => console.log('Disconnected from WebSocket'),
        onStompError: (frame) => {
          console.error('STOMP Error:', frame.body);
        },
      });
  
      // Activate the WebSocket connection
      this.clientPublish.activate();
    }
    // else {
    //   // If clientPublish already exists, just publish the location
    //   this.clientPublish?.publish({
    //     destination: `/app/driver/${driverId}/updateLocation`,
    //     body: message,
    //   });
    // }
  // }
  

  // Subscribe to Driver Location Updates
  // subscribeToDriverLocation(
  //   driverId: string,
  //   onLocationUpdate: (location: { latitude: number; longitude: number }) => void
  // ) {
  //   if (!this.client || !this.client.connected) {
  //     console.warn('WebSocket client is not connected or inactive.');
  //     return;
  //   }
  
  //   const destination = `/topic/driver/${driverId}/location`;
  //   console.log(`Attempting to subscribe to: ${destination}`);
  
  //   const subscription = this.client.subscribe(destination, (message) => {
  //     console.log(`Message received from ${destination}:`, message.body);
  //     try {
  //       const location = JSON.parse(message.body);
  //       onLocationUpdate(location);
  //     } catch (error) {
  //       console.error('Error parsing location message:', error);
  //     }
  //   });
  
  //   if (subscription) {
  //     console.log(`Successfully subscribed to: ${destination}`);
  //   } else {
  //     console.error(`Failed to subscribe to: ${destination}`);
  //   }
  // }
  
  disconnect() {
    // if (this.clientPublish) {
    //   this.clientPublish.deactivate();
    //   console.log('WebSocket disconnected.');
    // }
  }
}

export const websocketService = new WebSocketService();
