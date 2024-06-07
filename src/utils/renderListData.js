import { ReactComponent as FullStarIcon } from '../images/star-full.svg';
import { ReactComponent as EmptyStarIcon } from '../images/star-empty.svg';

export const renderListData = (data, toggleFavoriteCoin, favorites, searchQuery, startIndex, endIndex) => {
    return data.slice(startIndex, endIndex).map((el, index) => (
        <li key={startIndex + index} className='coins-list-item'>
            <button onClick={() => toggleFavoriteCoin(el)}>
                {favorites.includes(el) ? <FullStarIcon /> : <EmptyStarIcon />}
            </button>
            {el}
        </li>
    ));
};
