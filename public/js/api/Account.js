/**
 * Класс Account наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/account'
 * */
class Account extends Entity {

  static UPL = '/account';
  /**
   * Получает информацию о счёте
   * */
  static get(id, callback){
    createRequest({
      id,
      method: 'GET',
      callback: (err, response) => {
        console.log(response);
        callback(err, response);
      }
    })
  }
}
