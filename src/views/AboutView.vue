<template>
  <div class="about">
    <p>Rorschach, 1992<br />Jamie Zawinski</p>
    <p>adapted for web 2022 by Elias Martinez Cohen</p>
    <p>All rights reserved.<br />No soliciting.</p>
  </div>
</template>

<style>
.about {
  display: block;
  position: absolute;
  bottom: 4em;
}
.about > p {
  margin: 1em auto;
  font-size: 13px;
}
@media (min-width: 600px) {
  .about {
    left: 5vw;
  }
  .about > p {
    margin: 1em auto;
    font-size: 13px;
  }
}
</style>
