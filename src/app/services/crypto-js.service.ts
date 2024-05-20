import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { SHA512, enc } from 'crypto-js';
import { Encryption } from './Interfaces/encryption';
@Injectable({
  providedIn: 'root'
})
export class CryptoJSService {

  constructor() { }

  CryptoJSAesDecrypt<T>(passphrase: string, encrypted_json_string: Encryption): T {

    var obj_json = { ...encrypted_json_string };

    // Unpack the cipher text
    var encrypted = obj_json.ciphertext;

    // parse the salt
    var salt = CryptoJS.enc.Hex.parse(obj_json.salt);

    // Then IV
    var iv = CryptoJS.enc.Hex.parse(obj_json.iv);

    // Derive the key
    var key = CryptoJS.PBKDF2(passphrase, salt, { hasher: CryptoJS.algo.SHA512, keySize: 64 / 8, iterations: 999 });

    // Then the magic happens
    var decrypted = CryptoJS.AES.decrypt(encrypted, key, { iv: iv });

    // COnvert it to string format
    return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8)) as T

  }

  CryptoJSAesEncrypt(passphrase: string, plain_text: string) {

    var salt = CryptoJS.lib.WordArray.random(256);
    var iv = CryptoJS.lib.WordArray.random(16);

    var key = CryptoJS.PBKDF2(passphrase, salt, { hasher: CryptoJS.algo.SHA512, keySize: 64 / 8, iterations: 999 });

    var encrypted = CryptoJS.AES.encrypt(plain_text, key, { iv: iv });

    var data = {
      ciphertext: CryptoJS.enc.Base64.stringify(encrypted.ciphertext),
      salt: CryptoJS.enc.Hex.stringify(salt),
      iv: CryptoJS.enc.Hex.stringify(iv)
    }

    return JSON.stringify(data);
  }

}
