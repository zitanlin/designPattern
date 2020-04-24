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
function showLoadingSingleton(flag = true) {
    let divEle = document.createElement("div");
    let loadingImage = document.createElement("img");
    loadingImage.src = "../../../media/image/loading.gif";
    divEle.id = "loading-container";

    divEle.appendChild(loadingImage);
    divEle.style.display = flag ? "flex" : "none";
    document.body.appendChild(divEle);

    return divEle;
}
