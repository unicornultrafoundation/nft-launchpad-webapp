export const RPC_URL = process.env.NODE_ENV === 'development' ? 'https://rpc-nebulas-testnet.uniultra.xyz' : 'https://rpc-mainnet.uniultra.xyz'
export const NETWORK_NAME = process.env.NODE_ENV === 'development' ? 'U2U nebula testnet' : 'U2U Solaris mainnet'
export const BLOCK_EXPLORER_URL = process.env.NODE_ENV === 'development' ? 'https://testnet.u2uscan.xy' : 'https://u2uscan.xyz/'
export const CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID

export const FINGERPRINT = '0x0000000000000000000000000000000000000000000000000000000000000000'