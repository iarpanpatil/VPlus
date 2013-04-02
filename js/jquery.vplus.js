(function($) {
  /**
   * @param {object} config
   */
  $.fn.vPlus = function(config) {

    var defaults = {
      errorClass: 'error',
      expressions: {
        email: '',
        url: ''
      }
    };
    var options = $.extend(defaults, config);
    var plugin = this;
    var $form = $(this);
    var rules = options.rules;

    //why do we do this?
    $form.find('.validation-rules').remove();

    /**
     * @param {String} val
     * @return {Boolean}
     */
    plugin.isRequired = function(val) {
      return (val != '');
    };

    /**
     * @param {String} val
     * @param {Number} expected
     * @return {Boolean}
     */
    plugin.maxLength = function(val, expected) {
      return (val.length <= expected);
    };

    /**
     * @param {String} val
     * @param {Number} expected
     * @return {Boolean}
     */
    plugin.minLength = function(val, expected) {
      return (val.length >= expected);
    };

    /**
     * @example DD/MM/YYYY or DD-MM-YYYY
     * @param {String} val
     * @return {Boolean}
     */
    plugin.isValidDate = function(val) {
      var regex = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
      return val.search(regex) !== -1;
    };


    plugin.equalElementValue = function (val, expected) {
        return (val === $(expected).val());
    };

    plugin.setCheck = function($elem, rule,expected, msg) {
      if (plugin.hasOwnProperty(rule)) {
        $elem.blur(function() {
          var $self = $(this);
          var $label = $self.next();

          if (!plugin[rule]($self.val(), expected)) {
            $self.after('<label>' + msg + '</label>');
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
        var errorMsg = group['errorMsg'] ? group['errorMsg'] : '';
        var expected =  group['expected'] ? group['expected'] : '';
        plugin.setCheck($(sel), rule, expected, errorMsg);
      }
    }
  };
}(jQuery));