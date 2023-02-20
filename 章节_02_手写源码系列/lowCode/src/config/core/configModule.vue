<script>
export default {
  props: {
    modJson: {
      type: Object,
      default: function () {
        return {}
      }
    },
    value: {
      type: Object,
      default: function () {
        return {}
      }
    },
    defaultValue: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  computed: {
    moduleType () {
      return this.modJson.type
    },
    moduleTitle () {
      return this.modJson.title
    }
  },
  methods: {
    createNode (h) {
      return h(this.moduleType)
    }
  },
  render (h) {
    return (
      <div class="config-module">
        <div class="config-module-title">
          <span> { this.moduleTitle } </span>
          {
            this.createNode(h)
          }
        </div>
      </div>
    )
  }
}
</script>

<style>
  .config-module-title {
    line-height: 40px;
    font-size: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
