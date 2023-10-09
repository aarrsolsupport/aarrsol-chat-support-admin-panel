<template>
    <ListComponent></ListComponent>
    <FormComponent></FormComponent>
</template>
<script>
    import ListComponent from './ListComponent.vue'
    import FormComponent from './FormComponent.vue'
    export default {
        name: 'MainComponent',
        components: {
            ListComponent,
            FormComponent,
        },
        data() {
            return {
            }
        },
    }
</script>