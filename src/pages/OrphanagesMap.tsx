import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom'
import { FiPlus, FiArrowRight } from 'react-icons/fi'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import MapIcon from '../utils/MapIcon';
import '../styles/pages/orphanage-map.css';

import mapMarker from '../images/logo.svg';
import api from '../services/api';
import Happy from '../types';

function OrphanagesMap() {
    const { t, } = useTranslation('map');
    const [resultSet, setResultSet] = useState<Happy.Orphanage[]>([]);
    useEffect(() => {
        api.get('orphanages').then(response => {
            setResultSet(response.data);
        });
    }, []);
    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarker} alt="Happy" />
                    <h2>{t('choose')}</h2>
                    <p>{t('text')}</p>
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

                {resultSet.map(row => {
                    return (
                        <Marker
                            key={row.id}
                            icon={MapIcon}
                            position={[row.latitude, row.longitude]}
                        >
                            <Popup
                                closeButton={false}
                                minWidth={240}
                                maxWidth={240}
                                className="map-popup"
                            >
                                {row.name}
                                <Link to={`/orphanages/${row.id}`}>
                                    <FiArrowRight size={20} color="#FFF" />
                                </Link>
                            </Popup>
                        </Marker>
                    )
                })}
            </Map>

            <Link to="/orphanages/create" className="create">
                <FiPlus size={32} color="#FFF" />
            </Link>
        </div >
    );
}

export default OrphanagesMap;
