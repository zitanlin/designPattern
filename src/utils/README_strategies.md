- [策略模式](#策略模式)
- [策略模式应用场景](#策略模式应用场景)
- [策略模式优点](#策略模式优点)

### 策略模式
> 1、要实现一个功能，有多种方案可以选择。通过定义策略，将其一个个算法封装起来，并且他们是可以相互替换
> 2、<font color="#FF0000" font-size="1">**一是封装不同的策略，二是 Context；通过组合和委托来让 Context 拥有执行策略的能力。从而实现可复用、可扩展和可维护，避免大量复制粘贴工作**</font>

- 首先，将检验逻辑封装成策略对象

```
var strategies = {
    // 非空校验
    isNonEmpty: function(value, errorMsg) {
        if(value === '') {
            return errorMsg; // 返回错误字符串信息, bool 数据为 true
        }
    },
    // 最小长度校验
    minLength: function(value, minLen, errorMsg) {
        if(value.length < minLen) {
            return errorMsg;
        }
    },
    // 手机号校验
    isMobile: function(value, errorMsg) {
        if(!/^1[1|3|4|5|7|8][0-9]{9}$/.test(value)) {
            return errorMsg;
        }
    }
};
```

- 其次：实现 Validator 类，Validator 接收用户的请求并委托给 strategy 对象。先看看实际应用是如何向 Validator 类发送请求的。

```
function validateFunc() {
    var validator = new Validator();
    
    validator.add('isNonEmpty', registerForm.userName, '用户名不能为空');
    validator.add('minLength', registerForm.password, '密码长度不能少于6位');
    validator.add('isMobile', registerForm.phoneNum, '手机号码不正确');
    
    var errorMsg = validator.start(); // 一个个进行校验，获取校验结果
    return errorMsg;
}

registerForm.onsubmit = function() {
    var errorMsg = validateFunc(); // 如果 errorMsg 为字符串，说明校验失败
    if(errorMsg) {
        alert(errorMsg);
        return false;       // 阻止表单提交
    }
}
```

- 最后：根据实际调用，实现 Validator 类

```
function Validator() {
    this.cache = [];
}
Validator.prototype.add = function(rule, value, errorMsg) {
    var arr = rule.split(':');
    this.cache.push(function() {
        // 规则
        var strategy = arr.shift();
        arr.unshift(value);
        arr.push(errorMsg);
        return strategies[strategy].apply(value, arr);
    });
}
Validator.prototype.start = function() {
    for (var i = 0, validatorFunc; validatorFunc = this.cache[i++];) {
        var msg = validatorFunc();
        if (msg) {
            return msg;
        }
    }
};
```

### 策略模式应用场景
- 多重条件语句判断，执行对应的算法场景
- 表单校验

### 策略模式优点
- 采用组合、委托等技术和思想，有效避免多重条件判断
- 采用开放-封闭原则，将算法封装到独立的 strategies 中，易于扩展、理解、切换
- 策略模式中的算法可以进行复用，避免代码的复制、粘贴