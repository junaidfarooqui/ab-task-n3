<template>
  <section>
    <h1>Articles</h1>
    <div v-if="error" class="text-center">
      <img src="/images/error.jpeg" alt="error" />
      <p class="mt-5">Failed to load articles. Please try again later.</p>
    </div>
    <div class="row" v-else>
      <BlogPost
          v-for="article in articles"
          :key="article.sys.id"
          :article="article"
          :assets="assets"
          class="col-12 col-md-6"
      />
    </div>
    <div v-if="isLoading" class="text-center article-placeholder">
      <div class="spinner-border" role="status" />
    </div>
    <div class="my-5 text-center" v-if="hasMore && !isDev && !error">
      <button class="btn btn-primary btn-dark" @click="loadMore">Load More Articles</button>
    </div>
  </section>
</template>

<script setup>
import {ref} from 'vue';
import {useAsyncData, useNuxtApp} from '#app';
import BlogPost from '~/components/BlogPost.vue';

const { $contentful, $config } = useNuxtApp();

const isDev = $config.public.isDev;

const skip = ref(0);
const limit = 4;
const articles = ref([]);
const assets = ref([]);
const hasMore = ref(true);
const error = ref(null);
const isLoading = ref(false);

const fetchArticles = async (skipValue) => {
  try {
    return await $contentful.getEntries({
      content_type: 'newArticles',
      include: 1,
      skip: skipValue,
      limit,
    });
  } catch (e) {
    throw new Error('Failed to fetch articles');
  }
};

const { data, error: asyncError } = await useAsyncData('articles', () => fetchArticles(skip.value));

if (asyncError.value) {
  error.value = asyncError.value;
} else {
  articles.value = data.value.items;
  assets.value = data.value.includes.Asset;
  if (data.value.total === articles.value.length) {
    hasMore.value = false;
  }
  skip.value += limit;
}

const loadMore = async () => {
  isLoading.value = true;
  try {
    const response = await fetchArticles(skip.value);
    if (response.items.length > 0) {
      articles.value.push(...response.items);
      assets.value.push(...response.includes.Asset);
      if (response.total === articles.value.length) {
        hasMore.value = false;
      }
      skip.value += limit;
    }
  } catch (e) {
    error.value = e;
  } finally {
    isLoading.value = false;
  }
};
</script>

<style>
footer {
  background: #333;
  color: #fff;
}
</style>
