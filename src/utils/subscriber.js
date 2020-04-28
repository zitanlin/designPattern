/**
 * 发布订阅模式一: 实现功能, 不考虑任何异常的处理
 */
// var EventContainer = function() {
//     this.contianer = {};
// }

// EventContainer.prototype.listen = function(eventName, callback) {
//     this.contianer[eventName] = callback;
// }

// EventContainer.prototype.emit = function(eventName) {
//     this.contianer[eventName]();
// }

// EventContainer.prototype.remove = function(eventName) {
//     delete this.contianer[eventName];
// }


/**
 * 发布订阅模式二: 实现功能, 同时针对异常情况进行处理
 */
var EventContainer = function() {
    this.container= new Map();
}
// 常见的事件注册有: listen、register、on
EventContainer.prototype.listen = function(eventName, callback) {
    this.container.set(eventName, callback);
}
// 常见事件触发有: emit、trigger
EventContainer.prototype.emit = function(eventName) {
    let callback = this.container.get(eventName);
   	typeof(callback) === "function" && callback();
}
// 常见的取消订阅有: remove、off
EventContainer.prototype.remove = function(eventName) {
    this.container.delete(eventName);
}
EventContainer.prototype.once = function(eventName, callback) {
	var that = this;
    this.container.set(eventName, function() {
		that.container.delete(eventName);
		callback();
	});
}
