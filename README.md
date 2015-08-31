# veritrans_nodejs
simple veritrans helper

A simple helper for using veritrans API but currently just supported for VTWeb transaction and sandbox mode.

# usage
I assume you have registered in veritrans and have a sandbox account. If you don't, please go here before continue http://docs.veritrans.co.id/en/welcome/index.html

```javascript
var Veritrans = require('./veritrans.js');
var vt = new Veritrans('my-server-key'); //replace that with your server key
vt.setCustomerDetails("first_name" , "last_name" , "email" , "phone");
vt.setItemDetails("id",25000);
vt.setPrice(25000);
vt.setOrderID("id");
vt.getChargeURL(function(payment_url){
    var URL = payment_url; //at this point variable contain URL that can be used to redirect.	
});
```
