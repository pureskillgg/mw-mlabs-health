import { createHealthCheck, createHealthEvents } from '../index.js'

export default ({ log }) =>
  async () => {
    let healthy = null
    const healthCheck = createHealthCheck(true)
    const { event, emitter, emit } = createHealthEvents(healthCheck)
    emitter.on(event, (health) => {
      log.debug({ health })
      healthy = health.healthy
    })
    await emit()
    return healthy
  }
