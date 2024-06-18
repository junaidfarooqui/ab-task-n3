<template>
  <div class="container my-5">
    <div v-if="isLoading" class="text-center article-placeholder">
      <div class="spinner-border" role="status"/>
    </div>

    <div v-if="error" class="alert alert-danger">
      <p>Failed to load article. Please try again later.</p>
    </div>
    <div v-else-if="article">
      <h1>{{ article.fields.title }}</h1>
      <p>{{ extractTextFromRichText(article.fields.description) }}</p>
      <img :src="imageUrl" :alt="article.fields.title" v-if="imageUrl" class="img-fluid"/>
    </div>
    <NuxtLink to="/" class="btn btn-secondary my-5">Back to Home</NuxtLink>
  </div>
</template>

<script setup>
import {ref, computed} from 'vue';
import {useRoute, useNuxtApp, useAsyncData} from '#app';
import {extractTextFromRichText, getImageUrl} from '~/utils';

const route = useRoute();
const {$contentful} = useNuxtApp();
const article = ref(null);
const imageUrl = ref('');
const error = ref(null);
const isLoading = ref(true);

const fetchArticle = async (id) => {
  try {
    const response = await $contentful.getEntry(id);
    const assetsResponse = await $contentful.getAssets({
      'sys.id[in]': response.fields.featuredImage.sys.id
    });
    const assets = assetsResponse.items;

    return {article: response, assets};
  } catch (e) {
    throw new Error('Failed to fetch article');
  }
};

const {
  data,
  error: asyncError
} = await useAsyncData(`article-${route.params.id}`, () => fetchArticle(route.params.id));

if (asyncError.value) {
  error.value = asyncError.value;
} else {
  article.value = data.value.article;
  imageUrl.value = getImageUrl(article.value, data.value.assets);
  isLoading.value = false;
}
</script>

<style>
.article-placeholder {
  min-height: 800px;
  position: relative;
}

.article-placeholder .spinner-border {
  position: absolute;
  left: 50%;
  top: 50%;
}
</style>
