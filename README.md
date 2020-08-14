# 介绍

### 基于 vue-codemirror vue-design(原 iview) babel-plugin-import(按需加载)简单搭建的vue代码可视化编辑

# 实现
```
通过对 codemirror 封装的 vue-codemirror 引入 codemirror 获取其在线编辑的代码 进行分割匹配分别处理 html css script （vue loader 是分别匹配完就直接扔给相应的 loader 与此不同）

 获取代码后通过内联样式将 css 插入页面中的 header 通过将 js 部分处理成 vue.extend(options)中的 option 让 vue 中的构造函数继承页面编辑中的处理

 在这个 option 中加入截取的 html 部分形成的 template(templates 模板需要完整的运行时代码进行编译生成 render 注意要在 vue.config.js 里面进行相应配置)

 在这个 option 中加入可以默认使用的其他组件内容

 创建新的 vue 对象 空挂载 mount 生成 dom 后在展示区域对应 dom节点下加入新的节点
```
# 运行方式

## 包的安装

```
npm install
```

### 开发时编译热更新

```
npm run serve
```

### 产出编译

```
npm run build
```

### 格式校验

```
npm run lint
```
# 效果
![Image text](https://github.com/wangxue2016/imgFloder/blob/master/codeMirror.PNG)


