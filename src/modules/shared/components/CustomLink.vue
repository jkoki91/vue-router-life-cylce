<template>
  <a 
    v-if="isExternalLink"
    target="_blank"
    class="normal-link"
    :href="link.to">{{link.name}}</a>

        <!-- :to="{ name: link.to, params: { id: link.id } }" -->
    <router-link
        v-else
        :to="route"
        v-slot="{ isActive }"
    >
        <!-- v-slot="{ href, isActive }" -->
            <!-- :href="href" -->
        <a 
            :class="isActive? 'is-active' : 'normal-link' "
        >
            {{ link.name }}
        </a>
        <!-- {{link.name}} -->
    </router-link>
</template>

<script>
export default {
    props: {
        link: {
            type: Object,
            requires: true
        }
    },
    computed: {
        isExternalLink(){
            return this.link.to.startsWith('http')
        },
        route(){
            return this.link.id === undefined
                ? { name: this.link.to } 
                : {name: this.link.to, params: { id: this.link.id } }
        }
    }

}
</script>

<style scoped>

.is-active{
    color:#42b983;
}
.normal-link{
    color: #c6c5c5;
}

</style>