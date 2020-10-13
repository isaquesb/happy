import React from 'react';
import { Link } from 'react-router-dom'
import { FiPlus } from 'react-icons/fi'
import { Map, TileLayer } from 'react-leaflet'
import mapMarker from '../images/logo.svg';
import '../styles/pages/orphanage-map.css';

import 'leaflet/dist/leaflet.css';

function OrphanagesMap() {
    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarker} alt="Happy" />
                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>

                <footer className="location">
                    <strong>Osasco</strong>
                    <span>S&atilde;o Paulo</span>
                </footer>
            </aside>

            <Map
                center={[-23.5372057, -46.7962328]}
                zoom={15}
                style={{ width: '100%', height: '100%' }}
            >
                {/*<TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />*/}
                <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />
            </Map>

            <Link to="" className="create">
                <FiPlus size={32} color="#FFF" />
            </Link>
        </div >
    );
}

export default OrphanagesMap;
