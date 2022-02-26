<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <RouterView />
  <footer>
    <nav>
      <RouterLink to="/">main</RouterLink>
      <RouterLink to="/about">info</RouterLink>
    </nav>
  </footer>
</template>

<style>
@import "@/assets/base.css";

#app {
  width: 100vw;
  height: 100vh;
  position: absolute;
  margin: 0 auto;
  padding: 0;
  font-weight: normal;
}

footer {
  line-height: 1.5;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 8px 1em;
  z-index: 10;
  background: var(--color-background);
}

a {
  text-decoration: none;
  color: var(--color-text);
}

@media (hover: hover) {
  a:hover {
    color: var(--vt-c-white);
    text-decoration: underline;
  }
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
}

nav a.router-link-exact-active {
  color: var(--vt-c-white);
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 700px) {
  footer {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  nav {
    text-align: right;
  }
}
</style>
