import { useQuery } from '@tanstack/react-query'
import { verifyUser } from '../services/api'

export const useCheckUser = (email) => {
  return useQuery({
    queryKey: ['verifyUser', email],
    queryFn: () => verifyUser(email),
    enabled: !!email,
  })
}
