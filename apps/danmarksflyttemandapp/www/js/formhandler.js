/* Script written by Rami@alphastagestudios.com
    All Copyrights preserved.
*/

function initContactFormHandler() {
    $('#kontakt-send').bind('click', function(evt) {
    evt.preventDefault();
    $.post('http://danmarksflyttemandapp.herokuapp.com/kontaktform-handler.php', {

        Company = $('#company_input').val(),
        Name = $('#name_input').val(),
        Address = $('#address_input').val(),
        City = $('#city_input').val(),
        Email = $('#email_input').val(),
        Telephone = $('#telephone_input').val(),
        Subject = $('#subject_input').val(),
        Message = $('#message_input').val()

    // HTML function
    }, function(html) {
        // Place HTML in string
        var response = html;

        // PHP was done and email sent
        if (response == "success") {
            $('#kontakt-form').html('<h2>Din besked er sendt!</h2>');
        }
        else {
            navigator.notification.alert('Udfyld venligst alle felter! \n + response');
            return false;
        }
    });
}

function initTilbudFormHandler() {
    $('#tilbud-send').bind('click', function(evt) {
        evt.preventDefault();
        $.post('http://danmarksflyttemandapp.herokuapp.com/tilbudform-handler.php', {
            Name = $('#name_input').val(),
            Telephone = $('#telephone_input').val(),
            Email = $('#email_input').val(),

            FromAddress = $('#from-address_input').val(),
            FromZip = $('#from-zipcode_input').val(),
            FromCity = $('#from-city_input').val(),
            FromRegion = $('#from-region_input').val(),
            FromElevator = $('#from-elevator_input').val(),
            FromParking = $('#from-parking_input').val(),
            FromSize = $('#from-areal_input').val(),
            FromRooms = $('#from-rooms_input').val(),

            ToAddress = $('#to-address_input').val(),
            ToZip = $('#to-zipcode_input').val(),
            ToCity = $('#to-city_input').val(),
            ToRegion = $('#to-region_input').val(),
            ToElevator = $('#to-elevator_input').val(),
            ToParking = $('#to-parking_input').val(),
            ToSize = $('#to-areal_input').val(),
            ToRooms = $('#to-rooms_input').val(),

            MoveDate = $('#moving-date_input').val(),
            Flexible = $('#flexible-date_input').val(),
            AmountMen = $('#amount-men_input').val(),
            Packing = $('#pack-up_input').val(),
            Description = $('#description_input').val()

        }, function(html) {
            var response = html;

            if (response == "success") {
                $('#indhenttilbud').html('<h2>Din besked er sendt!</h2>');
            }
            else {
                navigator.notification.alert('Udfyld venligst alle felter! \n + response');
                return false;
            }
        }
    });
}

function initFormHandler() {
    initContactFormHandler();
    initTilbudFormHandler();
}

