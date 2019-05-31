import { VASTClient, VASTTracker } from 'vast-client'

const URL = 'https://svastx.moatads.com/groupmunilevervideo5876034363/Axe_-_UNE_AXE_461_AXE_YHWYC_2019-27846092_js.xml'

const run = async () => {
  const vastClient = new VASTClient()
  const resp = await vastClient.get(URL)
  console.log(resp)
}

run().then(() => {
  console.log('done')
  process.exit()
})
