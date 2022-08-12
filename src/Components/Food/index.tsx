import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { InterfaceCategorias } from '../../types/InterfaceCategorias';
import { InterfaceMenu } from '../../types/InterfaceMenu';

const Foods = () => {
  const [categorias, setCategorias] = useState<InterfaceCategorias[]>([]);
  const [categoryName, setCategoryName] = useState<String>();
  const [menu, setMenu] = useState<InterfaceMenu[]>([]);
  const [search, setSearch] = useState<String>();

  useEffect(() => {
    axios
      .get('https://www.themealdb.com/api/json/v1/1/categories.php')
      .then((resposta) => setCategorias(resposta.data.categories));
  }, []);

  useEffect(() => {
    if (categoryName !== null) {
      axios
        .get(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`
        )
        .then((resposta) => setMenu(resposta.data.meals));
    }
  }, [categoryName]);

  useEffect(() => {
    if (search !== null) {
      axios
        .get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
        .then((resposta) => setMenu(resposta.data.meals));
    }
  }, [search]);

  return (
    <div className='food-beer-list food-shop'>
      <h1>Dishes Types</h1>
      <p>
        Select the category or type the food:
        <input
          type='text'
          placeholder='Search the food...'
          onChange={(event) => setSearch(event.target.value)}
        />
      </p>
      <ul>
        {categorias !== null &&
          categorias.map((item: InterfaceCategorias) => (
            <li
              key={item.idCategory}
              onClick={() => setCategoryName(item.strCategory)}
            >
              {item.strCategory}
            </li>
          ))}
      </ul>
      <h2>
        Type selected: <strong>{categoryName}</strong>
      </h2>
      <div className='food-container'>
        {menu !== null &&
          menu.map((item: InterfaceMenu) => (
            <div className='food-item' key={item.idMeal}>
              <img src={item.strMealThumb} alt={item.strMeal} />
              <p>{item.strMeal}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Foods;
