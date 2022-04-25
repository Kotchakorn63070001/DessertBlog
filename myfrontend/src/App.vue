<template>
  <div id="app">
    <nav class="navbar is-danger" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="#">
            <span><h2 class="title is-4 has-text-white">DessertBlog</h2></span>
        </a>

        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-end">
      
      <a class="navbar-item">
        <span class="icon-text">
          <span class="icon">
            <i class="fa-solid fa-house-chimney-window"></i>
          </span>
          <span>Home</span>
        </span>
      </a>

      <a class="navbar-item">
        <span class="icon-text">
          <span class="icon">
            <i class="fa-solid fa-pen"></i>
          </span>
          <span>Create Post</span>
        </span>
      </a>

      <div class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link">
          <!-- <span class="icon">
            <i class="fa-solid fa-user"></i>
          </span> -->
          <figure class="image is-24x24 my-auto">
            <img class="is-rounded" src="https://bulma.io/images/placeholders/128x128.png">
          </figure>
        </a>

        <div class="navbar-dropdown is-right">
          <a class="navbar-item">
            Profile
          </a>
          <a class="navbar-item">
            Log out
          </a>
          <a class="navbar-item">
            Contact
          </a>
          <hr class="navbar-divider">
          <a class="navbar-item">
            Report an issue
          </a>
        </div>
      </div>
    </div>

    
  </div>
</nav>
    <router-view :key="$route.fullPath" />
  </div>
</template>




