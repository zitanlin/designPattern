- [单例](#单例)
    - [单例模式实现](#单例模式实现)
    - [单例应用场景](#单例应用场景)
- [参考链接](#参考链接)

### 单例
> <font color="#0000ff">**0、Ensure a class has only one instance and provide a global point of access to it.**</font>
> 1、单例模式：限制类实例化次数只能一次，一个类只有一个实例，并提供一个访问他的全局访问点。
> 2、场景：线程池、全局缓存、window 对象

单例模式特点：
- 类只有一个实例
- 全局可访问该实例
- 自行实例化
单例解决什么问题：
 - 节约资源——单例通常是频繁使用的对象，频繁创建、销毁实例，减少内存占用
 - 节省时间

全局对象就有单例模式的特点，但是存在：命名空间污染、维护不方便（容易覆盖）

##### 单例模式实现
> 使用一个变量存储类实例对象（初始为 null/undefined），进行类实例化时，判断类实例对象是否存在，存在则返回该实例，不存在进行进行实例的创建并返回。多次调用类生成实例方法，放回的是同一个实例对象。
![](index_files/9365eb9d-99ef-418a-bdc0-bcae49ecbfc7.jpg)

**Singleton 设计原则：**
- defines getInstance which returns the unique instance
- responsible for creating and managing the instance object

- 方法一：
> 缺点：
    1. 只能通过 getInstance 创建实例，无法通过 new 创建
    2. 管理单例、创建对象的操作，功能代码耦合

```
let Singleton = function(name) {
    this.name = name;
    this.instance = null;
}
Singleton.getInstance = function(name) {
    if(this.instance) {
        return this.instance;
    }
    return this.instance = new Singleton(name); // 创建对象
}
Singleton.prototype.getName = function() {
    console.log("---- name = ", this.name);
}
let temp1 = Singleton.getInstance("temp1");
let temp2 = Singleton.getInstance("temp2");

temp1 === temp2;  // true
temp2.getName();  // 输出 "temp1"

// 直接反映设计原则
let Singleton = (function() {
	let instance;
	function createInstance() {
		return new Object("I'm a new instance");
	}
	
	return {
		getInstance: function() {
			if(instance) return instance;
			return instance = createInstance();
		}
	}
})();
```
- 方法二：
> 通过 new 创建实例，存在缺点：管理单例、创建对象的操作，功能代码耦合

```
let Singleton = (function (name){
    let instance = null;
    return function(name) {
        if(instance) {            // 管理单例
            return instance;
        }
        this.name = name;
        return instance = this; // 将实例对象（this）赋值给 “闭包” 中的 instance
    }
})();

Singleton.prototype.getName = function() {
    console.log("----- name = ", this.name);
}

let temp1 = new Singleton("temp1");
let temp2 = new Singleton("temp2");

temp2.getName();  // 输出 "temp1"
```

- 方法三：管理单例操作，与对象创建操作拆分
> 通过代理的形式，将管理单例操作，与对象创建操作拆分，实现更小粒度的划分

```
let ProxyCreateSingleton = (function() {
    let instance;
    return function(name) {
        if(instance) {            // 仅管理单例操作
            return instance;
        }
        return instance = new Singleton(name);
    }
})();

// 独立的 Singleton 类，处理对象实例创建操作
let Singleton = function(name) {
    this.name = name;
}

Singleton.prototype.getName = function() {
    console.log("--- name = ", this.name);
}

let temp1 = ProxyCreateSingleton("temp1");
let temp2 = ProxyCreateSingleton("temp2");
```

- 惰性单例模式
> 意义：需要时才创建类实例对象，解决懒加载的性能优化。例如：页面弹框提示，多次调用，都只有一个弹框对象，只是展示信息内容不同。

```
// 【1】使用单例创建 Dialog
let getSingleton = function(fn) {
    let intance;
    return function() {
        // 确定 this 上下文并传递参数
        return intance || (intance = fn.apply(this, arguments));
    }
}

let createAlertMessage = function(msg) {
    let divEle = document.createElement("div");
    divEle.innerHtml = msg;
    divEle.style.display = "none";
    document.body.appendChild(divEle);
    return divEle;
}

let createSingleAlertMessage = getSingleton(createAlertMessage);
document.getElementById("btn-show").addEventListener('click', function() {
    let alertMessage = createSingleAlertMessage("我是弹框");
    alertMessage.style.display = "block";
})

// 【2】使用单例创建 loading
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
// singleton-demo.html 使用
<script type="text/javascript">
    let loading = getSingletonInstance(showLoadingSingleton);
    document.getElementById("loading-show").addEventListener("click", function() {
        loading(true);
    })

    $("#loading-close").on("click", function() {
        loading(false);
    });
</script>
```
- 简单方式
```
var SingletonFactory = (function(){
    function SingletonClass() {}
    var instance;
    return {
        getInstance: function(){
            if (instance == null) {
                instance = new SingletonClass();
                // Hide the constructor so the returned object can't be new'd...
                instance.constructor = null;
            }
            return instance;
        }
   };
})();
```
##### 单例应用场景
1. [弹框 Modal（仅有一个单例、展示内容可自定义）](https://juejin.im/post/57e9e5065bbb50005d6c6345)
2. 全局唯一的 loading 弹框
3. 购物车（一个用户只有一个购物车）
4. 全局态管理 store（redux、vuex）
5. 引用第三方库（多次引用只会使用一个库引用，如：jQuery）

### 参考链接
- https://www.dofactory.com/javascript/singleton-design-pattern
- https://www.sitepoint.com/javascript-design-patterns-singleton/
- [StackOverflow](https://stackoverflow.com/questions/1479319/simplest-cleanest-way-to-implement-singleton-in-javascript)
- [单例模式](https://juejin.im/post/5d11bcdcf265da1b94215726)
