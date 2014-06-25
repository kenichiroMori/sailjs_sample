$(document).ready(function(){
    init() ;

    function init () {
        _resetPullDown();
    }

    function _resetPullDown () {
        var select_list = [];
        $('[id^=bet_]').each (function () {
            if ($(this).is(':disabled')) {
                select_list.push($(this).val());
            }
        });

        var pulldown = {};
        var url = 'http://192.168.5.53:1337/master';
        $.getJSON(url, function (json) {
            $.each(json, function () {
                id = $(this)[0].id;
                if ($.inArray(id+"", select_list) < 0) {
                    pulldown[id] = id +" point";
                }
            });

            $('[id^=bet_]:enabled > option').remove();
            $('[id^=bet_]:enabled').append($('<option>').html('select').val(''));
            $('[id^=bet_]:enabled').each (function () {
                id = $(this).attr("id");
                select_val = $(this).attr("select_val"); // for edit only
                $.each(pulldown, function (idx, value) {
                    $('#'+id).append($('<option>').html(value).val(idx));
                });
                $('#'+id).val(select_val); // for edit only
            });
        });
    }

    $('#submit').on('click', function(){
        var bet = {};
        $('*').prop("disabled", false);
        $.each ($('[id^=bet_]').serializeArray(), function () {
            key = $(this)[0].name.replace("bet_", "");
            bet[key] = parseInt($(this)[0].value);
        });
        bet = JSON.stringify(bet);

        $("#bet").val(bet);
    });

    $('[id^=bet_]').on('change', function() {
        if ($(this).val() != '') {
            $(this).prop("disabled", true);
        }
        _resetPullDown();
    });

});
