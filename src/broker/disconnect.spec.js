const { createConnection, connectionOpts, saslConnectionOpts } = require('../../testHelpers')
const { requests, lookup } = require('../protocol/requests')
const Broker = require('./index')

describe('Broker > disconnect', () => {
  let broker

  beforeEach(() => {
    broker = new Broker(createConnection(connectionOpts()))
  })

  afterEach(async () => {
    broker && (await broker.disconnect())
  })

  test('disconnect', async () => {
    await broker.connect()
    expect(broker.connection.connected).toEqual(true)
    await broker.disconnect()
    expect(broker.connection.connected).toEqual(false)
  })

  test('when authenticated with SASL set authenticated to false', async () => {
    broker = new Broker(createConnection(saslConnectionOpts()))
    await broker.connect()
    expect(broker.authenticated).toEqual(true)
    await broker.disconnect()
    expect(broker.authenticated).toEqual(false)
  })
})
