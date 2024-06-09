import React, { useState, useEffect } from 'react';
import { ReactComponent as SearchIcon } from '../images/search.svg';
import { useFetchData } from '../utils/useFetchData';
import useVirtualScroll from '../utils/useVirtualScroll';
import { ReactComponent as FullStarIcon } from '../images/star-full.svg';
import { ReactComponent as EmptyStarIcon } from '../images/star-empty.svg';
import { ReactComponent as CloseIcon } from '../images/close.svg';
import { ReactComponent as StarFullIcon } from '../images/star-full.svg';

const SearchInput = ({ searchQuery, handleInput, clearInput }) => {
  return (
    <div className='list__input-container'>
      <SearchIcon className='search-btn__icon' />
      <input
        type='text'
        name='search'
        className='search__inp'
        id='search__inp'
        placeholder='Search ...'
        value={searchQuery}
        onChange={handleInput}
      />
      {searchQuery.length ? (
        <button
          className='search__close-btn'
          onClick={clearInput}
        >
          <CloseIcon className='close-icon' />
        </button>
      ) : null}
    </div>
  );
};

const renderListData = (data, toggleFavoriteCoin, favorites, startIndex, endIndex) => {
  return data.slice(startIndex, endIndex).map((el, index) => (
    <li key={startIndex + index} className='coins-list-item'>
      <button onClick={() => toggleFavoriteCoin(el)}>
        {favorites.includes(el) ? <FullStarIcon /> : <EmptyStarIcon />}
      </button>
      <p className='list-item-name'>{el}</p>
    </li >
  ));
};

const ModeBtnsContainer = ({ isFavorites, handleModeBtnClick }) => {
  return (
    <div className='search__mode-btn-container'>
      <button
        className={`list__toggle-view-btn ${isFavorites ? 'active' : ''}`}
        onClick={() => handleModeBtnClick({ btn: 'fav-btn' })}
      >
        <StarFullIcon className='star-full-icon' />
        Favorites
      </button>
      <button
        className={`list__toggle-view-btn ${!isFavorites ? 'active' : ''}`}
        onClick={() => handleModeBtnClick({ btn: 'all' })}
      >
        All coins
      </button>
    </div>
  );
};

export const Search = () => {
  const [openModal, setOpenModal] = useState(false);
  const [searchQuery, setQuery] = useState('');
  const [isFavorites, setFavorites] = useState(false);
  const [coinsData, setCoinsData] = useState([]);
  const [favorites, setFavoritesState] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const { apiData } = useFetchData();

  useEffect(() => {
    if (apiData) {
      setCoinsData(apiData);
    }
  }, [apiData]);

  useEffect(() => {
    const dataToFilter = isFavorites ? favorites : coinsData;
    if (searchQuery) {
      setFilteredData(dataToFilter.filter((el) => el.toLowerCase().includes(searchQuery.toLowerCase())));
    } else {
      setFilteredData(dataToFilter);
    }
  }, [searchQuery, isFavorites, coinsData, favorites]);

  const useHandleClick = () => {
    setOpenModal(!openModal);
  };

  const handleInput = (e) => {
    setQuery(e.target.value);
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

  const { containerRef, startIndex, endIndex } = useVirtualScroll({
    itemCount: filteredData.length,
    itemHeight: 35,
  });

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
          searchQuery={searchQuery}
        />
        <ModeBtnsContainer
          isFavorites={isFavorites}
          handleModeBtnClick={handleModeBtnClick}
        />
        <div
          ref={containerRef}
          className='virtual-scroll-container'
        >
          <div style={{ height: `${filteredData.length * 35}px` }}>
            <ul
              className='coins-list'
              style={{ top: `${startIndex * 35}px` }}
            >
              {renderListData(filteredData, toggleFavoriteCoin, favorites, startIndex, endIndex)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
