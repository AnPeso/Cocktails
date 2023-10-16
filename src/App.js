import React, { useState } from 'react';
import './App.css';
import RandomCocktail from './RandomCocktail';
import CocktailSearch from './CocktailSearch';

function App() {
  const [searchedCocktail, setSearchedCocktail] = useState(null);

  const handleSearch = (searchTerm) => {
    
    const apiUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`;
  
  
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        
        if (data.drinks && data.drinks.length > 0) {
          
          setSearchedCocktail(data.drinks[0]); 
        } else {
          
          setSearchedCocktail(null);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
       
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Random Cocktail Recipe</h1>
      </header>
      <main>
        <div>
        <RandomCocktail />
        </div>
        <div>
        <CocktailSearch onSearch={handleSearch} />
        </div>
        {searchedCocktail && <RandomCocktail cocktail={searchedCocktail} />}
      </main>
    </div>
  );
}

export default App;