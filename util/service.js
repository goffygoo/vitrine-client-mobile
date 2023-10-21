import axios from 'axios'
import * as SecureStore from 'expo-secure-store'
import { SERVER } from '../config.json'

export const request = async (method, route, body, onSuccess, onError) => {
    const token = await SecureStore.getItemAsync('token')

    const config = {
        headers: {
            'Authorization': [token]
        }
    }

    if (method === 'get') {
        body = config
    }

    axios[method](`${SERVER}${route}`, body, config).then(response => {
        onSuccess(response)
    }).catch(err => {
        onError(err)
    })
}
