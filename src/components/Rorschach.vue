<script setup>
import { onMounted } from "vue";
import Rorschach from "./rorschach";

onMounted(() => {
  let ctx = document.getElementById("rorschach").getContext("2d");
  const r = new Rorschach(ctx);
  r.start();
});
</script>

<template>
  <canvas id="rorschach"></canvas>
</template>

<style scoped>
canvas {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
