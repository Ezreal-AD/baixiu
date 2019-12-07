$('#addCategory').on('submit',function(){
    var formData = $(this).serialize();
    $.ajax({
        url:'/categories',
        type:'POST',
        data:formData,
        success: function () {

        }
    })
    
})