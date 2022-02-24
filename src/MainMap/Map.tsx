import {useEffect, useRef, useState} from "react";
import ReactMapGL, {Marker, Popup, ViewportProps, ViewState} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import React from "react";
import {MapRef} from "react-map-gl/src/components/static-map";
import {apiMet, hydrateAllLocationsForecastStates, getAllTownLocations} from "src/MainMap/api";
// import { useLocalState } from "src/utils/useLocalState";
// import { HousesQuery_houses } from "src/generated/HousesQuery";
// import { SearchBox } from "./searchBox";

// import styles from 'styles'

// mapStyle={'mapbox://styles/leighhalliday/ckhjaksxg0x2v19s1ovps41ef'}
//mapStyle={'mapbox://styles/ahfiba9/ckkxwqdmu5zdz17ogf5tf4912'}

interface MapProps {}

export const Map = () => {
  const mapRef = useRef<MapRef | null>(null);
  const [viewPort, setViewPort] = useState<ViewState>({
    latitude: 3.139,
    longitude: 101.6869,
    zoom: 5,
  });

  const getStateLocation = async () => {
      const response = await apiMet.get('/locations?locationcategoryid=DISTRICT')

      console.log('response = ', response)
  }

  useEffect(() => {
      hydrateAllLocationsForecastStates().then()
  },[])

  return (
    <div className="text-black relative">
      <ReactMapGL
        {...viewPort}
        width="100%"
        height="calc(100vh - 64px)"
        mapboxApiAccessToken={process.env.REACT_APP_PUBLIC_MAPBOX_API_TOKEN}
        onViewportChange={(nextViewport : ViewState) => setViewPort(nextViewport)}
        ref={(instance) => (mapRef.current = instance)}
        minZoom={6}
        maxZoom={15}
        mapStyle="mapbox://styles/ahfiba9/ckkxwqdmu5zdz17ogf5tf4912"
        attributionControl={false}
      >
        <h1>
          this is another test to put state selector
        </h1>
      </ReactMapGL>
    </div>
  );
}
