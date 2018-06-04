<template>
  <div class="home">
    <ql-head></ql-head>
  </div>
</template>

<script>
import qlHead from '../common/head'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {
    qlHead
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
