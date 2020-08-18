import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {FiArrowLeft, FiMinusCircle, FiPlusCircle} from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';
import api from '../../services/api';
import Captcha from '../../components/Captcha';

import './styles.css';

function RegisterSurvivor() {
  const [items, setItems] = useState([]);

  const [initialPosition, setInitialPosition] = useState([0, 0]);
  const [selectedPosition, setSelectedPosition] = useState([0, 0]);

  const [selectedItems, setSelectedItems] = useState([{}]);

  const [qtdItem, setQtdItem] = useState(5);

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
  });

  const [isRecaptchaVerified, setIsRecaptchaVerified] = useState(false); //////

  function handleIncrementQtdItem() {
      setQtdItem(qtdItem + 1)
  }

  function handleDecrementQtdItem() {
  if (qtdItem >= 1){
    setQtdItem(qtdItem - 1);
  }
}

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;

      setInitialPosition([latitude, longitude]);
    });
  }, []);

  useEffect(() => {
    api.get('/items').then(response => {
      setItems(response.data);
    })
  }, []);

  function handleMapCLick(event){
    setSelectedPosition([
      event.latlng.lat,
      event.latlng.lng
    ]); 
  }

  function handleFieldChange(event){
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    })
  }

  function handleSelectItem(id){
    const alreadySelected = selectedItems.findIndex(item => item === id);
    

    if (alreadySelected >= 0) {
      const filteredItems = selectedItems.filter(item => item !== id);
      setSelectedItems(filteredItems);
    } else {
      setSelectedItems([...selectedItems, id]);
    }
    
  }

  const survivorItems = items.map((item)=> {
    return {id: item.id, qtd: 0}
  })

  function handleQtdItem(id){ 
    // survivorItems.filter((id == survivorItems.id ) => {
    //   survivorItems.qtd++;
    // })
    
    console.log('lala', survivorItems);
  }

  function handleSubmitButton() {
    if(isRecaptchaVerified) {
      alert('You are a survivor!');
    } else {
      alert('Please verify that you are not a zombie');
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    
    const { name, age, gender } = formData;

    const [ latitude, lagitude ] = selectedPosition;

    const items = selectedItems;

    const data = {
      name,
      age, 
      gender,
      latitude,
      lagitude,
      items
    };

    console.log(data);
    // api.post('/survivors', data);
  }

  return (
    <div id="page-register-survivor">
      <header>
        <Link to="/">
          <FiArrowLeft /> Back to home
        </Link>
        
        <h3 className="logo">TZR Survivors</h3>
        
      </header>
      <form onSubmit={handleSubmit}>
        <h1>Register new survivor</h1>

        <fieldset>
          <legend>
            <h2>Informations</h2>
          </legend>
          <div className="field">
            <label htmlFor="name">Name</label>
            <input 
              type="text"
              name="name"
              id="name"
              onChange={handleFieldChange}
            />
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="age">Age</label>
              <input 
                type="number"
                name="age"
                id="age"
                onChange={handleFieldChange}
              />
            </div>

            <div className="field">
              <label htmlFor="name">Gender</label>
              <select name="gender" id="gender" defaultValue="" onChange={handleFieldChange}>
                <option value="" disabled hidden >Select</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Not binary">Not binary</option>
              </select>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Location</h2>
            <span>Select your location in the map</span>
          </legend>

          <Map center={initialPosition} zoom={15} onclick={handleMapCLick}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={selectedPosition}/>
          </Map>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Inventory</h2>
            <span>Select your itens below</span>
          </legend>

          <ul className="items-grid">
            {items.map(item => {
              return (
                <li 
                  key={item.id} 
                  className={selectedItems.includes(item.id) ? 'selected' : ''}
                  // onClick={() => handleSelectItem(item.id)}
                >
                  <div>
                    <button onClick={handleDecrementQtdItem}>
                      <FiMinusCircle />                    
                    </button>
                    <img src={item.image} alt={item.name}/>
                    <button onClick={handleQtdItem(item.id) }>
                      <FiPlusCircle />                    
                    </button>

                  </div>
                  <span>
                    {item.name} { qtdItem > 0 ? `x${qtdItem}` : ''}
                  </span>
                  
                </li>
              )
            })}
          </ul>
        </fieldset>        
        <div className="submit-components">

          <Captcha />

          <button className="submit-button" type="submit" onClick={handleSubmitButton}>
            Submit
          </button>          
        </div>
      </form>
      
    </div>
  )
}

export default RegisterSurvivor;