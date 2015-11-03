# 直播云API调用示例

>>>>> 此demo网页只兼容chrome和firefox浏览器

本仓库中的index.html演示了如何通过Javascript来调用直播云提供的api, 演示页面调用的api有如下 

  - 访问api时对请求进行签名的方法
  - 获取任务列表
  - 获取在线用户列表
  - 播放直播视频
  - 发送文本消息
  - 发送语音消息(打开控制界面可见)
  - 创建拉流任务
  - 终止一个任务

使用方法，在演示界面中输入服务码与服务码对应的共享密钥, 如果不了解服务码和共享密钥的概念请看[这里](http://www.zhiboyun.com/zh/document/newbie/concept)
如果不知道共享密钥，可以登录到直播云控制台查看。
认证成功后列出此服务码下面当前所有正在进行的(不论是通过手机推上的流还是通过API接口创建的拉流)任务，以及每个直播对应的输出，可选对相应的输出流进行播放。
如果要对直播进行控制，则在演示url后加上`?console=true`
此demo的在线演示， [点击这里](http://woantech.github.io/zby-wmp-player-demo/) 如需显示控制界面[点击这里](http://woantech.github.io/zby-wmp-player-demo/index.html?console=true)

[访问直播云网站](http://www.zhiboyun.com)
