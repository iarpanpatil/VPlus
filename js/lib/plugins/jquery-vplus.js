(function ($) {
    $.widget('o1software.vplus', {
        options:{
            errorClass:'error'
        },
        isRequired:function (val) {
            return (val != '');
        },
        maxLength:function (val, expected) {
            return (val.length <= expected);
        },
        minLength:function (val, expected) {
            return (val.length >= expected);
        },
        isValidDate:function (val) {
            var regex = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
            return val.search(regex) !== -1;
        },
        validate:function () {
            var self = this;
            var options = self.options;
            var valid = true;
            for (var selector in options.rules) {
                $(self.element).find(selector).each(function (key, value) {
                    var $elem = $(value);
                    for (var method in options.rules[selector]) {
                        var params = options.rules[selector][method];
                        if (!self[method]($elem.val(), params.expected)) {
                            self._markError($elem, params.errorMsg);
                            valid = false;
                        } else {
                            self._removeError($elem);
                        }
                    }
                });
            }
            return valid;
        },
        _create:function () {
            var self = this;
            var options = self.options;
            for (var selector in options.rules) {
                $(self.element).find(selector).each(function (key, value) {
                    var $elem = $(value);
                    for (var method in options.rules[selector]) {
                        var params = options.rules[selector][method];
                        $elem.blur(function () {
                            if (!self[method]($elem.val(), params.expected)) {
                                self._markError($elem, params.errorMsg);
                            } else {
                                self._removeError($elem);
                            }
                        });
                    }
                });
            }
        },
        _markError:function ($element, errorMsg) {
            var $next = $element.next();
            if (!$next.is('label')) {
                $element.after('<label>' + errorMsg + '</label>')
            } else {
                $next.html(errorMsg);
            }
            $element.addClass(this.options.errorClass);
        },
        _removeError:function ($element) {
            var $next = $element.next();
            if ($next.is('label')) {
                $next.remove();
            }
            $element.removeClass(this.options.errorClass);
        }
    });
}(jQuery));