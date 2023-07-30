import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setHeroBannerContent } from '../store/actions';

const HeroBanner: React.FC = () => {
  const dispatch = useDispatch();
  const { title, description } = useSelector((state) => state.heroBanner);

  useEffect(() => {
    // Fetch hero banner content from the backend
    axios.get('/api/heroBanner').then((response) => {
      const { title, description } = response.data;
      dispatch(setHeroBannerContent(title, description));
    });
  }, [dispatch]);

  return (
    <div className="hero-banner">
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
};

export default HeroBanner;
