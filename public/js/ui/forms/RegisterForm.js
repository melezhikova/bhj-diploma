//const { response } = require("express");

/**
 * Класс RegisterForm управляет формой
 * регистрации
 * */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
    User.register(data, () => {return response.success});
    if (response.success === true) {
      const form = App.getForm('register');
      form.reset();

      App.setState('user-logged');

      const modal = App.getModal('register');
      modal.close();
    }
  }
}