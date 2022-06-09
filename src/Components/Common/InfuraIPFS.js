import { create } from 'ipfs-http-client'

const auth = process.env.REACT_APP_INFURA_IPFS_PROJECT_ID + ":" + process.env.REACT_APP_INFURA_IPFS_PROJECT_SECRET
const b64_auth = btoa(auth)

const ipfs = create({
    host: 'block-ops.infura-ipfs.io', //'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
      authorization: 'Basic ' + b64_auth
    }
  })

export default ipfs;