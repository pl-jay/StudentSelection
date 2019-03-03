<template>
  <div id="app">
    <div class="row" >
      <div class="col-3"></div>
      <div class="col-6">
        
      </div>
    </div>
    <div>
  <b-navbar toggleable="lg" type="light" variant="dark">
    <b-navbar-brand><router-link  to="/">Home</router-link></b-navbar-brand>
    <b-navbar-toggle target="nav_collapse" />
    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav>
        <b-nav-item><router-link  to="/selectionView">SelectionView</router-link></b-nav-item>
        <b-nav-item variant="info"><router-link  to="/reportsView">Selected List</router-link></b-nav-item>
        <b-nav-item variant="info"><router-link  to="/regView">Registraion</router-link></b-nav-item>        
        <b-nav-item><router-link  to="/about" >About</router-link></b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <h5>Students Selection</h5>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
      <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background:#149c82;
  height: 5px;
  /*margin-top: 5px;*/
}
h5 {
    font-size: 3.75em;
    color: #d2bcee;
    text-transform: uppercase;
    margin-top: 6em;
    text-align: center;
    position: relative;
    font-weight: bold;
}
</style>
