(function($) {
  var setError;

  //todos: Add validation for radio buttons
  //todos: Add validation for select boxes
  //todos: Add validation for textareas
  //todos: Add unit tests
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
          $.each(data, function(key, org) {
            var args = org.slice(0);
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

            //fixmes: share this functionality and save about 5 lines of code
            $.each(data, function(key, org) {
              var args = org.slice(0);

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