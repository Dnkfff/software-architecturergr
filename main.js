"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var fs_1 = require("fs");
var print = function (args) {
    return new Promise(function (resolve, reject) {
        try {
            if (typeof args === 'object') {
                resolve(args.join(' '));
            }
            resolve(args);
        }
        catch (error) {
            reject(error);
        }
    });
};
var palindrom = function (args) {
    return new Promise(function (resolve, reject) {
        try {
            var result = void 0;
            if (typeof args === 'object') {
                result = args.join('') + args.reverse().join('');
            }
            if (typeof args === 'string') {
                console.log(args.split('').reverse().join(''));
                result = args + args.split('').reverse().join('');
            }
            resolve(result);
        }
        catch (error) {
            reject(error);
        }
    });
};
var setTimeoutFunc = function (_a) {
    var timer = _a.timer, func = _a.func;
    function timeout(ms) {
        return new Promise(function (resolve) { return setTimeout(resolve, ms); });
    }
    return new Promise(function (resolve, reject) { return __awaiter(void 0, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, 3, 4]);
                    setTimeout(func, timer);
                    return [4 /*yield*/, timeout(timer)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 2:
                    error_1 = _a.sent();
                    reject(error_1);
                    return [3 /*break*/, 4];
                case 3:
                    resolve('success');
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); });
};
var commandMatch = {
    palindrom: palindrom,
    setTimeoutFunc: setTimeoutFunc,
    print: print
};
var EventLoop = /** @class */ (function () {
    function EventLoop() {
        this.status = 'closed';
        this.callStack = null;
        this.callStackStatus = null;
    }
    EventLoop.prototype.start = function () {
        this.status = 'opened';
        console.log("[Event Loop] *opened* | ".concat(new Date().toISOString().substr(11, 8)));
    };
    EventLoop.prototype.checkCallStack = function () {
        var _this = this;
        var callStack = this.callStack;
        if (!callStack || callStack.length === 0)
            return;
        var _loop_1 = function () {
            var inputCommand = callStack.shift();
            var callingFunction = commandMatch[inputCommand.command];
            if (!this_1.callStackStatus)
                this_1.callStackStatus = [];
            this_1.callStackStatus.push('pending');
            callingFunction(inputCommand.args).then(function (result) {
                console.log("[Event Loop] command : ".concat(inputCommand.command, " , arguments: ").concat(inputCommand.args.toString(), ", RESULT: ").concat(result, " | ").concat(new Date()
                    .toISOString()
                    .substr(11, 8)));
                _this.callStackStatus[_this.callStackStatus.indexOf('pending')] = 'completed';
                if (!_this.callStackStatus.includes('pending')) {
                    _this.awaitFinish();
                }
            });
        };
        var this_1 = this;
        while (callStack.length !== 0) {
            _loop_1();
        }
    };
    EventLoop.prototype.awaitFinish = function () {
        if ((!this.callStack || this.callStack.length === 0) &&
            (!this.callStackStatus || !this.callStackStatus.includes('pending'))) {
            this.status = 'closed';
            console.log("[Event Loop] *finished* | ".concat(new Date().toISOString().substr(11, 8)));
        }
    };
    EventLoop.prototype.post = function (_a) {
        var command = _a.command, args = _a.args;
        var status = this.status;
        if (status === 'closed') {
            throw new Error('Event loop is not running. Before post command use Start() method');
        }
        if (!Object.keys(commandMatch).includes(command)) {
            throw new Error("command: ".concat(command, " doesnt exist"));
        }
        if (!this.callStack) {
            this.callStack = [];
        }
        this.callStack.push({ command: command, args: args });
        this.checkCallStack();
    };
    return EventLoop;
}());
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    var eventLoop;
    return __generator(this, function (_a) {
        eventLoop = new EventLoop();
        eventLoop.start();
        (0, fs_1.readFile)('./commands.txt', 'utf8', function (err, data) {
            if (err) {
                throw new Error(err.toString());
            }
            var commandsArray = data.split('\r\n');
            commandsArray.forEach(function (item) {
                var splittedItem = item.split(' ');
                var command = splittedItem.shift();
                if (!Object.keys(commandMatch).includes(command))
                    return;
                eventLoop.post({ command: command, args: splittedItem.length === 1 ? splittedItem[0] : splittedItem });
            });
            eventLoop.post({
                command: 'setTimeoutFunc',
                args: {
                    timer: 1000,
                    func: function () {
                        console.log('setTimeout is completed');
                    }
                }
            });
            eventLoop.awaitFinish();
        });
        return [2 /*return*/];
    });
}); };
main();
