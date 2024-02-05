import { useState } from "react";
import './RandomQuotes.scss';
import axios from 'axios';
import { useEffect } from "react";


const API_URL = "https://api.adviceslip.com/advice";
const IMG_API_URL = "https://pixabay.com/api/?key=23758807-e7e184ff3b58dcd24ba3e978f&q=nature+landscape&orientation=horizontal"

function RandomQuotes() {

    const [quote, setQuote] = useState("The Advice!");
    const [img, setImg] = useState({});



    const fetchQuote = async () => {
        const res = await axios.get(API_URL);
        const { advice } = res.data.slip;
        return advice;
    }



    useEffect(() => {
        const getQuote = async () => {
            const advice = await fetchQuote();
            setQuote(advice);
        }
        getQuote();
    }, [])

    useEffect(() => {
        const fetchImg = async () => {
            const res = await axios.get(IMG_API_URL)
            const randIdx = Math.floor(Math.random() * 20 + 1)
            const data = res.data.hits[randIdx];
            setImg(data);
        }
        fetchImg();
    }, [])

    const onQuoteClick = async () => {
        setQuote(await fetchQuote());
    }



    return (
        <div className="RandomQuotes">
            <div className="img-container">
                <img src={img.webformatURL} alt={img.tags} />
            </div>
            <div className="card">
                <h1>{quote}</h1>
                <div className="">
                    <button onClick={onQuoteClick}>CHANGE!</button>
                </div>
            </div>
        </div>
    );
}

export default RandomQuotes;
