export async function userApi(){
    try {
      const response = await fetch(
        'http://185.255.133.251:8051/'
      );
      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Ошибка получения данных')
      throw error;
    }
  };

