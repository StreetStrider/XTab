XTab
===

JavaScript cross-tab events library.

Allow to emit events that will be dispatched to all other tabs from that domain opened.

Basic Usage
---

    XTab.on('meow', function handler (cat, color) { ... });
    XTab.emit('meow', 'Boris', 'red');

handler can accept any count of arguments.
When emitting events any count of arguments can be passed.

Multiple handlers
---

    function handler1 () { ... };
    function handler2 () { ... };
    function handler3 () { ... };
    XTab.on('meow', handler1);
    XTab.on('meow', handler2);
    XTab.on('meow', handler3);

Handlers will be triggered in straight order of assignment.

Removing handlers
---

    XTab.off('meow', handler1); // removes only handler1
    XTab.off('meow'); // removes all handlers for meow event

Once handlers
---
    XTab.once('woff', function run () { ... }); // triggered only once
    XTab.emit('woff');
    XTab.emit('woff'); // no effect
