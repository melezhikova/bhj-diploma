/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    if (options.method === 'GET') {
        let urlGet = options.url + JSON.stringify(options.data);
        try {
            xhr.open('GET', urlGet);
            xhr.send();
            xhr.addEventListener('readystatechange', function () {
                if (xhr.readyState === xhr.DONE && xhr.status === 200) {
                    console.log(xhr.response);
                    options.callback(xhr.err, xhr.response);
                }
            })
        } catch (e) {
            console.log(e);
        }
    } else {
        try {
            let formData = new FormData(options.data);
            for (let option in options) {
                let value = options[option];
                formData.append(option, value);
            }
            xhr.open(options.method, options.url);
            xhr.send(formData);
            xhr.addEventListener('readystatechange', function () {
                if (xhr.readyState === xhr.DONE && xhr.status === 200) {
                    console.log(xhr.response);
                    options.callback(xhr.err, xhr.response);
                }
            })
        } catch (e) {
            console.log(e);
        }
    }
}