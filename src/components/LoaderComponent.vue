<template>
    <div class="page-loader">
        <div class="spinner"><img src="@/assets/images/loader.webp" ></div>
    </div>
</template>

<script>
    export default {
        name: 'LoaderComponent'
    }
</script>

<style>
    @import url("https://fonts.googleapis.com/css?family=Raleway&display=swap");
    .content1 {
        max-width: 650px;
        margin: 0 auto;
        top: 35%;
        position: relative;
    }
    .content1 h1 {
        line-height: 1.5;
        color: white;
        font-weight: 300;
        text-align: center;
        font-size: 3rem;
        text-shadow: 0 2px 5px black;
    }
    /* PRELOADER CSS */
    .page-loader {
        width: 100%;
        height: 100vh;
        position: absolute;
        background-color: #000000;
        z-index: 99999;
        opacity: 0.9;
    }
    .spinner {
        position: relative;
        top: 35%;
        width: 80px;
        height: 80px;
        margin: 0 auto;
        border-radius: 100%;
    }
</style>