import { ReactComponent as CloseIcon } from '../images/close.svg';
import { ReactComponent as SearchIcon } from '../images/search.svg';

export const SearchInput = ({ openModal, searchQuery, handleInput, clearInput }) => {
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