const webPush = require('web-push');

// Generar claves VAPID
const vapidKeys = webPush.generateVAPIDKeys();

console.log('VAPID Public Key:', vapidKeys.publicKey);
console.log('VAPID Private Key:', vapidKeys.privateKey);

// VAPID Public Key: BFZwHplXUs2__ZRLEu81Wi9HKLjeeiufgQOBaRSyT-P0MyqPBPqgwewhSYIjBHPjRN3mfGju9vnRaRl6kprtBow
// VAPID Private Key: rZy_DDPtAd2Wt_P0JgUwWhs-ljUsc1CL9eNw7szfPuo