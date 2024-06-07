import { useState } from 'react';
import { ReactComponent as SearchIcon } from '../images/search.svg';
import { ModeBtnsContainer } from './ModeBtns';
import { SearchInput } from './SearchInput';
import { useFetchData } from '../utils/useFetchData';
import { renderListData } from '../utils/renderListData';

export const Search = () => {
  const [openModal, setOpenModal] = useState(false);
  const [searchQuery, setQuery] = useState('');
  const [isFavorites, setFavorites] = useState(false);
  const [coinsData, setCoinsData] = useState([]);
  const [favorites, setFavoritesState] = useState([]);

  const { apiData } = useFetchData();

  const useHandleClick = () => {
    if (apiData) {
      setCoinsData(apiData);
    }

    setOpenModal(!openModal);
  };

  const handleInput = (e) => {
    setQuery(e.target.value);
    console.log(searchQuery);
  };

  const clearInput = () => {
    setQuery('');
  };

  const handleModeBtnClick = ({ btn }) => {
    if (
      (btn === 'all' && isFavorites === false) ||
      (btn === 'fav-btn' && isFavorites === true)
    ) {
      return;
    }
    setFavorites(!isFavorites);
  };

  const toggleFavoriteCoin = (coin) => {
    setFavoritesState((prevFavorites) => {
      if (prevFavorites.includes(coin)) {
        return prevFavorites.filter((el) => el !== coin);
      } else {
        return [...prevFavorites, coin];
      }
    });
  };

  return (
    <div className='search'>
      <div>
        <button
          className={`search-bar__btn ${openModal ? 'active' : ''}`}
          type='button'
          onClick={useHandleClick}
        >
          <SearchIcon className='search-btn__icon' />
          <span>Search</span>
        </button>
      </div>

      <div className={`list ${openModal ? '' : 'hidden'}`}>
        <SearchInput
          handleInput={handleInput}
          clearInput={clearInput}
          openModal={openModal}
          searchQuery={searchQuery}
        />
        <ModeBtnsContainer
          isFavorites={isFavorites}
          handleModeBtnClick={handleModeBtnClick}
        />
        <ul className='coins-list'>
          {isFavorites ? (
            renderListData(favorites, toggleFavoriteCoin, favorites)
          ) : (
            coinsData && Array.isArray(coinsData) ? (
              renderListData(coinsData, toggleFavoriteCoin, favorites)
            ) : null
          )}
        </ul>
      </div>
    </div>
  );
};
