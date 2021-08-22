//const { response } = require("express");

/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);

    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    Account.list();
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, callback);
    if (response.success === true) {
      App.update();
//если доход
      // const form = App.getForm('createIncome');
      // form.reset();
//если расход   
      // const form = App.getForm('createExpense');
      // form.reset();
//если доход
      // const modal = App.getModal('newIncome');
      // modal.close();
//если расход
    // const modal = App.getModal('newExpense');
    // modal.close();
    }
  }
}