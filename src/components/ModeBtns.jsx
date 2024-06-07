import { ReactComponent as StarFullIcon } from '../images/star-full.svg';

export const ModeBtnsContainer = ({ isFavorites, handleModeBtnClick }) => {
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
