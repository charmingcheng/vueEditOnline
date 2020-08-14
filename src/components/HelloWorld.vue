<template>
  <div class="container">
    <div class="tool">
      <Button @click="exportCode()" type="primary" class="exportButton">导出</Button>
      <Button @click="runCode()" type="dashed" class="runButton">运行</Button>
    </div>
    <div class="hello">
      <codemirror ref="mycode" :value="code" :options="cmOptions" class="curCode" v-model="code"></codemirror>
    </div>
    <div id="viewWindow"></div>
  </div>
</template>

<script >
import { Button, Message } from "view-design";
import { codemirror } from "vue-codemirror";
import "codemirror/theme/cobalt.css";
import Vue from "vue";
require("codemirror/mode/vue/vue");
export default {
  name: "HelloWorld",
  data() {
    return {
      code: "",
      html: "",
      js: "",
      css: "",
      program: null,
      cmOptions: {
        extraKeys: { Ctrl: "autocomplete" },
        lineNumbers: true,
        value: "",
        mode: "vue",
        theme: "cobalt"
        // readOnly:false,
      }
    };
  },
  props: {
    msg: String
  },
  components: {
    codemirror,
    Button
  },
  methods: {
    //从获取的源码字符串中截取出相应的  templete  script   css代码
    getSource(source, type) {
      const regex = new RegExp(`<${type}[^>]*>`);
      let openingTag = source.match(regex);
      if (!openingTag) return "";
      else openingTag = openingTag[0];
      return source.slice(
        source.indexOf(openingTag) + openingTag.length,
        source.lastIndexOf(`</${type}>`)
      );
    },
    //分割处理截取出的某部分的代码
    splitCode() {
      const script = this.getSource(this.code, "script").replace(
        /export default/,
        "return "
      );
      const style = this.getSource(this.code, "style");
      const template =
        '<template id="code-running">' +
        this.getSource(this.code, "template") +
        "</template>";
      if (this.getSource(this.code, "template") != "") {
        this.html = template;
      }
      this.js = script;
      this.css = style;
    },
    //vue组件构建挂载
    buildDom() {
      //分割代码
      this.splitCode();
      if (this.html === "") {
        Message["info"]({
          background: true,
          content: `请输入有效的Vue代码`
        });
        return;
      }
      //获取代码中的js的vue export的json对象
      let common;
      if (this.js) {
        common = new Function(this.js)();
      } else {
        common = {};
      }

      //对对象中的templete进行处理
      common.template = this.html;
      //挂载编辑器中可以默认使用的组件
      common.components = {
        codemirror,
        Button
      };

      //扩展vue的构造函数继承在线编辑代码中的属性
      const Template = Vue.extend(common);
      //创建新的vue对象
      this.program = new Template();
      //清空展示效果区域原挂载的对象
      var el = document.querySelector("#viewWindow");
      var childs = el.childNodes;
      for (var i = childs.length - 1; i >= 0; i--) {
        el.removeChild(childs[i]);
      }
      //将新创建vue对象空挂载mount产生的dom加入展示节点下面
      document
        .querySelector("#viewWindow")
        .appendChild(this.program.$mount().$el);
      if (this.css !== "") {
        const styles = document.createElement("style");
        styles.type = "text/css";
        styles.innerHTML = this.css;
        document.getElementsByTagName("head")[0].appendChild(styles);
      }
    },
    //对栈存的代码的历史分割进行处理
    clearOldCode() {
      this.html = "";
      this.js = "";
      this.css = "";
    },
    //运行代码方法
    runCode() {
      this.clearOldCode();
      this.buildDom();
    },
    //导出代码
    exportCode() {
      //生成文件对象及下载连接
      let save_link = this.exportRaw("text.vue", this.code);
      //使用js控制点击下载链接下载文件
      this.fakeClick(save_link);
    },
    //生成文件对象
    exportRaw(name, data) {
      var urlObject = window.URL || window.webkitURL || window;
      var export_blob = new Blob([data]);
      var save_link = document.createElementNS(
        "http://www.w3.org/1999/xhtml",
        "a"
      );
      save_link.href = urlObject.createObjectURL(export_blob);
      save_link.download = name;
      return save_link;
    },
    //假点击
    fakeClick(obj) {
      var ev = document.createEvent("MouseEvents");
      ev.initMouseEvent(
        "click",
        true,
        false,
        window,
        0,
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        0,
        null
      );
      obj.dispatchEvent(ev);
    }
  }
};
</script>
<style  lang="scss" >
.container {
  width: 100%;
  height: 100%;
  .tool {
    width: 100%;
    height: 5%;
    .exportButton {
      margin-top: 10px;
      margin-left: 10px;
    }
    .runButton {
      margin-top: 10px;
      margin-left: 10px;
    }
  }
  .hello {
    width: 50%;
    height: 95%;
    float: left;
  }
  #viewWindow {
    width: 50%;
    height: 95%;
    float: left;
    background: #eeeeee;
  }
}
//code-mirror相关内容
.vue-codemirror {
  width: 100%;
  height: 100%;
}

.cm-s-cobalt.CodeMirror {
  width: 100%;
  height: 100%;
}
</style>
