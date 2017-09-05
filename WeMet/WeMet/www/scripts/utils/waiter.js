define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // I am not that waiter... I provide a method like Thread.Sleep
    var Waiter = (function () {
        function Waiter() {
        }
        return Waiter;
    }());
    Waiter.Sleep = function (interval) {
        var start = new Date().getTime();
        while (new Date().getTime() < start + interval) { }
        ;
    };
    exports.Waiter = Waiter;
});
//# sourceMappingURL=waiter.js.map