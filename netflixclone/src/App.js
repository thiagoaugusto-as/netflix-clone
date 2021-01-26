import React, { useEffect, useState } from 'react';

import Tmdb from './Tmdb';

import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';

import './App.css'

export default () => {

    const [movieList, setMovieList] = useState([]);
    const [featuredData, setFeaturedData] = useState();
    const [blackHeader, setBlackHeader] = useState(false)

    useEffect(() => {

        const loadAll = async () => {
            //Geting film's list
            const list = await Tmdb.getHomeList();
            setMovieList(list);

            //Geting Featured
            const originals = list.filter(i=>i.slug === 'originals');
            const randomChosen = Math.floor(Math.random()*(originals[0].items.results.length - 1));
            const chosen = originals[0].items.results[randomChosen];
            const chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
            setFeaturedData(chosenInfo);
        }

        loadAll();

    }, []);

    useEffect(() => {
        const scrollListener = () => {
            if(window.scrollY > 10) {
                setBlackHeader(true);
            } else {
                setBlackHeader(false);
            }
        }

        window.addEventListener('scroll', scrollListener);
        return () => {
            window.removeEventListener('scroll', scrollListener);
        }
    })

    return (
        <div className="page">
            <Header black={blackHeader}/>

            {featuredData &&
                <FeaturedMovie item={featuredData}/>
            }

            <section className="lists">
                {movieList.map((item, key) => (
                    <MovieRow key={key} title={item.title} items={item.items}/>
                ))}
            </section>

            <footer>
                Feito com <span role="img" aria-label="coracao">🤍</span> por Thiago Augusto<br/>
                Direitos de Imagem para Netflix<br/>
                Dados tirados do site Themoviedb.org
            </footer>

            {movieList.length <=0 &&
                <div className="loading">
                    <img src="https://media.wired.com/photos/592744d3f3e2356fd800bf00/master/w_2560%2Cc_limit/Netflix_LoadTime.gif"></img>
                </div>
            }
        </div>
    );
}