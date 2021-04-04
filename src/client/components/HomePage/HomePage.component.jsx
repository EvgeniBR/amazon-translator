import React from 'react';
import Header from '../Header/Header.component';
import './HomePage.css';

const HomePage = () => (
  <div>
    <Header />
    <div className="pic_container">
      <img className="applepic" alt="appleseedes" src="https://scontent.ftlv1-1.fna.fbcdn.net/v/t1.6435-9/159091975_10159632555033484_5594328037239264622_n.png?_nc_cat=105&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=0daoeHJ4tZMAX9VbEpa&_nc_ht=scontent.ftlv1-1.fna&oh=d57c7123f2cce8e945d8b0c09b03af50&oe=608FBB3A" />
      <img className="applepic" alt="appleseedes" src="https://www.educivic.cet.ac.il/uploads/2016/11/%D7%9C%D7%95%D7%92%D7%953.jpg" />
      <img className="applepic" alt="appleseedes" src="https://static.wixstatic.com/media/ecafdf_410376d5ca97480a843647ad8dcaf251~mv2.jpg/v1/fit/w_2500,h_1330,al_c/ecafdf_410376d5ca97480a843647ad8dcaf251~mv2.jpg" />
    </div>
  </div>
);

export default HomePage;
