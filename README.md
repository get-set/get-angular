本源码来自来自慕课网的课程[Angular 4.0从入门到实战 打造股票管理网站](https://coding.imooc.com/learn/list/94.html).

前端代码位于`client/`，运行如下命令进行开发：

    cd client
    // 默认是启动 dev env
    npm run start
    // 如果启动 prod env
    npm serve ng serve --proxy-config proxy.conf.json --env=prod
    // 编译与合并
    ng build //编译产出位于`client/dist`下，可用apache或nginx运行，也可全部复制到`server/client`下，然后启动后端服务

后端代码位于`server/`下，使用nodejs启动即可：

    cd server
    node build/stock_server.js
