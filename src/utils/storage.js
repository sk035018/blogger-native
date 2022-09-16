import AsyncStorage from '@react-native-async-storage/async-storage';

export const setToken = async token => {
    return await AsyncStorage.setItem('@token', token);
};

export const getToken = async () => {
    return await AsyncStorage.getItem('@token');
};

export const removeToken = async () => {
    return await AsyncStorage.removeItem('@token');
};
