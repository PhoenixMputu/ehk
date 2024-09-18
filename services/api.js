// api.js
import axios from 'axios'

const API_URL = `${process.env.EXPO_PUBLIC_API_URL}`

export const verifyUser = async (email) => {
  try {
    const response = await axios.get(`${API_URL}/auth/verify-user/${email}`)
    
    return response.data // Retourne directement les données de l'API
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Erreur lors de la vérification de l'utilisateur"
    )
  }
}
