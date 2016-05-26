var validatorFunc=function(arr){
	var validator=new Validator();
	for(var i=0;i<arr.length;i++){
		validator.add(arr[i].name,arr[i].arg);
	}
	var errMsg=validator.start()
	return errMsg
}
var User=new Vue({
	el:'.user',
	data:{
		username:'',
		password:'',
		repassword:''
	},
	methods:{
		submit:function(type){
			var dt={};
			var _this=this;
			dt.username=this.username;
			dt.password=this.password;
			if(type=='reg'){
				var err=validatorFunc([
					{name:_this.username,arg:[{strategy:'isEmpty',errMsg:'用户名不得为空'}]},
					{name:_this.password,arg:[{strategy:'isEmpty',errMsg:'密码不得为空'}]},
					{name:_this.repassword,arg:[{strategy:'isEqually:'+_this.password,errMsg:'两次密码不同'}]}
				])
			}else{
				var err=validatorFunc([
					{name:_this.username,arg:[{strategy:'isEmpty',errMsg:'用户名不得为空'}]},
					{name:_this.password,arg:[{strategy:'isEmpty',errMsg:'密码不得为空'}]}
				])
			}
			if(err.length){
				alert(err.join('<br>'))
			}else{
				$.ajax({
					url:'/user/'+type,
					type:'post',
					dataType:'json',
					data:dt,
					success:function(d){
						if(d.ret==1){
							if(type=='reg'){
								alert('注册成功');
							}else{
								alert('登录成功');
							}
							location.href='/';
						}
					}
				})
			}
		},
		to:function(type){
			location.href="/"+type;
		}
	}
})