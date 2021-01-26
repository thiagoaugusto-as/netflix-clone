import React, { useState } from 'react';

import './style.css'

import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

export default ({title, items}) => {
    const [scrollX, setScrollX] = useState(0);

    const handleLeftArrow = () => {
        let x = scrollX + Math.round(window.innerWidth/2);
        if(x>0) {
            x=0;
        }
        setScrollX(x);
    }

    const handleRightArrow = () => {
        let x = scrollX - Math.round(window.innerWidth/2);
        console.log("x")
        console.log(x)


        let listW = items.results.length * 130 + (items.results.length * 5);

        console.log("listw")
        console.log(listW)
        if((window.innerHeight - listW) > x) {
            x=window.innerHeight - listW;
        }
        setScrollX(x);
    }

    return (
        <div className="movieRow">
            <h2>{title}</h2>

            <div className="movieRow--left" onClick={handleLeftArrow}>
                <NavigateBeforeIcon style={{fontSize: 50}}/>
            </div>
            <div className="movieRow--right" onClick={handleRightArrow}>
                <NavigateNextIcon style={{fontSize: 50}}/>
            </div>

            <div className="movieRow--listarea">
                <div className="movieRow--list" style={{
                    marginLeft: scrollX,
                    width: items.results.length * 150
                }}>
                    {
                        items.results.length > 0 && items.results.map((item, key) => (
                            <div key={key} className="movieRow--item">
                                <img 
                                    src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                                    alt={item.original_title}
                                />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}