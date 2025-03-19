import { DatacostAndCategoryForUser } from '../types/types'

export async function sendCostAndCatgory(data: DatacostAndCategoryForUser) {
  
  try {
    const token = localStorage.getItem("authToken");

    if (!token) {
      throw new Error("Токен авторизации не найден");
    }


    const response = await fetch(
      `http://185.255.133.251:8051/api/balance/addNewItem`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(data),
        credentials: 'include',
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



  
  