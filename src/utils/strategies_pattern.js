// 校验逻辑封装成策略对象
var ipv4_regular = /^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$/;
var ipv6_regular = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;

var mac_regular = /([A-Fa-f0-9]{2}:){5}[A-Fa-f0-9]{2}/;             // mac 之间通过 【:】 进行分隔 
var mac_regular1 = /([A-Fa-f0-9]{2}-){5}[A-Fa-f0-9]{2}/;            // mac 之间通过 【-】 进行分隔
var mac_regular2 = /([A-Fa-f0-9]{2}[:-]){5}[A-Fa-f0-9]{2}/;         // mac 之间通过 【: -】 任意一个进行分隔

var mobile_regular = /^1[1|3|4|5|7|8][0-9]{9}$/;                    // 中国大陆手机号  或  /^1[34578]\d{9}$/
var cn_regular = /^[\u4e00-\u9fa5]/;                                // 仅支持中文
var address_regular = /^[1-9]\d{5}/;                                // 中国大陆邮政邮编
var email_regular = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/; // 电子邮件 Email   或  /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
var identity_regular = /^\d{15}(\d\d[0-9xX])?/;                     // 中国大陆身份证号(15位或18位)
var special_regular = /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/;               // 只含有汉字、数字、字母、下划线  或  /[\w\u4E00-\u9FA5]$/

var strategies = {
	// 非空校验
	isNonEmpty: function(value, errorMsg) {
        // 针对 undefined、null、''、0 都会进行校验, 不仅仅是非空校验
		if(!value) {
			return errorMsg; // 返回错误字符串信息, bool 数据为 true
		}
	},
	// 最小长度校验
	minLength: function(value, minLen, errorMsg) {
		if(value.length < minLen) {
			return errorMsg;
		}
    },
    // 最大长度校验
    maxLength: function(value, maxLen, errorMsg) {
        if(value.length > maxLen) {
			return errorMsg;
		}
    },
	// 手机号校验
	isMobile: function(value, errorMsg) { 
		if(!mobile_regular.test(value)) {
			return errorMsg;
		}
    },
    // ipv4 校验
    ipv4: function(value, errorMsg) {
        if(!ipv4_regular.test(value)) {
            return errorMsg;
        }
    },
    // ipv6 校验
    ipv6: function(value, errorMsg) {
        if(!ipv6_regular.test(value)) {
            return errorMsg;
        }
    },
    // ipv4、ipv6 校验
    ipv4_ipv6: function(value, errorMsg) {
        if(!ipv4_regular.test(value) && !ipv6_regular.test(value)) {
            return errorMsg;
        }
    },
    // mac 地址校验
    mac: function(value, errorMsg) {
        if(!mac_regular.test(value)) {
            return errorMsg;
        }
    }
};

function Validator() {
	this.cache = [];
}
/**
 * 功    能: 【Validator 类实现方式一】: 所有的校验方法入参只有 2 个: value——待校验参数值; errorMsg——校验失败信息 
 * 实现思路: 可以通过 call 实现, 因为校验方法入参只有两个, 因此可通过 call 实现, 但是针对校验方法入参个数不定时, call 无法实现
 * 入    参:
 *          rule: string 类型, 校验规则, 例如: rule="isNonEmpty", rule="minLength:6"
 *          value: string 类型, 传入的 value 值
 *          errorMsg: string 类型, 校验失败提示的信息, 例如: errorMsg="用户名不能为空", errorMsg="密码长度不能少于6位"
 * 返 回 值: 
 *          this.cache: array<function>, 策略对象中校验函数组成的数组
 */
Validator.prototype.add = function(rule, value, errorMsg) {
	this.cache.push(function() {
		return strategies[rule].call(value, value, errorMsg);
	})
};
Validator.prototype.start = function() {
	for(var i=0; i<this.cache.length; i++) {
        var validatorFunc = this.cache[i]
        var msg = validatorFunc();
		if(msg) return msg;
	}
};

/**
 * 功    能: 【Validator 类实现方式二】: 校验方法入参个数不确定, 不同校验方法的入参个数不一致 
 * 实现思路: 通过 apply 实现, 从而解决不同校验方法入参数量不一致的问题
 * 入    参:
 *          rule: string 类型, 校验规则, 例如: rule="isNonEmpty", rule="minLength:6"
 *          value: string 类型, 传入的 value 值
 *          errorMsg: string 类型, 校验失败提示的信息, 例如: errorMsg="用户名不能为空", errorMsg="密码长度不能少于6位"
 * 返 回 值: 
 *          this.cache: array<function>, 策略对象中校验函数组成的数组
 */
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

