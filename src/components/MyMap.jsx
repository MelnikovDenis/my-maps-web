import React, { useState } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import PostContent from "./PostContent";
import MyMapApi from "../http/MyMapApi";
import { useFetching } from "../hooks/useFetching";
import ErrorContent from "./ErrorContent";
import MyModal from './UI/MyModal';
import MyLoader from "./UI/MyLoader";
import markerIconBlue from "../resources/marker-icon-blue.png";
import markerIconRed from "../resources/marker-icon-red.png";
import markerIconBlue2x from "../resources/marker-icon-blue-2x.png";
import markerShadow from "../resources/marker-shadow.png";

const defaultIcon = L.icon({
    iconUrl: markerIconBlue,
    iconRetinaUrl: markerIconBlue2x,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

const canDisplayMarker = (post) => {    
    return Number.isFinite(post.longitude) && Number.isFinite(post.longitude);
}  

const MyMap = ({ post, setPost, posts, setPosts }) => {
    const [error, setError] = useState(null);
    const center = [58.0105, 56.2502];

    const [ deletePost, isDeletePostLoading ] = useFetching(async (postId) => {
        const response = await MyMapApi.deletePost(postId);

        if(response.status === 200) {        
            setPosts([ ...(posts.filter(item => item.id !== postId))]);
        }
    });

    const MapClickHandler = ({ setPost, post }) => {
        useMapEvents({
            click: (e) => {
            setPost({ ...post, latitude: e.latlng.lat, longitude: e.latlng.lng });
            },
        });
        return null;
    };

    const onPostDelete = (postId) => {
        deletePost(postId).catch(deleteError => {
            if(deleteError?.response) {
                if(deleteError.response?.status === 401) {
                    setError("Неверный токен авторизации");
                } else {
                    setError("Внутренняя ошибка сервера");
                }            
            } else if(deleteError?.request) {
                setError("Сервер не отвечает");
            } else {
                setError("Неизвестная ошибка");
            }
        });
    }

    return (
        <React.Fragment>
            {
                isDeletePostLoading && <MyLoader />
            }

            <MyModal message={error} 
                visible={!error} 
                setVisible={(value) => !value && setError("")}>
                    <ErrorContent error={error} 
                        onExit={(value) => !value && setError("")}/>
            </MyModal>

            <MapContainer
                center={center}
                zoom={13}
                minZoom={6}
                style={{ height: "100%", width: "100%" }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />

                <MapClickHandler setPost={setPost} post={post} />

                {
                    posts.map((elem, index) => (
                        <Marker
                            key={index}
                            position={[elem.latitude, elem.longitude]}
                            icon={defaultIcon}
                        >
                            <Popup>
                                <PostContent post={elem} onDelete={() => onPostDelete(elem.id)}/>
                            </Popup>
                        </Marker>
                    ))
                }

                {
                    canDisplayMarker(post) && (
                    <Marker
                        position={[post.latitude, post.longitude]}
                        icon={L.icon({
                            ...defaultIcon.options,
                            iconUrl: markerIconRed,
                        })}>
                        <Popup>Выбранная точка</Popup>
                    </Marker>
                    )
                }
            </MapContainer>
        </React.Fragment>
        
    );
};
  
export default MyMap;