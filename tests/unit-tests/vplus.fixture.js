module("vPlus Unit Tests", {
});

test("MaxLength should return true when character count and max are the same", 1, function() {
     ok($.fn.vPlus.methods.vpMaxLength.apply($('<input value="123">'), [3]));
});

test("MaxLength should return true when character count is less than the max", 1, function() {
  ok($.fn.vPlus.methods.vpMaxLength.apply($('<input value="12">'), [3]));
});

test("MaxLength should return false when character count is greater than the max", 1, function() {
  equal($.fn.vPlus.methods.vpMaxLength.apply($('<input value="1234">'), [3]), false);
});

test("MinLength should return true when character count and min are the same", 1, function() {
  ok($.fn.vPlus.methods.vpMinLength.apply($('<input value="123">'), [3]));
});

test("MinLength should return true when character count is greater than the min", 1, function() {
  ok($.fn.vPlus.methods.vpMinLength.apply($('<input value="1234">'), [3]));
});

test("MinLength should return false when character count is less than the min", 1, function() {
  equal($.fn.vPlus.methods.vpMinLength.apply($('<input value="12">'), [3]), false);
});

test("Required should return true if the field is not empty", 1, function () {
  ok($.fn.vPlus.methods.vpRequired.apply($('<input value="1234">')));
});

test("Required should return false when field is empty", 1, function() {
  equal($.fn.vPlus.methods.vpRequired.apply($('<input value="">')), false);
});

test("MatchField should return true if the field and the matched field have the same value", 1, function () {
  /*:DOC += <input value="hello" id="hello">*/
  ok($.fn.vPlus.methods.vpMatchField.apply($('<input value="hello">'), ['#hello']));
  $('#hello').remove();
});

test("MatchField should return false when field and match field values don't are not the same", 1, function() {
  /*:DOC += <input value="hello" id="hello">*/
  equal($.fn.vPlus.methods.vpMatchField.apply($('<input value="world">'), ['#hello']), false);
  $('#hello').remove();
});

test("FailHandler should add error class", function () {
  assertUndefined(this.input);
  /*:DOC input = <input value="world">*/
  var $input = $(this.input);
  $.fn.vPlus.failHandler($input, '', 'error');
  ok($input.hasClass('error'));
});

test("FailHandler should attach error message", function () {
  assertUndefined(this.div);
  /*:DOC div = <div><input id="foo"></div>*/
  var $input = $(this.div).find('#foo');
  $.fn.vPlus.failHandler($input, '', '');

  ok($input.next().hasClass('error-message'));


});

test("ClearErrors should remove error class", function () {
  assertUndefined(this.input);
  /*:DOC input = <input value="world">*/
  var $input = $(this.input);
  $.fn.vPlus.failHandler($input, '', 'error');
  ok($input.hasClass('error'));

  $.fn.vPlus.clearErrors($input, 'error');
  equal(false,$input.hasClass('error'));
});



test("ClearErrors should remove error message", function () {
  assertUndefined(this.div);
  /*:DOC div = <div><input id="foo"></div>*/
  var $input = $(this.div).find('#foo');
  $.fn.vPlus.failHandler($input, '', '');

  ok($input.next().hasClass('error-message'));
  $.fn.vPlus.clearErrors($input,'','');
  equal(false,$input.next().hasClass('error-message'))
});




