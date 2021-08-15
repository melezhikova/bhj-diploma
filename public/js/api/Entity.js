/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * */
class Entity {
  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
   * */
  static list(data, callback){
    createRequest({
      data, 
      method: 'GET',
      callback: (err, response) => {
        console.log(err);
        console.log(response);
      }
    })
  }

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create(data, callback) {
    createRequest({
      data,
      method: 'PUT',
      callback: (err, response) => {
        console.log(err);
        console.log(response);
      }
    })
  }

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove(data, callback ) {
    method = 'DELETE';
    createRequest({
      data,
      method: 'DELETE',
      callback: (err, response) => {
        console.log(err);
        console.log(response);
      }
    })
  }
}
