const crypto = require('crypto');

// 32 바이트 (256 비트) 키 생성
const key = crypto.randomBytes(32).toString('base64');
console.log(key);
