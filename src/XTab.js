/**
 * XTab
 *  Cross-tab events library.
**/



XTab = (function (window, localStorage) {

	var
		prefix = 'XTab.',
		handlers = {},
		XTab = {};

		function codeArgs (args)
		{
			//args = Array.prototype.slice.call(args); // redundant
			args.push(new Date().getTime());
			return JSON.stringify(args);
		}

		function decodeArgs (value)
		{
			var args = JSON.parse(value);
			args.pop();
			return args;
		}

		window.addEventListener('storage', function (e) {
			if (e.key.substr(0, prefix.length) == prefix)
			{
				var eventName = e.key.substr(prefix.length);
				handlers[eventName] && handlers[eventName].forEach(function (handler) {
					handler.apply(XTab, decodeArgs(e.newValue));
				});
			}
		});

		function createHandlers (eventName)
		{
			if (! handlers[eventName]) handlers[eventName] = [];
		}

		XTab.on = function (eventName, handler)
		{
			createHandlers(eventName);
			handlers[eventName].push(handler);
		};

		XTab.off = function (eventName, handler)
		{
			if (! handler)
			{
				handlers[eventName] = [];
			} else
			{
				createHandlers(eventName);
				var index = handlers[eventName].indexOf(handler);
				if (~ index)
				{
					handlers[eventName].splice(index, 1);
				}
			}
		};

		XTab.once = function (eventName, handler)
		{
			var onceHandler = function () {
				this.off(eventName, onceHandler);
				return handler.apply(this, arguments);
			};
			this.on(eventName, onceHandler);
		};

		XTab.emit = function (eventName)
		{
			var args = Array.prototype.slice.call(arguments, 1);
			localStorage.setItem(prefix + eventName, codeArgs(args));
		};

		return XTab;

})(window, localStorage);
