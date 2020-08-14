
<template>
  <!-- 测试模板样例可以直接赋值到页面中的在线编辑器中看效果 -->
  <div class="aaa">Hello {{who}}</div>
</template>
<script>
export default {
  data: function() {
    return {
      who: "world"
    };
  }
};
</script>
<style scoped>
.aaa {
  padding: 0.5em;
  font-size: 2em;
  background-color: #fcf;
}
</style>
