//通用js

//校验数据
var checkForm={
	isEmpty:function (val,errMsg){
		if(!val){
			return errMsg;
		}
	},
	minLength:function(val,length,errMsg){
		if(val.length<length){
			return errMsg;
		}
	},
	isMobile:function(val,errMsg){
		if(!/(^1[3|5|8][0-9]{9}$)/.test(val)){
			return errMsg;
		}
	},
	maxLength:function(val,length,errMsg){
		if(val.length>length){
			return errMsg;
		}
	},
	isEqually:function(val,oldVal,errMsg){
		if(val!=oldVal){
			return errMsg;
		}
	}
}
var Validator=function(){
	this.cache=[];
}
Validator.prototype.add=function(dom,rules){
	var self=this;
	for(var i=0;i<rules.length;i++){
		var rule=rules[i];
		(function(rule){
			var ary=rule.strategy.split(':');
			var errMsg=rule.errMsg;
			self.cache.push(function(){
				var strategy=ary.shift();
				ary.unshift(dom);
				ary.push(errMsg);
				return checkForm[strategy].apply(dom,ary);
			})
		})(rule)
	}
}
Validator.prototype.start=function(){
	var validatorFunc;
	var msgs=[];
	this.cache.forEach(function(con){
		validatorFunc=con;
		var msg=validatorFunc()
		if(msg){
			msgs.push(msg)
		} 
	})
	return msgs;
}