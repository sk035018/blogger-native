import { createContext, useContext, useEffect, useState } from "react";
import { getToken } from "../utils/storage";

const HeaderContext = createContext();

export const HeaderProvider = ({ children }) => {
    const [title, setTitle] = useState('');
    const [stateToken, setStateToken] = useState(null);
    const [showCreateBlogModal, setCreateBlogModal] = useState(false);
    const [navigation, setNavigation] = useState(null);
    const [reloadBlogs, setReloadBlogs] = useState(false);

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
                navigation,
                setNavigation,
                reloadBlogs,
                setReloadBlogs,
            }}
        >
            {children}
        </HeaderContext.Provider>
    );
};

export const useHeaderContext = () => useContext(HeaderContext);
