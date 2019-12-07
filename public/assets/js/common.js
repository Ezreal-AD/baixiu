
    $('#logout').on('click',function(){
      var  isConfirm = confirm('确定退出？嗯？')   //confirm是确认框
      if(isConfirm){
        $.ajax({
            type: 'post',
            url: '/logout',
            success: function () {
                location.href = '/admin/login.html'
            },
            error: function () {
                alert('退出失败')
            }
        })
    }

    })
