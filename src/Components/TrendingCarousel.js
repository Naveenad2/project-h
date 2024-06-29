import React from 'react';
import Slider from 'react-slick';
import './TrendingCarousel.css';

const trendingItems = [
  {
    title: "Trending Burger",
    price: "$5.00",
    imgSrc: "https://img.freepik.com/free-photo/tasty-burger-isolated-white-background-fresh-hamburger-fastfood-with-beef-cheese_90220-1063.jpg?size=338&ext=jpg&ga=GA1.1.672697106.1717545600&semt=sph",
  },
  {
    title: "Trending Pizza",
    price: "$8.00",
    imgSrc: "https://img.freepik.com/free-photo/tasty-pizza-isolated-white-background-fresh-hamburger-fastfood-with-beef-cheese_90220-1063.jpg?size=338&ext=jpg&ga=GA1.1.672697106.1717545600&semt=sph",
  },
  // Add more items as needed
];

const TrendingCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="trending-carousel">
      <h2>Trending Items</h2>
      <Slider {...settings}>
        {trendingItems.map((item, index) => (
          <div className="carousel-item" key={index}>
            <img src={item.imgSrc} alt={item.title} />
            <div className="carousel-caption">
              <h3>{item.title}</h3>
              <p>{item.price}</p>
              <div className="badge">Trending</div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TrendingCarousel;
