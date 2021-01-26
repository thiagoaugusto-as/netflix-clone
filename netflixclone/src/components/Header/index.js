import React from  'react';
import './style.css'

export default ({black}) => {
    return(
        <header className={black ? 'black' : ''}>
            <div className="header--logo">
                <a href="/">
                    <img alt="netflix logo" src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"></img>  
                </a>
            </div>
            <div className="header--user">
                <a href="/">
                    <img alt="user" src="https://pro2-bar-s3-cdn-cf.myportfolio.com/dddb0c1b4ab622854dd81280840458d3/877ad1ce3a479ef9498e1efc.png?h=b16d81f42495097189e3cebe5461e0d0"></img>  
                </a>
            </div>
        </header>
    );
}