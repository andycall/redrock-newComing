redrock-newComing
=======================
2014届新生专题网 手机版主页


## 说明 

迎新网， 新生点击登录 和 轮播 新生攻略为HTML，  以下的所有板块都是JS生成的。

架构为web app

# Ajax 

### 版块发送格式 

#### 每个板块的ID名称

    newStudent // 新生攻略
    cquptStudent //邮子风采
    studentOrgan // 学生组织 
    loudHi  // 大声Hi
    aboutUs //  关于我们

## 新生攻略
    第一次访问的呈现需直接填写在HTML中，
    而按钮的点击需要Ajax支持.
    
Ajax 格式
 
***请求字符***
 
 	id : newStudent
    type : 0

 ***返回格式***
 
     {
        "status":"200",     // HTTP响应值 200为OK
        "data":{  // 数据
           "page" : "newStudent",
           "logo":"http:\/\/andycalldemacbook-pro.local:3560\/img\/demeanour.png", //页面的logo地址
           "buttons":[ // 按钮内的数据
               {"classify":"\u4e89\u5148\u521b\u4f18","now":"true"}, // now指代当前样式的一个, classify为button的内容
               {"classify":"\u91cd\u90ae\u7f8e\u98df"},
               {"classify":"\u91cd\u90ae\u7f8e\u98df"}
           ],
           "section":[ // 内容块
              {
                "notification":"报道须知", // 标题
                "formore": "http://example.com/formore",  //点击更多的链接地址
                "statement" : "独自一人来学校报道，好孤单，好寂寞。。。哥哥快来帮帮我"
              },
              {
               "notification":"报道须知", // 标题
               "formore": "http://example.com/formore",  //点击更多的链接地址
               "statement" : "独自一人来学校报道，好孤单，好寂寞。。。哥哥快来帮帮我"
              } 
           ]
        }
     }

## 邮子风采


***请求字符***
 
 	id : cquptStudent
 	type : 0
 
 ***返回格式***
 
     {
        "page" : "cquptStudent",
        "status":"200",     // HTTP响应值 200为OK
        "data":{  // 数据
           "logo":"http:\/\/andycalldemacbook-pro.local:3560\/img\/demeanour.png", //页面的logo地址
           "buttons":[ // 按钮内的数据
               {"classify":"\u4e89\u5148\u521b\u4f18","now":"true"}, // now指代当前样式的一个, classify为button的内容
               {"classify":"\u91cd\u90ae\u7f8e\u98df"},
               {"classify":"\u91cd\u90ae\u7f8e\u98df"}
           ],
           "section":[ // 内容块
              {
                "src" : "http://localhost:3560/cqupt.jpg", // 图片地址
                "institution" : "我是逗比"
              },
              {
                  "src" : "http://localhost:3560/cqupt.jpg", // 图片地址
                  "institution" : "我是逗比"
              },
           ]
        }
     }
 
 
## 学生组织
 
`注意`  `section下面的那个triangle字段交替重复。。比如第一个是left，那么第二个就是right，第三个是left`
 
***请求字符***

	id : studentOrgan
	type: 0
 
 ***返回格式***
     
     {
        "page" : "studentOrgan",
        "status":"200",     // HTTP响应值 200为OK
        "data":{  // 数据
           "logo":"http:\/\/andycalldemacbook-pro.local:3560\/img\/demeanour.png", //页面的logo地址
           "buttons":[ // 按钮内的数据
               {"classify":"\u4e89\u5148\u521b\u4f18","now":"true"}, // now指代当前样式的一个, classify为button的内容
               {"classify":"\u91cd\u90ae\u7f8e\u98df"},
               {"classify":"\u91cd\u90ae\u7f8e\u98df"}
           ],
           "section":[ // 内容块
             { 
                  "organization" : "红岩网校工作站"
             }
           ],
         }
     }
 
 
 
## 大声Hi

  
***请求字符***
	
	id : studentOrgan
	type : 0
 
***返回格式***
  
      {
         "page" : "studentOrgan",
         "status":"200",     // HTTP响应值 200为OK
         "data":{  // 数据
            "logo":"http:\/\/andycalldemacbook-pro.local:3560\/img\/demeanour.png", //页面的logo地址
            "buttons":[ // 按钮内的数据
                {"classify":"\u4e89\u5148\u521b\u4f18","now":"true"}, // now指代当前样式的一个, classify为button的内容
                {"classify":"\u91cd\u90ae\u7f8e\u98df"},
                {"classify":"\u91cd\u90ae\u7f8e\u98df"}
            ],
            "section":[ // 内容块
              { 
                   "chat": "http://andycalldemacbook-pro.local:3560/img/chat.png" // 时间后面的聊天图片 chat.png
                   "content": "adsadsadasd" // 帖子标题
                   "date": "2013-2-22" // 帖子时间
                   "loud": "http://andycalldemacbook-pro.local:3560/img/loud.png" // 那个扩音器的图片地址
                   "triangle": "left" // 那个靠左的三角形
              },
              {
                   "chat": "http://andycalldemacbook-pro.local:3560/img/chat.png" // 时间后面的聊天图片 chat.png
                   "content": "adsadsadasd" // 帖子标题
                   "date": "2013-2-22" // 帖子时间
                   "loud": "http://andycalldemacbook-pro.local:3560/img/loud.png" // 那个扩音器的图片地址
                   "triangle": "left" // 那个靠左的三角形
              }
            ],
            "moveLeft" : "http://localhost:3560/pre_1.png", // 向左刷新的图片 pre_1.png
            "moveRight" : "http://localhost:3560/next_1.png" // 向右刷新的图片 next_1.png
         }
      }
      
      
## 关于我们

***请求字符***
   
	id : aboutUs
	type : 0
 
***返回格式***
     
         {
            "page" : "studentOrgan",
            "status":"200",     // HTTP响应值 200为OK
            "data":{  // 数据
               "logo":"http:\/\/andycalldemacbook-pro.local:3560\/img\/demeanour.png", //页面的logo地址
               "buttons":[ // 按钮内的数据
                   {"classify":"\u4e89\u5148\u521b\u4f18","now":"true"}, // now指代当前样式的一个, classify为button的内容
                   {"classify":"\u91cd\u90ae\u7f8e\u98df"},
                   {"classify":"\u91cd\u90ae\u7f8e\u98df"}
               ],
               "section":[ // 内容块
                 { 
                    PicSrc: "http://andycalldemacbook-pro.local:3560/img/cqupt.jpg" // 图片的路径 
                    PicStatement: "重庆有点" // 图片的叙述
                 }
               ],
               "aboutContent" : "重邮是个坑。。" // 下面那个文章块
 
            }
         }
 
 
 
# 按钮切换
 
## 发送数据格式
  
  每个分块的ID + & + 从左往右的顺序数字
  
  例如 ：点击新生攻略左边第一个按钮
  newStudent&1
  
  
  测试点击需要在chrome控制台中打开 [Emulate touch screen](http://www.sitepoint.com/use-mobile-emulation-mode-chrome/)
  
  
  
  
   
        
        
 
 
 