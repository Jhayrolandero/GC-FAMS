import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
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

}
