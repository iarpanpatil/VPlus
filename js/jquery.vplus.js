(function($) {
  var setError;
  var methods = {
    vpRequired: function(expected) {
      return this.val();

    },
    vpMinLength: function(expected) {
      return this.val().length >= expected;

    },
    vpMaxLength: function(expected) {
      return this.val().length <= expected;
    },
    vpMatchField: function(fieldSelector) {
      return this.val() === $(fieldSelector).val();
    }
  };

  $.fn.vPlus = function(config, fn) {
    var defaults;
    var options;

    if(typeof config == "string"){
      methods[config] = fn;
      return true;
    }

    defaults =  {
      onSubmit: false,
      setError: function(element, message) {
        console.log(message);
      }
    };
    options = $.extend({}, defaults, config);
    setError = options.setError;

    return this.each(function() {
      var $scope = $(this);

      if (!options.onSubmit) {
        $scope.on('blur', 'input', function() {
          var $element = $(this);
          var data = $element.data();
          $.each(data, function(key, args) {
            var error = args.shift();
            if (methods[key]) {
              if(!methods[key].apply($element, args)){
                setError($element, error);
                return false;
              }
            }
            return true;
          });
        });
      } else {
        $scope.on('click', function(e) {
          e.preventDefault();
          var $inputs = $scope.closest('form').find('input');

          $inputs.each(function() {
            var $element = $(this);
            var data = $element.data();
            $.each(data, function(key, args) {
              var error = args.shift();
              if (methods[key]) {
                if(!methods[key].apply($element, args)){
                  setError($element, error);
                  return false;
                }
              }
              return true;
            });
          })
        });
      }
    });
  };
}(jQuery));