var sidebar = true;

function openVTab(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("v-tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("v-tab-links");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}

function toggleSide(){
    if (sidebar){
        $('#vertical-tabs').css('display', 'none');
        $('#content').css('display', 'none');
        $('#viewer').removeClass('s8');
        $('#viewer').addClass('s12');
        $('#toggle-sidebar').html('<i class="icon ion-md-contract"></i>');
        sidebar = false;
    } else{
        $('#vertical-tabs').css('display', 'block');
        $('#content').css('display', 'block');
        $('#viewer').removeClass('s12');
        $('#viewer').addClass('s8');
        $('#toggle-sidebar').html('<i class="icon ion-md-expand"></i>');
        sidebar = true;
    }
}


document.getElementById("v-defaultOpen").click();