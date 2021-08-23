/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    console.log(options);
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    if (options.method === 'GET') {
        const currentData = options.data;
        let result = '';
        for (let item in currentData) {
            let value = currentData[item];
            result += `${item}=${value}&`
        }
        const dataUrl = result.substring(0, result.length - 1);
        let urlGet = options.url + '?' + dataUrl;
        try {
            xhr.open('GET', urlGet);
            xhr.send();
            xhr.addEventListener('readystatechange', function () {
                if (xhr.readyState === xhr.DONE && xhr.status === 200) {
                    console.log(xhr.response);
                    console.log(options.callback);
                    options.callback(xhr.err, xhr.response);
                }
            })
        } catch (e) {
            console.log(e);
        }
    } else {
        try {
            let formData = new FormData();
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