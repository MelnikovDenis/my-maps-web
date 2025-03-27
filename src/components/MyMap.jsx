import React, { useState } from "react"
import { Map, Marker } from "pigeon-maps"

const MyMap = () => {
    const [markers, setMarkers] = useState([]);

    // Обработка клика по карте
    const handleMapClick = ({ latLng }) => {
        setMarkers([...markers, latLng]); // Добавляем новый маркер
    };

    return (
        <Map defaultCenter={[50.879, 4.6997]} 
            defaultZoom={15} 
            minZoom={8} 
            onClick={handleMapClick}>
            {
                markers.map((position, index) => (
                    <Marker
                        key={index}
                        anchor={position}
                        payload={index}
                        onClick={() => console.log(`Маркер ${index} кликнут`)}/>))
            }
        </Map>
    );
};

export default MyMap;