import { createContext, useContext, useEffect, useState } from "react";
import { getToken } from "../utils/storage";

const HeaderContext = createContext();

export const HeaderProvider = ({ children }) => {
    const [title, setTitle] = useState('');
    const [stateToken, setStateToken] = useState(null);

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
            }}
        >
            {children}
        </HeaderContext.Provider>
    );
};

export const useHeaderContext = () => useContext(HeaderContext);
