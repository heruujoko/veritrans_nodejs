var base64 = require('base64');
var request = require('unirest');
		
function Veritrans(server_key){
	this.server_key = server_key;
}

Veritrans.prototype.getChargeURL = function(callback){
	var b64 = base64.encode(this.server_key);
	var charge_url = 'https://api.sandbox.veritrans.co.id/v2/charge';
	var headers = {
    	'Content-Type' : 'application/json',
        'Accept' : 'application/json',
        'Authorization' : 'Basic '+b64
    };

    var data = {
          "payment_type": "vtweb",
          "transaction_details": {
            "order_id": this.order_id,
            "gross_amount": this.gross_price
          },
          "vtweb": {
            "credit_card_3d_secure": true
          },
          "customer_details" : this.customer_details,
          "item_details" : this.item_details
    };
    request.post(charge_url).headers(headers).type('json').send(data).end(function(response){
        callback(response.raw_body.redirect_url);
    });      
}

Veritrans.prototype.setCustomerDetails = function(first,last,email,phone){
	this.customer_details = {
		"first_name": first,
        "last_name": last,
        "email": email,
        "phone": phone
	};
}

Veritrans.prototype.setOrderID = function(id){
	this.order_id = id;
}

Veritrans.prototype.setPrice = function(price){
	this.gross_price = price;
}

Veritrans.prototype.setItemDetails = function(id,name , price){
	this.item_details = [{
		"id": id,
        "price": price,
        "quantity": 1,
        "name": name
	}];
}

module.exports = Veritrans;