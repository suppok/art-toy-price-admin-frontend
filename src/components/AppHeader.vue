<template>
  <nav class="navbar">
    <div class="container">
      <div class="navbar-brand">
        <a href="#">Navbar</a>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'AppHeader',
  components: {},
  data() {},
  methods: {}
};
</script>

<style scoped>
/* Add custom styles here */
.navbar {
  background-color: #f8f9fa;
}

.navbar-brand {
  display: flex;
  align-items: center;
}

.navbar-toggler {
  border: none;
  background-color: transparent;
  cursor: pointer;
}

.navbar-toggler span {
  display: block;
  width: 25px;
  height: 3px;
  background-color: #333;
  margin: 5px auto;
}

.navbar-collapse {
  display: none;
}

.navbar-collapse.show {
  display: block;
}

.navbar-nav {
  padding-left: 0;
}

.navbar-nav .nav-item {
  display: inline-block;
  margin-left: 10px;
}

.navbar-nav .nav-item:first-child {
  margin-left: 0;
}

.nav-link {
  color: #333;
  text-decoration: none;
}

.nav-link:hover {
  text-decoration: underline;
}
</style>
