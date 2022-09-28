import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getToken } from '../utils/storage';

const HeaderContext = createContext();

export const HeaderProvider = ({ children }) => {
  const [title, setTitle] = useState('');
  const [stateToken, setStateToken] = useState(null);
  const [showCreateBlogModal, setCreateBlogModal] = useState(false);
  const [reloadBlogs, setReloadBlogs] = useState(false);
  const [blogToUpdate, setBlogToUpdate] = useState(null);

  useEffect(() => {
    (async () => {
      const _token = await getToken();
      setStateToken(_token);
    })();
  }, []);

  return (
    <HeaderContext.Provider
      value={{
        title,
        setTitle,
        stateToken,
        setStateToken,
        showCreateBlogModal,
        setCreateBlogModal,
        reloadBlogs,
        setReloadBlogs,
        blogToUpdate,
        setBlogToUpdate,
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
};

HeaderProvider.propTypes = {
  children: PropTypes.any,
};

export const useHeaderContext = () => useContext(HeaderContext);
