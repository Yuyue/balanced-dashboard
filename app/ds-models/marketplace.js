var attr = DS.attr;
var hasMany = DS.hasMany;
var belongsTo = DS.belongsTo;

Balanced.Marketplace = DS.Model.extend({

	credits: hasMany('credit'),
	debits: hasMany('debit'),
	refunds: hasMany('refunds'),
	holds: hasMany('holds'),
	transactions: hasMany('transactions'),
	callbacks: hasMany('callbacks'),

	funding_instruments: hasMany('fundingInstrument'),
	bank_accounts: hasMany('bankAccount'),
	cards: hasMany('card'),

	owner_account: belongsTo('account'),
	owner_customer: belongsTo('customer'),

	customers: hasMany('customer')

	/*funding_instruments_uri: function() {
		return this.get('uri') + '/search?limit=10&offset=0&q=&type[in]=bank_account,card';
	}.property('uri'),

	// TODO - take this out once marketplace has a link to invoices list
	invoices_uri: function() {
		return '/invoices';
	}.property('uri'),

	populateWithTestTransactions: function() {
		//  pre-populate marketplace with transactions
		var uri = this.get('uri');
		var id = uri.substr(uri.lastIndexOf('/') + 1);
		Balanced.NET.ajax({
			url: ENV.BALANCED.AUTH + '/marketplaces/%@/spam'.fmt(id),
			type: 'PUT'
		});
	}*/
});
