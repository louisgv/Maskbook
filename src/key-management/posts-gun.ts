import { gun } from './gun'
import { PublishedAESKey } from '../crypto/crypto-alpha-40'
import { OnlyRunInContext } from '@holoflows/kit/es'

OnlyRunInContext('background', 'gun')
export async function queryPostAESKey(postIdentifier: string, myUsername: string) {
    return gun
        .get('posts')
        .get(postIdentifier)
        .get(myUsername)
        .once().then!()
}

export async function publishPostAESKey(
    postIdentifier: string,
    receiversKeys: {
        key: PublishedAESKey
        name: string
    }[],
) {
    // Store AES key to gun
    const stored: {
        [postIdentifier: string]: PublishedAESKey
    } = {}
    for (const k of receiversKeys) {
        stored[k.name] = k.key
    }
    console.log('Save to gun', postIdentifier, receiversKeys)
    await gun
        .get('posts')
        .get(postIdentifier)
        .put(stored).then!()
}

Object.assign(window, { queryPostAESKey, publishPostAESKey })
