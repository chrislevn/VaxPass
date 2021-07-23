import * as Crypto from 'expo-crypto';

/**
 * Process crypto
 * @param {*} value input value
 * @return {*} crypto output
 */
const cryptoProcess = async (value) => {
    const digest = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        value
      );
      return digest;
}

export default cryptoProcess; 