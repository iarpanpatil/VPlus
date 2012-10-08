describe("vplus  jQuery Plugin Suite", function () {

    //setup
    beforeEach(function () {
        /*:DOC +=
         <form id="my-form">
         <input type="text" class="hello-world" value="hello world">
         <input type="text" class="hello-world" id="long-text-field" value="sdahfsadjkhffjhdsfjhdfkgjhfbdhsadfasdf">
         <input type="text" id="empty-field">
         <textarea class="hello-world">text-area</textarea>
         <div id="my-div"></div>
         </form>
         */
    });

    //teardown
    afterEach(function () {
        $('#my-form').remove();
    });

    //test
    it("isRequired rule fails class and label added", function () {
        $('#my-form').vplus({
            rules: {
                "#empty-field": {
                    isRequired: {
                        expected: true,
                        errorMsg: 'Field is required'
                    }
                }
            }
        });

        var field = $('#empty-field');
        expect(field.hasClass('error')).toEqual(true);
        expect(field.next('label').text()).toEqual('Field is required');
    });


    it("minLength rule fails class and label added", function () {
        $('#my-form').vplus({
            rules: {
                "#empty-field": {
                    minLength: {
                        expected: 12,
                        errorMsg: 'Text too short'
                    }
                }
            }
        });

        var field = $('#empty-field');
        expect(field.hasClass('error')).toEqual(true);
        expect(field.next('label').text()).toEqual('Text too short');
    });

    it("if maxLength rule fails class and label added", function () {
        $('#my-form').vplus({
            rules: {
                "#long-text-field": {
                    maxLength: {
                        expected: 12,
                        errorMsg: 'Text too long'
                    }
                }
            }
        });
        var field = $('#long-text-field');
        expect(field.hasClass('error')).toEqual(true);
        expect(field.next('label').text()).toEqual('Text too long');
    });

    it("element content can be validated", function () {
        $('#my-form').vplus({
            rules: {
                "#my-div": {
                    isRequired:{
                        errorMsg:'Div not allowed empty'
                    }
                }
            }
        });
        var field = $('#my-div');
        expect(field.hasClass('error')).toEqual(true);
        expect(field.next('label').text()).toEqual('Div not allowed empty');
    });

    it("no options passed throws error", function () {
        expect(function() {
            $('#my-form').vplus();
        }).toThrow(new Error("No options provided"));
    });


});