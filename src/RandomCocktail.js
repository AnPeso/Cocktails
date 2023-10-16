import React, { useState, useEffect } from 'react';

function RandomCocktail({ cocktail }) {
  const [cocktailData, setCocktailData] = useState(null);

  useEffect(() => {
    if (cocktail) {
      setCocktailData(cocktail);
    } else {
      async function fetchRandomCocktail() {
        try {
          const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setCocktailData(data.drinks[0]);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }

      fetchRandomCocktail();
    }
  }, [cocktail]);

  return (
    <div>
      {cocktailData ? (
        <div>
          <h2>{cocktailData.strDrink}</h2>
          <img src={cocktailData.strDrinkThumb} alt={cocktailData.strDrink} />
          <p>{cocktailData.strInstructions}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default RandomCocktail;