
$(document).ready(function(){
    $("input[type=file]").wrap('<span class="input_file_context  cbi-button"></span>');
    $("input[type=file]").wrap('<span class="input_file_real"></span>');
    $(".input_file_context").append('<span class="input_file_fake cbi-button cbi-input-file">Selected ...</span>');
    
    $("input[type=file]").change(function(){
        $(this).parent().parent().children(".input_file_fake").html($(this).val())
    })
 
    //some button define with:100px ， after we changed the theme , the text cannot display fully
    //let the text display full
    $(".cbi-button").attr("style","");  
    $(".firefly-iface-table-adjust").attr("style","width:550px");
    $(".firefly-wifi-table-adjust").attr("style","width:440px;text-align:right;");
});

