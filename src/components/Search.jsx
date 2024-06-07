import React, { useState, useEffect } from 'react';
import { ReactComponent as SearchIcon } from '../images/search.svg';
import { ModeBtnsContainer } from './ModeBtns';
import { SearchInput } from './SearchInput';
import { useFetchData } from '../utils/useFetchData';
import { renderListData } from '../utils/renderListData';
import useVirtualScroll from '../utils/useVirtualScroll';

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
          openModal={openModal}
          searchQuery={searchQuery}
        />
        <ModeBtnsContainer
          isFavorites={isFavorites}
          handleModeBtnClick={handleModeBtnClick}
        />
        <div
          ref={containerRef}
          className='virtual-scroll-container'
          style={{
            height: '400px',
            overflowY: 'auto',
            position: 'relative',
          }}
        >
          <div style={{ height: `${filteredData.length * 35}px`, position: 'relative' }}>
            <ul
              className='coins-list'
              style={{
                position: 'absolute',
                top: `${startIndex * 35}px`,
                left: 0,
                right: 0,
              }}
            >
              {renderListData(filteredData, toggleFavoriteCoin, favorites, searchQuery, startIndex, endIndex)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
