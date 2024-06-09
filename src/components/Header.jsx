import { Search } from './Search';

export const Header = () => {
  return (
    <div className='header'>
      <div>
        <span>DOGE</span>
        <span>$0.163</span>
      </div>
      <div>
        <span>BTC</span>
        <span>ETH</span>
        <span>XTZ</span>
      </div>
      <Search />
    </div>
  )
};
