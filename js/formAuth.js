var biaodan = (function(){
      function cancelHandler(event){
          var event = event || window.event;
          if(event.preventDefault) event.preventDefault();
          if(event.cancelBubble) event.cancelBubble = false;
          return false;
      }

      function extend(obj,extension){
          for(var key in extension){
              if(extension.hasOwnProperty(key)&& obj[key] == null){
                   obj[key] = extension[key];
              }

          }
          return obj;
      }


      function Callme(target,config){
        this.target = target;
        this.config = extend(config ,congifDefault);
      }

    var congifDefault = {
        ifError : function(target, error){
            alert(error);
            target.style.border = "1px solid red";
        },
        formId : "form",
        username : "username",
        password : "password"
    };

    var auth = [],
        error = 0;

    Callme.prototype.authExtender = function(name, errorMsg, Reg){
        auth.push({
            name : name,
            errorMsg : errorMsg,
            Reg : Reg
        });
    };

    Callme.prototype.Auth = function(){
        var self = this,
            config = self.config;
            formId = config.formId;

        auth.forEach(function(value, index, arr){
            var target = document.querySelector("#" + formId + " input[name='" + value.name + "']");
            var reg = value.Reg,
                ifError = config.ifError;
            if(!reg.test(target.value)){
                ifError(target, value.errorMsg);
                error += 1;
            }
        });
    };

    Callme.prototype.Run = function(){
        var config = this.config,
            self = this,
            formId = config.formId;

        self.authExtender(config.username, "用户名错误！", /[a-z0-9\-_A-Z]{5,12}/);
        self.authExtender(config.password, "密码错误！", /\w+/);

        console.log(1);

        document.getElementById(formId).addEventListener('submit', function(e){
            e.preventDefault();
            self.Auth();

            if(error >0){

                return cancelHandler(e);
            }

            alert("the form will be submit!");

        },false);
    };

    Callme.Cons = function(target, config){
        return new Callme(target, config);
    };


    return Callme;

})();