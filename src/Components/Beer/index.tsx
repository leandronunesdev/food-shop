import React, { useState } from 'react';
import axios from 'axios';
import { InterfaceCerveja } from '../../types/InterfaceCerveja';

const Beer = () => {
  const [cervejas, setCervejas] = useState<InterfaceCerveja[]>([]);

  const getCervejas = () => {
    axios
      .get('https://api.punkapi.com/v2/beers/?per_page=8')
      .then((resposta) => setCervejas(resposta.data));
  };

  return (
    <div className='food-beer-list food-shop'>
      <h1>Beer Types</h1>
      <button onClick={getCervejas}>Find Beers</button>
      <div className='beers-list'>
        {cervejas !== undefined &&
          cervejas.map((item: InterfaceCerveja) => (
            <div key={item.id} className='beer'>
              <img src={item.image_url} alt={item.name} />
              <h3>{item.name}</h3>
              <span>{item.tagline}</span>
              <small>{item.description}</small>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Beer;
