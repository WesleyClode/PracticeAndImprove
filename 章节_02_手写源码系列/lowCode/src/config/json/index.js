const req = require.context('./', false, /[^.]+\.js/)
const configsName = req.keys()
const configs = {}

configsName.forEach(config => {
  const _conf = req(config).default

  if (_conf) {
    configs[_conf.name] = _conf
  }
})

export default { configs }
