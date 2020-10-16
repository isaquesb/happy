import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { FiClock, FiInfo } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import Sidebar from "../components/Sidebar";
import happyMapIcon from '../utils/MapIcon';
import api from '../services/api';
import Happy from '../types';
import '../styles/pages/orphanage.css';

interface RouteParams {
  id: string
};

export default function Orphanage() {
  const params: RouteParams = useParams();
  const { t, } = useTranslation('orphanage');
  const [row, setRow] = useState<Happy.Orphanage>();
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  useEffect(() => {
    api.get(`orphanages/${params.id}`).then(response => {
      setRow(response.data);
    });
  }, [params.id]);

  if (!row) {
    return (<p>Loading...</p>);
  }

  return (
    <div id="page-orphanage">
      <Sidebar />

      <main>
        <div className="orphanage-details">

          {row.images.length && (
            <div>
              <img src={row.images[activeImageIdx].url} alt={row.name} />

              <div className="images">
                {row.images.map((image, imageIdx) => {
                  return (
                    <button
                      key={image.id}
                      className={activeImageIdx === imageIdx ? 'active' : ''}
                      type="button"
                      onClick={() => { setActiveImageIdx(imageIdx) }}>
                      <img src={image.url} alt={row.name} />
                    </button>
                  )
                })}
              </div>
            </div>
          )}


          <div className="orphanage-details-content">
            <h1>{row.name}</h1>
            <p>{row.about}</p>

            <div className="map-container">
              <Map
                center={[row.latitude, row.longitude]}
                zoom={16}
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                <Marker interactive={false} icon={happyMapIcon} position={[row.latitude, row.longitude]} />
              </Map>

              <footer>
                <a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${row.latitude},${row.longitude}`}>{t('seeInMap')}</a>
              </footer>
            </div>

            <hr />

            <h2>{t('instructions')}</h2>
            <p>{row.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                {row.opening_hours}
              </div>
              {row.open_on_weekends ? (
                <div className="open-on-weekends">
                  <FiInfo size={32} color="#39CC83" />
                  {t('yesWeekends')}
                </div>
              ) : (
                  <div className="open-on-weekends no-open">
                    <FiInfo size={32} color="#FF6690" />
                    {t('noWeekends')}
                  </div>
                )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
