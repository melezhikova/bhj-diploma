//const { response } = require("express");

/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor( element ) {
    this.element = () => {
      if (!element) {
        throw new Error ("Ошибка!");
      }
      return element;
    } 

    this.lastOptions = {};
    this.registerEvents();
  }

  /**
   * Вызывает метод render для отрисовки страницы
   * */
  update() {
    this.render(this.lastOptions);
  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {
    const accountButtons = Array.from(document.querySelectorAll('.remove-account')),
    transactionButtons = Array.from(document.querySelectorAll('.transaction__remove'));

    accountButtons.forEach((item) => {
      item.onclick = function () {
        this.removeAccount();
      }
    })

    transactionButtons.forEach((item) => {
      item.onclick = function () {
        this.removeTransaction();
      }
    })
  }

  /**
   * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.updateWidgets(),
   * либо обновляйте только виджет со счетами
   * для обновления приложения
   * */
  removeAccount() {
    if (this.lastOptions) {
      let agree = confirm('Вы действительно хотите удалить счёт?');
      if (agree === true) {
        let check = Account.remove(this.lastOptions, ((err, response) => {
          console.log(err);
          console.log(response);
          return response.success}))
        if (check === true) {
          App.updateWidgets();
        }  
      }
    }
  }

  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update(),
   * либо обновляйте текущую страницу (метод update) и виджет со счетами
   * */
  removeTransaction( id ) {
    let agree = confirm('Вы действительно хотите удалить счёт?');
    if (agree === true) {
      let check = Transaction.remove(id, ((err, response) => {
        console.log(err);
        console.log(response);
        return response.success}))
      if (check === true) {
        App.update();
      }  
    }
  }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render(options){
    // if (options) {
    //   this.lastOptions = options;
    //   console.log(this.lastOptions);
    //   this.renderTitle(Account.get(options, () => (err, response) => {
    //     console.log(response)}
    //   ));
    //   this.renderTransactions(Transaction.list(options, () => (err, response) => {
    //     console.log(response)}
    //   ));
    // }
  }

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {
    this.renderTransactions({});
    this.renderTitle('Название счета');
    this.lastOptions = {};
  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle(name){
    const title = document.querySelector('.content-title');
    title.innerText = name;
  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * */
  formatDate(date){
    const day = date.substring(8,10),
    monthNumder = date.substring(5,7)*1,
    year = date.substring(0,4),
    hour = date.substring(11,13),
    minutes = date.substring(14,16);

    let month;
    switch (monthNumder) {
      case 1: month = 'января'; break;
      case 2: month = 'февраля'; break;
      case 3: month = 'марта'; break;
      case 4: month = 'апреля'; break;
      case 5: month = 'мая'; break;
      case 6: month = 'июня'; break;
      case 7: month = 'июля'; break;
      case 8: month = 'августа'; break;
      case 9: month = 'сентября'; break;
      case 10: month = 'октября'; break;
      case 11: month = 'ноября'; break;
      case 12: month = 'декабря'; break;
    }

    return `${day} ${month} ${year} г. в ${hour}:${minutes}`;
  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML(item){
    const date = this.formatDate(item.created_at);
    return `
    <div class="transaction transaction_${item.type} row">
    <div class="col-md-7 transaction__details">
      <div class="transaction__icon">
          <span class="fa fa-money fa-2x"></span>
      </div>
      <div class="transaction__info">
          <h4 class="transaction__title">${item.name}</h4>
          <!-- дата -->
          <div class="transaction__date">${date}</div>
      </div>
    </div>
    <div class="col-md-3">
      <div class="transaction__summ">
      <!--  сумма -->
          ${item.sum} <span class="currency">₽</span>
      </div>
    </div>
    <div class="col-md-2 transaction__controls">
        <!-- в data-id нужно поместить id -->
        <button class="btn btn-danger transaction__remove" data-id="${item.id}">
            <i class="fa fa-trash"></i>  
        </button>
    </div>
</div>
    `
  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions(data){
    let html;
    for (let item in data) {
      itemCode = getTransactionHTML(item);
      html += `
        <div class="content-wrapper">
          <section class="content-header">
            <h1>
              <!-- ... -->
            </h1>
          </section>
          <section class="content">
            ${itemCode}
          </section>
        </div>
      `
    }
  }
}