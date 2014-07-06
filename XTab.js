/**
 * XTab
 *  Cross-tab events library.
**/

XTab = (function (window, localStorage) {

	var
		prefix = 'XTab.',
		handlers = {},
		XTab = {};

		XTab.on = function (eventName, handler)
		{
			createHandlers(eventName);
			handlers[eventName].push(handler);
		};

		XTab.once = function (eventName, handler)
		{
			this.on(eventName, handler);
			this.on(eventName, remover);

			function remover ()
			{
				this.off(eventName, handler);
				this.off(eventName, remover);
			}
		};

		XTab.off = function (eventName, handler)
		{
			if (arguments.length)
			{
				if (arguments.length > 1)
				{
					createHandlers(eventName);
					var index = handlers[eventName].indexOf(handler);
					if (~ index)
					{
						handlers[eventName].splice(index, 1);
					}
				} else
				{
					handlers[eventName] = [];
				}
			} else
			{
				handlers = {};
			}
		};

		function createHandlers (eventName)
		{
			if (! handlers[eventName]) handlers[eventName] = [];
		}

		XTab.emit = function (eventName, value)
		{
			var data = {};
			if (arguments.length > 1)
			{
				data.value = value;
			}
			data.timemark = +new Date;

			localStorage.setItem(prefix + eventName, JSON.stringify(data));
		};

		window.addEventListener('storage', function (e)
		{
			if (e.key.substr(0, prefix.length) === prefix)
			{
				var eventName = e.key.substr(prefix.length);

				if (handlers[eventName] && handlers[eventName].length)
				{
					var data = JSON.parse(e.newValue);

					handlers[eventName].forEach(function (handler)
					{
						if (data.value)
						{
							handler.call(XTab, data.value);
						}
						else
						{
							handler.call(XTab);
						}
					});
				}
			}
		});

		return XTab;

})(window, localStorage);
