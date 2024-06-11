<template>
  <div class="blog-post row mb-5">
    <h2 class="col-12 mb-3">
      <NuxtLink :to="`/articles/${article.sys.id}`" class="text-dark">{{ article.fields.title }}</NuxtLink>
    </h2>
    <div class="col-12 col-md-5">
      <img :src="imageUrl" :alt="article.fields.title" v-if="imageUrl" />
    </div>
    <div class="col-12 col-md-7">
      <div class="mb-5">{{ extractTextFromRichText(article.fields.description, 150) }}</div>
      <NuxtLink :to="`/articles/${article.sys.id}`" class="btn btn-dark">Read more</NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';
import { getImageUrl, extractTextFromRichText } from '~/utils';

const props = defineProps({
  article: {
    type: Object,
    required: true
  },
  assets: {
    type: Array,
    required: true
  }
});

const imageUrl = computed(() => getImageUrl(props.article, props.assets));
</script>

<style>
.blog-post {
  img {
    max-width: 100%;
  }
}
</style>