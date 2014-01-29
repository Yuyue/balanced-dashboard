var attr = DS.attr;
var hasMany = DS.hasMany;
var belongsTo = DS.belongsTo;

Balanced.User = DS.Model.extend({

	marketplaces: attr(),
	email_hash: attr('string'),

	gravatar: function() {
		return Balanced.Utils.toGravatar(this.get('email_hash'));
	}.property('email_hash'),

	user_marketplaces: function() {
		return Ember.A(this.get('marketplaces')).map(function(marketplace) {
			var obj = Ember.Object.create(marketplace);
			obj.set('production', marketplace.uri.indexOf('TEST') === -1);
			obj.isEqual = function(a, b) {
				b = b || this;
				return Ember.get(a, 'secret') === Ember.get(b, 'secret');
			};
			return obj;
		});
	}.property('marketplaces'),

	user_marketplace_for_id: function(id) {
		return this.get('user_marketplaces').findBy('id', id);
	}

});
