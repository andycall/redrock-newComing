/**
 * Created by andycall on 14-8-12.
 */
$(function() {
    $("img.lazy").lazyload();

    // 图片切换
    /****************************************/
    var unslider = $('.picSwap').unslider({
        speed: 500,
        //  The speed to animate each slide (in milliseconds)
        delay: 3000,
        //  The delay between slide animations (in milliseconds)
        complete: function() {},
        //  A function that gets called after every slide animation
        keys: true,
        //  Enable keyboard (left, right) arrow shortcuts               //  Display dot navigation
        fluid: true //  Support responsive design. May break non-responsive designs
    });

    $('.unslider-arrow').click(function() {
        var fn = this.className.split(' ')[1];
        //  Either do unslider.data('unslider').next() or .prev() depending on the className
        unslider.data('unslider')[fn]();
    });

    $(".find_friends .triangle").on('click',
        function(e) {
            e.preventDefault();
            if ($(".find_detail").css('display') == 'none') {
                $(".find_detail").show();
            } else {
                $(".find_detail").hide();
            }
        });


    $(".close").on('touchstart MSMouseDown', function(){
        $('.login').hide();
    });

    $(".newLogin").on('touchstart MSMouseDown', function(){
        $(".login").show();
    })

    /**************  表单验证   ****************************/

    var formAuth = biaodan.Cons(document.getElementById("loginForm"),{
        ifError : function(target){
            target.nextSibling.style.display = "block";
        },
        formId : "loginForm"
    })

    formAuth.Run();



    /********   缓存对象   ****************/
    // 内容缓存
    var Cache = (function(){

        function Cache(){
            this.cache = [];
        }

        Cache.prototype.save = function(key, value){
            var data = {};
            data.key = key;
            data.value = value;
            this.cache.push(data);
        };

        Cache.prototype.read = function(key){
            var self = this;

            for(var i = 0,len = self.cache.length; i < len; i ++){
                if(self.cache[i].key === key){
                    return self.cache[i].value;
                }
            }

            return null;
        };


        Cache.prototype.remove = function(key){
            var self = this;

            for(var i  = 0,len = self.cache.length; i < len; i ++){
                if(self.cache[i].key == key){
                    return self.cache.splice(key, 1);
                }
            }

            return null;
        };

        Cache.setup = function(){
            return new Cache();
        };

        return Cache;
    })();


    /********   Ajax ***************/

    var configURL = {
//            find_friends: "http://172.22.161.173/redrock/index.php/Home/Index/cqupt", // 找朋友
//            newStudents: "http://localhost:3560/abc/test.php", // 新生攻略
//            cquptStudent: "http://172.22.161.173/redrock/index.php/Home/Index/mcqupt", // 邮子风采
            cquptStudent: "http://localhost:3560/abc/test.php", // 邮子风采
//            cquptStudent: "http://localhost:3560/abc/test.php", // 邮子风采
//            studentOrgan: "http://172.22.161.173/redrock/index.php/Home/Index/morg",
            studentOrgan: "http://localhost:3560/abc/test.php",
            loudHi: "http://localhost:3560/abc/test.php",
//            loudHi: "http://172.22.161.173/redrock/index.php/Home/Index/mart",
            // 大声Hi
            aboutUs: "http://localhost:3560/abc/test.php" // 关于我们
        },
        isLoading = false,
        requestQueue = AjaxQueue.setup(),
        page = "cquptStudent studentOrgan loudHi aboutUs redRock".split(" ").reverse(),
        cache = Cache.setup(),
        loading = $(".loading");

    // 新生攻略
    BindButton("newStudent");

    // 设置ajax全局参数
    $.ajaxSetup({
        type: "POST",
        // 方式
        dataType: 'text'
    });


    // 监听滚动条的动态变化
    function WatchScroll(callback) {
        var viewHeight = $(window).height();

        $(document).on('scroll',
            function() {

                var containerHeight = $(".container").height(),
                    bodyScroll = $(document.body).scrollTop();

                // 条件满足
                if (isLoading) return;

                if (bodyScroll + viewHeight + 100 >= containerHeight) {
                    loading.show();
                    callback();
                }
            });
    }

    function findNextLoad() {
        return page.pop();
    }


    // 滚动更新函数
    WatchScroll(function() {
        // 检查需要加载的项目
        var target = findNextLoad(),
            target,
            request;

        if (target === undefined) {
            loading.hide();
            return;
        }

        // 到底了。。
        if (target === 'redRock'){
            updateRedrock();
            return;
        }

        // 构建请求对象
        request = {
            url: configURL[target],
            data: {
                id: target,
                type : 0
            },
            complete: pageView
        };
        // 正在加载。。
        isLoading = true;

        // 将请求添加进请求队列
        requestQueue.pushRequest(request, 1); //优先请求
    });

    // 讲获取到的数据更新至页面中
    function pageView(data) {
        var page = data['page'].toString();

        isLoading = false;

        loading.hide();

        switch (page) {
            case "cquptStudent":
                appendcqupt(data);
                break;
            case "studentOrgan":
                appendStudentOrgan(data);
                break;
            case "loudHi":
                appendLoudHi(data);
                break;
            case "aboutUs":
                appendAboutUs(data);
                break;
        }

    }

    // 数据更新函数
    function pageUpdate(data){
        var page = data['page'].toString();

        isLoading = false;

        loading.hide();

        switch (page) {
            case "newStudent":
                updatenewStudent(data);
                break;
            case "cquptStudent":
                updatecqupt(data);
                break;
            case "studentOrgan":
                updateStudentOrgan(data);
                break;
            case "loudHi":
                updateLoudHi(data);
                break;
            case "aboutUs":
                updateAboutUs(data);
                break;
        }
    }

    // 更新新生攻略
    function updatenewStudent(data){
        var movies = [{
            logo: data.logo,
            buttons: data.buttons,
            section: data.section
        }];

        var div = $("#newStudentTemplate").render(movies);

        $("#newStudent").html(div);
    }

    // 更新游子风采块
    function appendcqupt(data) {
        // 将数据缓存

        cache.save("cquptStudent&0", data);


        var movies = [{
            logo: data.logo,
            buttons: data.buttons,
            section: data.section,
            nextSrc: data.nextSrc,
            preSrc: data.preSrc
        }];

        var div = $("<div class='cquptStudent list' id='cquptStudent'></div>").html($("#cquptStudentTemplate").render(movies));

        $(".container").append(div);

        BindButton("cquptStudent");
    }

    // 点击按钮后更新 邮子风采
    function updatecqupt(data){
        var movies = [{
            logo: data.logo,
            buttons: data.buttons,
            section: data.section,
            nextSrc: data.nextSrc,
            preSrc: data.preSrc
        }];

        var div = $("#cquptStudentTemplate").render(movies);

        $("#cquptStudent").html(div);

    }

    // 邮子风采左右按钮
    function trianglecqupt(){

    }

    // 添加学生组织块
    function appendStudentOrgan(data) {
        var movies = [
            {
                logo: data.logo,
                buttons: data.buttons,
                section : data.section
            }
        ];
        var div = $("<div class='studentOrganization list' id='studentOrgan'></div>").html($("#studentOrganTemplate").render(movies));

        $(".container").append(div);

        BindButton("studentOrgan");
    }

    // 更新学生组织块
    function updateStudentOrgan(data){
        var movies = [
            {
                logo: data.logo,
                buttons: data.buttons,
                section : data.section
            }
        ];
        var div = $("#studentOrganTemplate").render(movies);

        $("#studentOrgan").html(div);
    }

    // 添加大声HI
    function appendLoudHi(data) {

        cache.save("loudHi&0", data);

        var movies = [{
            logo: data.logo,
            buttons: data.buttons,
            section: data.section,
            moveRight: data.moveRight,
            moveLeft: data.moveLeft
        }];

        console.log(data);
        var div = $("<div class='loudHi list' id='loudHi'></div>").html($("#loudHiTemplate").render(movies));

        $(".container").append(div);

        // 添加按钮监听事件
        BindButton("loudHi");
    }

    // 更新大声Hi
    var updateLoudHi = (function(){

        return function(data){

           var movies = [{
               logo: data.logo,
               buttons: data.buttons,
               section: rePack(data.section),
               moveRight: data.moveRight,
               moveLeft: data.moveLeft
           }];

           var div = $("#loudHiTemplate").render(movies);

           $("#loudHi").html(div);
       }
    })();

    // 添加关于我们
    function appendAboutUs(data) {
        var movies = [
            {
                logo: data.logo,
                buttons: data.buttons,
                section : data.section,
                aboutContent : data.aboutContent
            }
        ];
        var div = $("<div class='aboutUs list' id='aboutUs'></div>").html($("#aboutUsTemplate").render(movies));

        $(".container").append(div);

        BindButton("aboutUs");
    }

    // 更新关于我们
    function updateAboutUs(data){
        var movies = [
            {
                logo: data.logo,
                buttons: data.buttons,
                section : data.section,
                aboutContent : data.aboutContent
            }
        ];

        var div = $("#aboutUsTemplate").render(movies);
        $("#aboutUs").html(div);
    }

    // 红岩网校
    function updateRedrock() {
        var movies = [{

        }];
        var div = $("<div  class='redRock list'></div>").html($("#Redrock").render(movies));

        $(".container").append(div);

        $(".loading").hide();

    }

    // 按钮事件绑定
    function BindButton(target) {
        target = target.toString();

        switch (target) {

            // 新生攻略
            case "newStudent" :
                $("#newStudent").on('touchstart MSPonterDown', ".buttons > div",
                    function(event){
                        ButtonAction.call(this, target, event);
                });

            //邮子风采
            case "cquptStudent":
                $("#cquptStudent").on('touchstart MSPointerDown', ".buttons > div",
                    function(event) {
                        ButtonAction.call(this, target, event);
                    });
                break;
            //学生组织
            case "studentOrgan":
                $("#studentOrgan").on('touchstart MSPointerDown', ".buttons > div",
                    function(event) {
                        ButtonAction.call(this, target, event);
                    });
                break;
            // 大声HI
            case "loudHi":
                $("#loudHi").on('touchstart MSPointerDown', ".buttons > div",
                    function(event) {

                        ButtonAction.call(this, target, event);
                    });
                break;
            // 关于我们
            case "aboutUs":
                $("#aboutUs").on('touchstart MSPointerDown', ".buttons > div",
                    function(event) {
                        ButtonAction.call(this, target, event);
                    });
                break;
        }
    }


    // 按钮点击事件触发
    function ButtonAction(id, event) {

        loading.show();
        var sendStr = id + "&" + $("#" + id + " .buttons div").index(this),
            request;

        if (isLoading) return;

        console.log(sendStr);

        request = {
            url: configURL[id],
            data: {
                type : sendStr
            },
            complete: pageUpdate
        };

        requestQueue.pushRequest(request, 0);

    }



    // 箭头事件绑定
    function BindTriangle(target) {
        // load为加载缓存， request为ajax请求
        var moveLeft = $("#" + target).find(".moveLeft"),
            moveRight = $("#" + target).find(".moveRight");

        // 向右刷新
        moveLeft.on('touchstart MSPointerDown', function(e) {
                e.preventDefault();
                switch (target) {
                    case "cquptStudent":
                        appendcqupt(null, "left");
                }
            });

        // 向左刷新
        moveRight.on('touchstart MSPointerDown', function(e) {
            e.preventDefault();

            switch (target){
                case "cquptStudent" :
                    appendcqupt(null, 'right');
            }
        });
    }

});