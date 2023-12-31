import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

export const setItem = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
        return true;
    } catch (_e) {
        return false;
    }
}

export const setObject = async (key, value) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
        return true;
    } catch (_e) {
        return false;
    }
}

export const getItem = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value;
    } catch (_e) {
        return null;
    }
}

export const removeItem = async (key) => {
    try {
        await AsyncStorage.removeItem(key)
        return true;
    } catch (_e) {
        return false;
    }
}

export const getObject = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (_e) {
        return null;
    }
};

export const setSecureItem = async (key, value) => {
    try {
        await SecureStore.setItemAsync(key, value);
        return true;
    } catch (_e) {
        return false;
    }
}

export const getSecureItem = async (key) => {
    try {
        const value = await SecureStore.getItemAsync(key);
        return value;
    } catch (_e) {
        return null;
    }
}

export const removeSecureItem = async (key) => {
    try {
        await SecureStore.deleteItemAsync(key)
        return true;
    } catch (_e) {
        return false;
    }
}