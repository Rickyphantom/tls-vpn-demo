// lib/forge-utils.ts
const forge = require('node-forge');

export function generateCertificate(bits: number = 2048) {
  const keys = forge.pki.rsa.generateKeyPair({ bits, e: 0x10001 });
  const cert = forge.pki.createCertificate();
  cert.publicKey = keys.publicKey;
  cert.serialNumber = '01';
  cert.validity.notBefore = new Date();
  cert.validity.notAfter = new Date();
  cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 1);

  const attrs = [{ name: 'commonName', value: 'user' }];
  cert.setSubject(attrs);
  cert.setIssuer(attrs);

  cert.sign(keys.privateKey, forge.md.sha256.create());

  return {
    publicKeyPem: forge.pki.publicKeyToPem(keys.publicKey),
    privateKeyPem: forge.pki.privateKeyToPem(keys.privateKey),
    certPem: forge.pki.certificateToPem(cert),
  };
}

export function rsaEncrypt(publicKeyPem: string, message: string): string {
  const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
  const encrypted = publicKey.encrypt(
    forge.util.encodeUtf8(message),
    'RSA-OAEP'
  );
  return forge.util.encode64(encrypted);
}

export function rsaDecrypt(
  privateKeyPem: string,
  base64Cipher: string
): string {
  const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);
  const decrypted = privateKey.decrypt(
    forge.util.decode64(base64Cipher),
    'RSA-OAEP'
  );
  return forge.util.decodeUtf8(decrypted);
}
