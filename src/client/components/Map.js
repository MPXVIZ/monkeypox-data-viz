import React, { useRef, useEffect, useState } from 'react';
import '../styles/index.css';
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from '!mapbox-gl';
import axios from 'axios';

const Map = () => {
    mapboxgl.accessToken = process.env.MAPBOX_TOKEN;

    const defaultLng = 0.1276;
    const defaultLat = 51.5072;
    const defaultZoom = 4;
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(defaultLng);
    const [lat, setLat] = useState(defaultLat);
    const [zoom, setZoom] = useState(defaultZoom);
    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom,
        });
        let data;
        const fetchData = async () => {
            data = await getData();
        };
        fetchData().catch(console.error);
    }, []);
    async function getData() {
        try {
            const { data } = await axios.get('/api/data');
            return parse(data);
        } catch (error) {
            console.log(error);
        }
    }
    // function setSourceData() {
    //     // Check to see if source is created during initial render
    //     // On intial render, restaurants source is undefined - correct functionality
    //     if (map.current.getSource("restaurants")) {
    //         let newData = transformJSON()

    //         map.current.getSource("restaurants").setData({
    //             type: "FeatureCollection",
    //             features: newData,
    //         })
    //     }
    // }
    const parse = data => {
        console.log('parsing data:', data);
        // return data.map((monkeypoxCase) => {
        // 	if (monkeypoxCase.city) {
        // 		console.log
        // 	}
        // })
    };
    return (
        <section id="map">
            <div ref={mapContainer} className="map-container" />
        </section>
    );
};
export default Map;
