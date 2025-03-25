import { DatacostAndCategoryForUser } from '../types/types'

export async function sendCostAndCatgory(data: DatacostAndCategoryForUser) {
  try {
    const response = await fetch(
      `http://185.255.133.251:8051/api/balance/getBalance`,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-type': 'application/json',
        },
      }
    )

    if (!response.ok) {
      throw new Error('Данные не отправились')
    }
    const result = await response.json()
    return result
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}
