import React from 'react';
import Header from '../components/Header';
import MyMap from '../components/MyMap';
import LeftMenu from '../components/LeftMenu';

const MainPage = () => {
    return (
        <div className='container'>
            <Header />

            <div className='main'>
                <div className='main__inner'>
                    <div className='menu__wrapper'>
                        <LeftMenu />
                    </div>

                    <div className='map__wrapper'>
                        <MyMap />
                    </div>
                </div>               
            </div>

        </div>
    );
};

export default MainPage;