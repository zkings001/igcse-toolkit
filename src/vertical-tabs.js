var sidebar = true;

function toggleSide() {
    if (sidebar) {
        $('.navigation').css('display', 'none');
        $('.view').removeClass('m7');
        $('.view').addClass('m12');
        $('#toggle-sidebar').html('<i class="icon ion-md-arrow-dropright"></i>');
        sidebar = false;
    } else {
        $('.navigation').css('display', 'block');
        $('.view').removeClass('m12');
        $('.view').addClass('m7');
        $('#toggle-sidebar').html('<i class="icon ion-md-arrow-dropleft"></i>');
        sidebar = true;
    }
}

$('#toggle-sidebar').click(function (){
    toggleSide()
})