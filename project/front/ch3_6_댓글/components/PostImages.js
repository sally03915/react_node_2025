import React  from 'react';
import PropTypes from 'prop-types';

const PostImages = ({images})=>{
   return (<div>구현중...</div>)
};

PostImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string,
  })).isRequired,
};

export default PostImages;