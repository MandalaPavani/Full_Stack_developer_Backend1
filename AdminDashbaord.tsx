import React from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setHeroBannerContent, setContentSectionContent } from '../store/actions';

const AdminDashboard: React.FC = () => {
  const dispatch = useDispatch();

  const handleUpdateHeroBanner = () => {
    // Implement API call to update hero banner content
    const title = 'New Title';
    const description = 'New Description';
    axios
      .put('/api/heroBanner', { title, description })
      .then((response) => {
        if (response.data.success) {
          // Update hero banner content in Redux store
          dispatch(setHeroBannerContent(title, description));
          alert(response.data.message);
        }
      })
      .catch((error) => {
        console.error('Error updating hero banner content:', error);
      });
  };

  const handleUpdateContentSection = () => {
    // Implement API call to update content section content
    const content = 'New content';
    axios
      .put('/api/contentSection', { content })
      .then((response) => {
        if (response.data.success) {
          // Update content section content in Redux store
          dispatch(setContentSectionContent(content));
          alert(response.data.message);
        }
      })
      .catch((error) => {
        console.error('Error updating content section content:', error);
      });
  };

  return (
    <div className="admin-dashboard">
      <button onClick={handleUpdateHeroBanner}>Update Hero Banner</button>
      <button onClick={handleUpdateContentSection}>Update Content Section</button>
    </div>
  );
};

export default AdminDashboard;
