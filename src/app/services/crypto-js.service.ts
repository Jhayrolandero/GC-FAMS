import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { Observable } from 'rxjs';
import { Encryption } from './Interfaces/encryption';
@Injectable({
  providedIn: 'root'
})
export class CryptoJSService {

  constructor() { }

  CryptoJSAesDecrypt<T>(passphrase: string, encrypted_json_string: Encryption): T | undefined {
    try {

      var obj_json = encrypted_json_string;
      var encrypted = obj_json.ciphertext;
      var salt = CryptoJS.enc.Hex.parse(obj_json.salt);
      var iv = CryptoJS.enc.Hex.parse(obj_json.iv);

      var key = CryptoJS.PBKDF2(passphrase, salt, { hasher: CryptoJS.algo.SHA512, keySize: 64 / 8, iterations: 999 });

      var decrypted = CryptoJS.AES.decrypt(encrypted, key, { iv: iv });

      console.log("Message: ", decrypted.toString(CryptoJS.enc.Utf8))
      return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8)) as T
    } catch (error) {
      console.log(error)
      return undefined
    }
  }

}
