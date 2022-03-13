export default {
  methods: {
    shapeTime: function(str) {
      let count = str.indexOf('T')
      let tmp = str.substring(0, count)
      return tmp
    },
    pageReload: function() {
      location.reload();
      return
    }
  },
}