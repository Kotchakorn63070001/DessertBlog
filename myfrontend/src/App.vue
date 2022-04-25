<template>
  <div id="app">
    <nav class="navbar is-danger" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="#">
          <h2 class="title is-4 has-text-white">DessertBlog</h2>
        <!-- <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28"> -->
      </a>
      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
  
    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-end">
        <a class="navbar-item" href="/create">
          <span class="icon-text">
            <span class="icon is-medium">
                <i class="fa-solid fa-pen-to-square"></i>
            </span>
            <span>Create Post</span>
          </span>
        </a>
        <a class="navbar-item" href="/">
          <span class="icon-text">
            <span class="icon is-medium">
              <i class="fas fa-home"></i>
            </span>
            <span>Home</span>
          </span>
        </a>
        <a class="navbar-item" href="#">
          <span class="icon-text">
            <span class="icon is-medium">
              <i class="fa-solid fa-circle-user"></i>
            </span>
            <span>Profile</span>
          </span>
        </a>
      </div>
    </div>
</nav>
    <router-view :key="$route.fullPath" />
  </div>
</template>




