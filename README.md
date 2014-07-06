# XTab
Browser cross-tab events library.

Allow to emit events that will be dispatched to all other tabs from that domain opened.

## install
```bash
$ bower install StreetStrider/XTab
```

```html
<script src='path/to/XTab.js'></script>
```

## usage
### in basic
```javascript
XTab.on('meow', function handler (cat) { ... });
XTab.once('meow', function onceHandler (onlyCat) { ... });
XTab.emit('meow', 'Boris');
```

### multiple handlers
```javascript
function handler1 () { ... };
function handler2 () { ... };
function handler3 () { ... };
XTab.on('meow', handler1);
XTab.on('meow', handler2);
XTab.on('meow', handler3);
```

Handlers will be triggered in straight order of assignment.

### removing handlers
```javascript
    XTab.off('meow', handler1); // removes only handler1
    XTab.off('meow'); // removes all handlers for meow event
    XTab.off(); // removes all handlers
```

### once handlers
```javascript
    XTab.once('woff', function run () { ... }); // triggered only once
    XTab.emit('woff');
    XTab.emit('woff'); // no effect
```

## license
MIT. Copyright © 2012 – 2014 StreetStrider.
