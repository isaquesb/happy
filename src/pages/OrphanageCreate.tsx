import React, { FormEvent } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { WithTranslation, withTranslation } from 'react-i18next';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import happyMapIcon from '../utils/MapIcon';
import Sidebar from "../components/Sidebar";
import { FiPlus } from "react-icons/fi";
import '../styles/pages/orphanage-create.css';
import Happy from '../types';
import api from '../services/api';

interface CreateState {
  row: Happy.Orphanage,
  images: File[]
  imagesPreview: string[]
};
interface IComponentProps extends WithTranslation, RouteComponentProps { };

class OrphanageCreate extends React.Component<IComponentProps, CreateState> {
  constructor(props: any) {
    super(props);
    this.state = {
      images: [],
      imagesPreview: [],
      row: {
        id: 0,
        name: '',
        latitude: 0,
        longitude: 0,
        about: '',
        instructions: '',
        opening_hours: '',
        open_on_weekends: false,
        images: [],
      }
    };
  }
  onValueChange = (
    field: string,
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    let value: string | boolean = e.target.value;
    if (field === 'open_on_weekends' && e.target instanceof HTMLInputElement) {
      value = e.target.checked;
    }
    this.setState({
      row: {
        ...this.state.row,
        [field]: value
      }
    })
  };
  handleMapClick = (event: LeafletMouseEvent) => {
    const { lat, lng } = event.latlng;
    this.setState({
      row: {
        ...this.state.row,
        latitude: lat,
        longitude: lng
      }
    })
  };
  selectImages = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }
    const selectedImages = Array.from(event.target.files);
    const previewImages = selectedImages.map(image => {
      return URL.createObjectURL(image);
    });
    this.setState({
      images: selectedImages,
      imagesPreview: previewImages
    });
  };
  changeOpenWeekends = (open: boolean) => {
    this.setState({
      row: {
        ...this.state.row,
        open_on_weekends: open
      }
    })
  };
  handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    let row = this.state.row;
    const data = new FormData();
    data.append('name', row.name);
    data.append('about', row.about);
    data.append('latitude', String(row.latitude));
    data.append('longitude', String(row.longitude));
    data.append('instructions', row.instructions);
    data.append('opening_hours', row.opening_hours);
    data.append('open_on_weekends', String(row.open_on_weekends));
    this.state.images.forEach(image => {
      data.append('images', image);
    });

    await api.post('orphanages', data);

    alert(this.props.t('saved'));

    this.props.history.push('/map');
  };
  render() {
    const { t } = this.props;
    return (
      <div id="page-create-orphanage">
        <Sidebar />
        <main>
          <form className="create-orphanage-form" onSubmit={this.handleSubmit}>
            <fieldset>
              <legend>{t('data')}</legend>
              <Map
                center={[-23.5372057, -46.7962328]}
                zoom={15}
                style={{ width: '100%', height: 280 }}
                onClick={this.handleMapClick}
              >
                <TileLayer
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />

                {this.state.row.latitude !== 0 && (
                  <Marker
                    interactive={false}
                    icon={happyMapIcon}
                    position={[this.state.row.latitude, this.state.row.longitude]}
                  />
                )}

              </Map>

              <div className="input-block">
                <label htmlFor="name">{t('name')}</label>
                <input
                  id="name"
                  value={this.state.row.name}
                  onChange={e => this.onValueChange('name', e)}
                />
              </div>

              <div className="input-block">
                <label htmlFor="about">{t('about')} <span>{t('characterLimits')}</span></label>
                <textarea
                  id="about"
                  maxLength={300}
                  value={this.state.row.about}
                  onChange={e => this.onValueChange('about', e)}
                />
              </div>

              <div className="input-block">
                <label htmlFor="images">{t('photos')}</label>

                <div className="image-container">
                  {this.state.imagesPreview.map((image, imageIdx) => {
                    return (
                      <img key={imageIdx} src={image} alt={this.state.row.name} />
                    )
                  })}
                  <label htmlFor="image-new" className="new-image">
                    <FiPlus size={24} color="#15b6d6" />
                  </label>
                </div>
                <input
                  multiple
                  type="file"
                  id="image-new"
                  onChange={this.selectImages}
                />
              </div>
            </fieldset>

            <fieldset>
              <legend>{t('visiting')}</legend>

              <div className="input-block">
                <label htmlFor="instructions">{t('instructions')}</label>
                <textarea
                  id="instructions"
                  value={this.state.row.instructions}
                  onChange={e => this.onValueChange('instructions', e)}
                />
              </div>

              <div className="input-block">
                <label htmlFor="opening_hours">{t('hours')}</label>
                <input
                  id="opening_hours"
                  value={this.state.row.opening_hours}
                  onChange={e => this.onValueChange('opening_hours', e)}
                />
              </div>

              <div className="input-block">
                <label htmlFor="open_on_weekends">{t('weekends')}</label>

                <div className="button-select">
                  <button
                    type="button"
                    onClick={() => { this.changeOpenWeekends(true) }}
                    className={this.state.row.open_on_weekends ? 'active' : ''}
                  >{t('yes')}</button>
                  <button
                    type="button"
                    onClick={() => { this.changeOpenWeekends(false) }}
                    className={!this.state.row.open_on_weekends ? 'active' : ''}
                  >{t('no')}</button>
                </div>
              </div>
            </fieldset>

            <button className="confirm-button" type="submit">
              {t('confirm')}
            </button>
          </form>
        </main>
      </div>
    );
  }
}

export default withTranslation('orphanageCreate')(OrphanageCreate);
