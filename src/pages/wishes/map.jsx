import React, { useState } from "react";
import { GoogleMap, InfoWindow, MarkerF, Marker } from "@react-google-maps/api";

const exampleMapStyles = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#ebe3cd",
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#523735",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#f5f1e6",
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#c9b2a6",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#dcd2be",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#ae9e90",
      },
    ],
  },
  {
    featureType: "landscape.natural",
    elementType: "geometry",
    stylers: [
      {
        color: "#dfd2ae",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [
      {
        color: "#dfd2ae",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#93817c",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#a5b076",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#447530",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        color: "#f5f1e6",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [
      {
        color: "#fdfcf8",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#f8c967",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#e9bc62",
      },
    ],
  },
  {
    featureType: "road.highway.controlled_access",
    elementType: "geometry",
    stylers: [
      {
        color: "#e98d58",
      },
    ],
  },
  {
    featureType: "road.highway.controlled_access",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#db8555",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#806b63",
      },
    ],
  },
  {
    featureType: "transit.line",
    elementType: "geometry",
    stylers: [
      {
        color: "#828ffe",
      },
    ],
  },
  {
    featureType: "transit.line",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#8f7d77",
      },
    ],
  },
  {
    featureType: "transit.line",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#ebe3cd",
      },
    ],
  },
  {
    featureType: "transit.station",
    elementType: "geometry",
    stylers: [
      {
        color: "#dfd2ae",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#363d7e",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#92998d",
      },
    ],
  },
];

function Map({ markers }) {
  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  //   console.log(activeMarker);
  const handleOnLoad = (map) => {
    const bounds = new window.google.maps.LatLngBounds();
    markers.forEach((wish) => {
      return bounds.extend(wish.from.position)
    });
    map.fitBounds(bounds);
  };

  return (
    <GoogleMap
      options={{
        styles: exampleMapStyles,
      }}
      onLoad={handleOnLoad}
      onClick={() => setActiveMarker(null)}
      mapContainerStyle={{
        width: "100%",
        height: "90vh",
        borderRadius: "10px",
      }}
    >
      {markers.map((marker) => {
        let message = "";
        if (marker.from.position.lat == marker.to.position.lat && marker.from.position.lng == marker.to.position.lng){
          message = marker.hashTag + " from " + marker.from.fullAdress + " to " + marker.to.fullAdress + ".";
        } else {
          message = marker.hashTag + " to " + marker.to.fullAdress + ".";
        }
        return <Marker
          key={marker.from._id}
          position={marker.from.position}
          onClick={() => handleActiveMarker(marker.from._id)}
          icon='https://maps.google.com/mapfiles/kml/paddle/go.png'
        //   label={{
        //     text: name,
        //     color: "#000000",
        //     fontWeight: "bold",
        //     fontSize: "12px",
        //   }}
        >
          {activeMarker === marker.from._id ? (
            <InfoWindow
              onCloseClick={() => setActiveMarker(null)}
            //   position={position}
            >
              <div
                style={{
                  background: `white`,
                  padding: "2px 4px",
                  color: "blue",
                  fontWeight: "medium",
                }}
              >
                {message}
              </div>
            </InfoWindow>
          ) : null}
        </Marker>
      })}
      {markers.map((marker) => {
        let message = "";
        if (marker.from.position.lat == marker.to.position.lat && marker.from.position.lng == marker.to.position.lng){
          message = marker.hashTag + " to " + marker.to.fullAdress + " from " + marker.from.fullAdress + ".";
        } else {
          message = marker.hashTag + " from " + marker.to.fullAdress + ".";
        }
        return <Marker
          key={marker.to._id}
          position={marker.to.position}
          onClick={() => handleActiveMarker(marker.from._id)}
          icon='https://maps.google.com/mapfiles/kml/paddle/purple-blank.png'
        //   label={{
        //     text: name,
        //     color: "#000000",
        //     fontWeight: "bold",
        //     fontSize: "12px",
        //   }}
        >
          {activeMarker === marker.from._id ? (
            <InfoWindow
              onCloseClick={() => setActiveMarker(null)}
            //   position={position}
            >
              <div
                style={{
                  background: `white`,
                  padding: "2px 4px",
                  color: "blue",
                  fontWeight: "medium",
                }}
              >
                {message}
              </div>
            </InfoWindow>
          ) : null}
        </Marker>
      })}
    </GoogleMap>
  );
}

export default Map;
