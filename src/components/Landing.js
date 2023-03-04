import React , {useState , useEffect} from 'react';

//API
import { getCoin } from '../services/api';

//components
import Loader from './Loader';
import Coin from './Coin';

const Landing = () => {

    const [coins, setCoins] = useState([]);
    const [search, setsearch]= useState("");

    useEffect(() => {
        const fetchAPI = async () => {
            const data = await getCoin();
            console.log(data);
            setCoins(data)
        }

        fetchAPI();
    }, [])

    const serachHandler = event=> {
        setsearch(event.target.value)
    }

    const searchedCoin = coins.filter(coin => coin.name.toLowerCase().includes(search.toLocaleLowerCase()))

    return(
        <>
            <input type="text" placeholder="Search" value={search} onChange={serachHandler}/>
            {
                coins.length ? 
                        <div>
                            
                            {
                                searchedCoin.map(coin => <Coin 
                                    key={coin.id}
                                    name={coin.name}
                                    image={coin.image}
                                    symbol={coin.symbol}
                                    price={coin.current_price}
                                    marketCap={coin.market_cap}
                                    priceChange={coin.price_change_percentage_24h}
                                />)
                            }
                        </div> :
                <Loader />

            }
        </> 
    );
};

export default Landing;