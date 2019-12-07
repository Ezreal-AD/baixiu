//添加新用户
$('#userForm').on('submit', function () {
    var formData = $(this).serialize() //获取用户输入的内容 并且转换成参数字符串
    $.ajax({
        type: 'post',
        url: '/users',
        data: formData,
        success: function () {
            location.reload() //刷新界面
        },
        error: function () {
            alert('添加失败')
        }
    })
    return false;//组织表单默认提交行为

})


//像服务器端发送请求 接受用户信息
$.ajax({
    type: 'get',
    url: '/users',
    success: function (response) {
        var html = template('userTpl', {
            data: response
        })
        $('#userBox').html(html)
    }
})


//编辑用户
$('#userBox').on('click', '.edit', function () {
    var id = $(this).attr('data-id');
    $.ajax({
        url: '/users/' + id,
        type: 'get',
        success: function (response) {
            console.log(response);           
            var html = template('modifyTpl', response);
            $('#modifyBox').html(html)
        }
    })
})


//编写提交按钮
$('#modifyBox').on('submit','#modifyForm',function(){
    var formData = $(this).serialize()    
    //获取要修改的用户的ID值
    var id = $(this).attr('data-id')
    $.ajax({
        type:'put',
        url:'/users/'+id,
        data:formData,
        success:function(response){
            location.reload()
        }
    })
    return false;
})


//修改头像
$('#modifyBox').on('change','#avatar',function(){
    var formData = new FormData(); //用户选择的文件
    formData.append('avatar', this.files[0]);
    $.ajax({
        url: '/upload',
        type: 'post',
        data: formData,
        processData: false,//告诉ajax不要解析请求参数
        contentType: false, //不要设置请求参数的类型
        success: function (response) {
            $('#preview').attr('src', response[0].avatar);
            $('#hiddenAvatar').val(response[0].avatar)
        }
    })
})

//给删除按钮添加事件
$('#userBox').on('click','.delete',function(){
    if(confirm('确定要删除用户吗')  ){   //confirm 确认框
        var id = $(this).attr('data-id');
        $.ajax({
            url:'/users/'+id,
            type:'delete',
            success:function(){
                location.reload()
            }
        })
    }

})

//
var selectALL = $('#selectAll')
selectALL.on('change',function(){
    var status =  $(this).prop('checked') 
    $('#userBox').find('input').prop('checked',status)
})
//复选框状态发生改变时
$('#userBox').on('click','.userStatus',function(){
//所有用户 和选择状态中的用户  数量对比

    var inputs = $('#userBox').find('input')
    console.log(inputs.length);
    console.log(inputs.filter(':checked').length);
    
if(inputs.length == inputs.filter(':checked').length) {//filter 过滤
    selectALL.prop('checked',true)
} else{
    selectALL.prop('checked',false)
}   
})