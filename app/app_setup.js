// This is pulled out into a separate file so the Grunt neuter task doesn't
// add templating code to it while building

window.balancedSetupFunctions = [];

/*
Creates a new instance of an Ember application and
specifies what HTML element inside index.html Ember
should manage for you.
*/
window.setupBalanced = function(divSelector) {

	// default to #balanced-app if not specified
	divSelector = divSelector || '#balanced-app';
	ENV.HELPER_PARAM_LOOKUPS = true;
	window.Balanced = Ember.Application.create({
		rootElement: divSelector,
		LOG_TRANSITIONS: true,

		customEvents: {
			// key is the jquery event, value is the name used in views
			changeDate: 'changeDate'
		}
	});

	window.Balanced.onLoad = function() {
		//  initialize anything that needs to be done on application load
		Balanced.Analytics.init(Ember.ENV.BALANCED);

		// use JSON API adapter
		Balanced.ApplicationAdapter = DS.JsonApiAdapter;

		Balanced.ApplicationAdapter.reopen({
			host: ENV.BALANCED.API,

			ajax: function(url, type, hash) {
				this.headers = {
					'Accept': 'application/vnd.balancedpayments+json; version=1.1, */*; q=0.1'
				};

				if(Balanced.NET.defaultApiKey) {
					this.headers['Authorization'] = Balanced.Utils.encodeAuthorization(Balanced.NET.defaultApiKey);
				}

				if (url.indexOf(ENV.BALANCED.AUTH) !== -1) {
					if (Balanced.NET.csrfToken) {
						this.headers['X-CSRFToken'] = Balanced.NET.csrfToken;
					}

					hash.xhrFields = {
						withCredentials: true
					};
				}

				return this._super(url, type, hash);
			}

		});

		// Configure modal parent selector
		$.fn.modal.defaults.manager = divSelector;
	};

	_.each(window.balancedSetupFunctions, function(setupFunction) {
		setupFunction();
	});
};
