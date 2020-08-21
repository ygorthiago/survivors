import React from 'react';

import './styles.css';

function Inventory({inventory}) {
  return (
    <div>
      <legend>
        <h2>Inventory</h2>
      </legend>
      <ul className="items-grid">        
      {inventory.map(item => {
          return (
            <li key={item.id}>
              <img src={item.image} alt={item.name}/>
              <span>
                {item.name} x{item.qtd}
              </span>                
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Inventory;