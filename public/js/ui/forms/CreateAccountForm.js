/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * */
class CreateAccountForm extends AsyncForm {
  /**
   * Создаёт счёт с помощью Account.create и закрывает
   * окно в случае успеха, а также вызывает App.update()
   * и сбрасывает форму
   * */
  onSubmit(data) {
    function callback (err, response) {
      console.log(err);
      console.log(response);
      return response.success;
    }
    Account.create(data, callback);
    if (response.success === true) {
      const modal = App.getModal('createAccount');
      modal.close();

      App.update();

      const form = App.getForm('createAccount');
      form.reset();
    }

  }
}