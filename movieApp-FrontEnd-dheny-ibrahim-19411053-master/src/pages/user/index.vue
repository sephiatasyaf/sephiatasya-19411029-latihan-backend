<template>
    <q-page padding>
        <div class="q-mb-xl">
          <q-carousel
            animated
            v-model="slide"
            navigation
            infinite
            :autoplay="autoplay"
            arrows
            swipeable
            transition-prev="jump-right"
            transition-next="jump-left"
            @mouseenter="autoplay = false"
            @mouseleave="autoplay = true"
          >
            <q-carousel-slide :name="1" img-src="https://images4.alphacoders.com/653/thumb-1920-653613.jpg">
            <div class="absolute-center custom-caption" style="text-align:center; color:white;">
              <div class="text-h2 text-weight-bold">Stars Wars</div>
              <div class="text-overline">The Force Awakens</div>
            </div>
            </q-carousel-slide>
            <q-carousel-slide :name="2" img-src="https://images8.alphacoders.com/106/thumb-1920-1062458.jpg" />
            <q-carousel-slide :name="3" img-src="https://images3.alphacoders.com/819/819478.jpg" />
            <q-carousel-slide :name="4" img-src="https://images7.alphacoders.com/610/thumb-1920-610211.jpg" />
            <q-carousel-slide name="soft-jazz">
              <q-video
                class="absolute-full"
                src="https://www.youtube.com/embed/QJHY4ggYCk4"
              />
            </q-carousel-slide>
          </q-carousel>
        </div>
        <div class="row q-col-gutter-md">
          <div class="col-md-3 col-xs-12" v-for="(movie, i) in data" :key="i">
            <q-card>
              <q-img :src="`${$baseImageURL}/${movie.image}`" :ratio="16/9" />

              <q-card-section>
                <q-btn
                  fab
                  color="warning"
                  icon="add_shopping_cart"
                  class="absolute"
                  style="top: 0; right: 12px; transform: translateY(-50%);"
                />

                <div class="row no-wrap items-center">
                  <div class="col text-h6 ellipsis">
                    {{ movie.judulFilm }}
                  </div>
                </div>

                <q-rating v-model="movie.rating" readonly color="orange-5" :max="5" size="32px" />
              </q-card-section>

              <q-card-section class="q-pt-none">
                <div class="text-subtitle1">
                  Rp.{{ movie.harga }},-
                </div>
                <div class="text-subtitle1">
                  {{ movie.genre }}
                </div>
                <div @click="movie.expanded = !movie.expanded" class="text-caption text-grey-10 cursor-pointer">
                  Tampilkan Sinopsis
                </div>
                <q-slide-transition>
                  <div v-show="movie.expanded">
                    <div class="text-grey text-caption" style="text-align:justify;">
                      {{ movie.deskripsi }}
                    </div>
                  </div>
                </q-slide-transition>
              </q-card-section>

              <q-card-actions>
                <q-btn unelevated @click="openDetail(movie)" class="full-width" color="primary">
                  Order Now
                </q-btn>
              </q-card-actions>
            </q-card>
          </div>
        </div>
        <q-dialog v-model="dialog" v-if="dialog" position="bottom">
          <q-card style="width: 500px">
            <q-card-section>
              <div class="text-h6">Detail Pemesanan</div>
            </q-card-section>
            <q-card-section style="max-height: 50vh;" class="scroll">
              {{ activeData.judulFilm }} - Rp.{{ activeData.harga }},-
              <q-form>
                <q-input filled type="number" class="q-mb-md" v-model="jumlah" label="Masukkan Jumlah"/>
                Rp.{{ total }},-
                <q-file color="teal" class="q-mt-md" v-model="image" filled label="Upload Bukti Pembayaran">
                  <template v-slot:prepend>
                    <q-icon name="cloud_upload" />
                  </template>
                </q-file>
              </q-form>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn flat label="Batal" v-close-popup/>
              <q-btn color="primary" @click="prosesTransaksi" label="Proses"/>
            </q-card-actions>
          </q-card>
        </q-dialog>
    </q-page>
</template>
<script>
export default {
  data () {
    return {
      slide: 1,
      autoplay: true,
      stars: 4,
      dialog: false,
      data: [],
      image: null,
      activeData: null,
      jumlah: 1
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$axios.get('movie/getall')
        .then(res => {
          if (res.data.sukses) {
            this.data = res.data.data.map(movie => {
              return Object.assign(movie, {
                expanded: false
              })
            })
          } else {
            this.$showNotif(res.data.pesan, 'negative')
          }
        })
    },
    openDetail (data) {
      this.activeData = data
      this.dialog = true
    },
    prosesTransaksi () {
      const formData = new FormData()
      formData.append('image', this.image)
      formData.append('data', JSON.stringify({
        idUser: this.$q.localStorage.getItem('dataUser')._id,
        idFilm: this.activeData._id,
        harga: this.activeData.harga,
        jumlah: this.jumlah,
        total: this.total
      }))
      this.$axios.post('order/insert', formData)
        .then(res => {
          if (res.data.sukses) {
            this.$showNotif(res.data.pesan, 'positive')
            this.dialog = false
            this.image = null
          } else {
            this.$showNotif(res.data.pesan, 'negative')
          }
        })
    }
  },
  computed: {
    total () {
      return this.activeData.harga * this.jumlah
    }
  }
}
</script>
