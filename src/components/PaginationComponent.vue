<template>
    <div class="entries-sec">
        <div class="thm-heading">
            <h2>Show</h2>
        </div>
        <div class="entries-select">
            <select class="form-select" aria-label="Default select example" @change="listRecords()" v-model="show_per_page">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
            </select>
        </div>
        <div class="thm-heading">
            <h2>entries</h2>
        </div>
    </div>
    <div class="entries-pages">
        <div class="thm-heading">
            <h2>Showing {{ data.from }} to {{ data.to }} of {{ data.total }} entries</h2>
        </div>
        <div class="entries-pagination">
            <nav aria-label="Page navigation example">
                <ul class="pagination">
                    <li v-for="(link, l) in data.links" :key="l" class="page-item"><a class="page-link"
                            :class="link.active ? 'active' : ''" v-html="link.label" @click="changePage(link)"></a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>
<script>
export default {
    name: 'PaginationComponent',
    props: ['data'],
    data() {
        return {
            show_per_page: this.data.per_page
        }
    },
    methods: {
        listRecords() {
            this.$store.commit('refresh_List', {
                data:{
                    per_page: this.show_per_page,
                    current_page: 1
                },
                refresh: true
            })
        },
        changePage(link) {
            if(link.url) {
                const urlParams = new URLSearchParams(link.url.split('?')[1]);
                const page = urlParams.get('page')
                if(isFinite(page)) {
                    this.$store.commit('refresh_List', {
                        data:{
                            current_page: page
                        },
                        refresh: true
                    })
                }
            }
        }
    }
}
</script>