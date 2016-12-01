/**
 * Created by opiru on 01.12.2016.
 */
;(function () {
    "use strict";
    window.addEventListener('scroll', (e) => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        let scrollHeight = window.document.body.scrollHeight;
        let clientWindowSize = window.document.body.clientHeight;
        if (scrollHeight - (scrollTop + clientWindowSize) < clientWindowSize) {
            let button = document.getElementById('load-more');
            if (button) {
                button.click();
                console.log('click');
            }
        }
    });
})();
