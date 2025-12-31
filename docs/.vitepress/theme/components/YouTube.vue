<template>
  <div class="youtube-container">
    <iframe
      :src="'https://www.youtube.com/embed/' + videoId"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  videoId: string
}>()
</script>
