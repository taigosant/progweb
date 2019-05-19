var getValue, setValue;
(function () {
    var secret = 0;
    getValue = function () {
        return secret;
    };
    setValue = function (v) {
        if (typeof v === "number") {
            secret = v;
        }
    };
})();

console.log(getValue());
setValue(8);
console.log(getValue());
setValue(false);
console.log(getValue());