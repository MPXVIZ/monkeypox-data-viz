import React, { useEffect, useRef, useState } from 'react';

import axios from 'axios';
import mapboxgl from 'mapbox-gl';

export default function Map() {
    // dotenv-webpack gets token from environment variable
    mapboxgl.accessToken = process.env.MAPBOX_TOKEN || '';

    const defaultLng = 0.3276;
    const defaultLat = 25.5072;
    const defaultZoom = 1.42;
    const mapContainer: any = useRef(null);
    const map: any = useRef(null);
    const [lng, setLng] = useState(defaultLng);
    const [lat, setLat] = useState(defaultLat);
    const [zoom, setZoom] = useState(defaultZoom);

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: `mapbox://styles/huckcg/cl6fgf49w005214o03qwgvj4d/draft`,
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
    const parse = (data: any) => {
        console.log('parsing data:', data);
        // return data.map((monkeypoxCase) => {
        // 	if (monkeypoxCase.city) {
        // 		console.log
        // 	}
        // })
    };

    return (
        <section id="map">
            <div
                ref={mapContainer}
                className="map-container"
            />
        </section>
    );
}
