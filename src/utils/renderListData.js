import { ReactComponent as FullStarIcon } from '../images/star-full.svg';
import { ReactComponent as EmptyStarIcon } from '../images/star-empty.svg';

export const renderListData = (data, toggleFavoriteCoin, favorites, searchQuery) => {
    let dataToRender = [];
    if (searchQuery && Array.isArray(data) && data.length > 0) {
        dataToRender = data.filter((el) => el.toLowerCase().includes(searchQuery.toLowerCase()));
    } else {
        dataToRender = [...data];
    }

    return dataToRender.map((el, index) => (
        <li key={index} className='coins-list-item'>
            <button onClick={() => toggleFavoriteCoin(el)}>
                {favorites.includes(el) ? <FullStarIcon /> : <EmptyStarIcon />}
            </button>
            {el}
        </li>
    ));
};
