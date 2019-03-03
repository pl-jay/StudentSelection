<template>
  <div class="hello">
    <b-container class="bv-example-row">
      <h3>{{msg}}</h3>
      <b-row>
        <b-col>
          <b-list-group>
            <b-list-group-item v-for="(item) in items" v-bind:key="item.index" class="d-flex justify-content-between align-items-center">
              {{ item }}
              <b-badge variant="primary" pill>{{ key }}</b-badge>
            </b-list-group-item>
        </b-list-group>
        </b-col>
        <b-col>2 of 2</b-col>
      </b-row>
    </b-container>   
  </div>
</template>

<script>
export default {
  data(){
    return{
      name: 'HelloWorld',
      items:[],
    }
  },
 
  props: {
    msg: String
  },

  mounted() {
    console.log(this.items)
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
