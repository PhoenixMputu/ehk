// api.js
import axios from 'axios'

const API_URL = `${process.env.EXPO_PUBLIC_API_URL}`

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    })

    return response.data
  } catch (error) {
    throw new Error(error.message)
  }
}
export const verifyUser = async (email) => {
  try {
    const response = await axios.get(`${API_URL}/auth/verify-user`, {
      params: { email },
    })

    return response.data
  } catch (error) {
    throw new Error(error.message)
  }
}

export const signup = async (user) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, user)

    return response.data
  } catch (error) {
    throw new Error(error)
  }
}

export const uploadImageCloudinary = async (file) => {
  try {
    const response = await axios.post(`${API_URL}/cloudinary/upload`, file, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data.secure_url
  } catch (error) {
    throw new Error('Upload failed:', error)
  }
}
