var validatorFunc=function(arr){
	var validator=new Validator();
	for(var i=0;i<arr.length;i++){
		validator.add(arr[i].name,arr[i].arg);
	}
	var errMsg=validator.start()
	return errMsg
}
var reg=new Vue({
	el:'.reg',
	data:{
		username:'',
		password:'',
		repassword:''
	},
	methods:{
		reg:function(){
			var dt={};
			dt.username=this.username;
			dt.password=this.password;
			var _this=this;
			var err=validatorFunc([
				{name:_this.username,arg:[{strategy:'isEmpty',errMsg:'用户名不得为空'}]},
				{name:_this.password,arg:[{strategy:'isEmpty',errMsg:'密码不得为空'}]},
				{name:_this.repassword,arg:[{strategy:'isEqually:'+_this.password,errMsg:'两次密码不同'}]}
			])
			if(err.length){
				alert(err.join('<br>'))
			}else{
				$.ajax({
					url:'/user/reg',
					type:'post',
					dataType:'json',
					data:dt,
					success:function(d){
						console.log(d);
					}
				})
			}
				
		},
		toLogin:function(){
			location.href="/login";
		}
	}
})