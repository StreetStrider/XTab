XTab
===

JavaScript cross-tab events library.

Allow to emit events that will be dispatched to all other tabs from that domain opened.

Basic Usage
---
```javascript
XTab.on('meow', function handler (cat, color) { ... });
XTab.emit('meow', 'Boris', 'red');
```

handler can accept any count of arguments.
When emitting events any count of arguments can be passed.

Multiple handlers
---
```javascript
function handler1 () { ... };
function handler2 () { ... };
function handler3 () { ... };
XTab.on('meow', handler1);
XTab.on('meow', handler2);
XTab.on('meow', handler3);
```

Handlers will be triggered in straight order of assignment.

Removing handlers
---
```javascript
    XTab.off('meow', handler1); // removes only handler1
    XTab.off('meow'); // removes all handlers for meow event
    XTab.off(); // removes all handlers
```

Once handlers
---
```javascript
    XTab.once('woff', function run () { ... }); // triggered only once
    XTab.emit('woff');
    XTab.emit('woff'); // no effect
```