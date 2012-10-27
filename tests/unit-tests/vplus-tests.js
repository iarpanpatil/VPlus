/**
 * Depends:
 * jquery
 * @extends jQuery.fn
 */
/*
 $("#mySelector").vplus({
 rules:{
 ".hello-world":{
 isRequired:true
 }
 }
 });
 */
(function ($) {
    /**
     * Add the plugin to the jQuery prototype
     * @param {object} options
     * @return {function}
     * @this {jQuery}
     * @constructor
     */
    $.fn.vplus = function (options) {

        //return of no options exist
        if (options === undefined) {
            throw new Error("No options provided");
        }
        var defaults = {
            errorClass:'error',
            expressions:{
                email:'',
                url:''
            }
        };
        var validates = true;
        options = $.extend(defaults, options);
        var plugin = $.fn.vplus;
        /**
         * @param {String} val
         * @return {Boolean}
         */
        plugin.isRequired = function (val) {
            return (val != '');
        };
        /**
         * @param {String} val
         * @param {Number} expected
         * @return {Boolean}
         */
        plugin.maxLength = function (val, expected) {
            return (val.length <= expected);
        };
        /**
         * @param {String} val
         * @param {Number} expected
         * @return {Boolean}
         */
        plugin.minLength = function (val, expected) {
            return (val.length >= expected);
        };
        /**
         * @example DD/MM/YYYY or DD-MM-YYYY
         * @param {String} val
         * @return {Boolean}
         */
        plugin.isValidDate = function (val) {
            var regex = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
            return val.search(regex) !== -1;
        };
        var $form = $(this);
        var rules = options.rules;
        $form.find('.validation-rules').remove();
        plugin.setCheck = function ($elem, rule, msg) {
            if (plugin.hasOwnProperty(rule)) {
                $elem.blur(function () {
                    var value = $(this).val();
                    var $self = $(this);
                    var $label = $self.next();
                    if (!plugin[rule](value)) {
                        if ($label.is('label')) {
                            $label.html(msg);
                        } else {
                            $self.after('<label>' + msg + '</label>');
                        }
                    } else {
                        if ($label.is('label')) {
                            $label.remove();
                        }
                    }
                });
            }
        };
        for (var sel in rules) {
            for (var rule in rules[sel]) {
                var group = rules[sel][rule];
                var errorMsg = group['errorMsg']? group['errorMsg']: '';
                plugin.setCheck($(sel), rule, errorMsg);
            }
        }
    };
}(jQuery));