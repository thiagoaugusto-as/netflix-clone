import React, { useEffect, useState } from 'react';

import Tmdb from './Tmdb';

import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';

import './App.css'

export default () => {

    const [movieList, setMovieList] = useState([]);
    const [featuredData, setFeaturedData] = useState();

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

    return (
        <div className="page">

            {featuredData &&
                <FeaturedMovie item={featuredData}/>
            }

            <section className="lists">
                {movieList.map((item, key) => (
                    <MovieRow key={key} title={item.title} items={item.items}/>
                ))}
            </section>
        </div>
    );
}