// 
function getSingletonInstance(fn) {
    let instance;
    return function() {
        if (instance) {
            instance.style.display = arguments[0] ? "flex" : "none";
        } else {
            instance = fn.apply(this, arguments)
        }
        return instance;
    }
}

// 要实现的单例对象
function showLoadingSingleton() {
    let divEle = document.createElement("div");
    let loadingImage = document.createElement("img");
    loadingImage.src = "../../../media/image/loading.gif";
    divEle.id = "loading-container";

    divEle.appendChild(loadingImage);
    divEle.style.display = "flex";
    document.body.appendChild(divEle);

    return divEle;
}


// 下面将创建单例对象、管理单例解耦处理
var loadingSingletonFactory = (function() {
    // 创建单例对象
    function loadingSingleClass() {
        let divEle = document.createElement("div");
        let loadingImage = document.createElement("img");
        loadingImage.src = "../../../media/image/loading.gif";
        divEle.id = "loading-container";

        divEle.appendChild(loadingImage);
        divEle.style.display = 'flex';
        document.body.appendChild(divEle);

        return divEle;
    }

    var instance;

    return {
        // 单例管理
        getInstance: function(flag = true) {
            if(instance) {
                instance.style.display = flag ? "flex" : "none";
            } else {
                instance = new loadingSingleClass();
            }
            return instance;
        }
    }
})();
