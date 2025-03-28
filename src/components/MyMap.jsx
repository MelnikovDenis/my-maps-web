import React from "react"
import { Map, Marker } from "pigeon-maps"

const canDisplayMarker = (post) => {    
    return Number.isFinite(post.longitude) && Number.isFinite(post.longitude);
}  

const MyMap = ({ post, setPost, posts }) => {
    const handleMapClick = ({ latLng }) => {
        setPost({ ...post, latitude: latLng[0], longitude: latLng[1]})
    };

    return (
        <Map defaultCenter={[58.0105, 56.2502]} 
            defaultZoom={13} 
            minZoom={6} 
            onClick={handleMapClick}>
            {
                posts.map((elem, index) => (
                    <Marker
                        key={index}
                        anchor={[elem.latitude, elem.longitude]}
                        color="rgba(34, 113, 179, 1)"
                        onClick={() => console.log(elem)} />))                    
            }
            {
                canDisplayMarker(post) && 
                <Marker
                    anchor={[post.latitude, post.longitude]}
                    color="rgba(178, 34, 34, 1)"
                    onClick={() => console.log(post)} />
            }            
        </Map>
    );
};

export default MyMap;