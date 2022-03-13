<template>
  <div class="container mt-3 mb-3">
    <ul class="row list-unstyled">
      <li class="col-6 col-md-4 col-lg-3 mb-2" 
          v-for="item in $store.state.items" :key="item.id">
        <nuxt-link class="card text-decoration-none text-dark p-1"
           :to="'/detail/' + item.id"
           rel="nofollow noopener noreferrer">
          <div class="position-relative text-center mb-3">
            <span v-if="item.imgUrl">
              <img style="height:150px; width:150px; object-fit:contain;"
                   :src="item.imgUrl"
                   alt="">
            </span>
            <span v-else>
              <img style="height:150px; width:150px; object-fit:contain;"
                   src="../assets/image/noimage.png"
                   alt="">
            </span>
            <span class="border text-secondary position-absolute px-1 top-0 end-0 small d-inline-block"
                  v-if="item.tags">
              {{item.tags}}
            </span>
          </div>
          <p class="d-inline-block text-truncate mb-3">
            {{item.title}}
          </p>
          <div class="d-flex justify-content-between">
            <p class="small text-muted">{{shapeTime(item.createdAt)}}</p>
            <p class="small text-secondary" v-if="item.status">
              {{item.status}}
            </p>
          </div>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
import Mixin from '../plugins/mixin.js'
import { mapActions } from 'vuex'
export default {
  mixins: [ Mixin ],
  data() {
    return {}
  },
  mounted () {
    if (!this.$store.state.items.length) {
      this.getListFromApi()
    }
  },
  methods: {
    ...mapActions({
      getListFromApi: 'getListFromApi'
    })
  }
}
</script>