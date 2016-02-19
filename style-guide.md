# JavaScript Style Guide

## Layout

### Tabs or Spaces?

**Spaces only**, with **2 spaces** per indentation level. No tabs, especially don't mix.

### Semicolons

Yes.

### Line Length

90 characters.

Avoid string concatenation for multi-line strings. Prefer `Array.join(' ')`.

```javascript
var longStringName = [
    'Suspendisse lectus leo, consectetur in',
    'tempor sit amet, placerat quis neque',
    'Etiam luctus porttitor lorem, sed suscipit',
    'est rutrum non. Curabitur lobortis nisl a',
    'enim congue semper. Aenean commodo ultrices imperdiet.'
  ].join(' ');
```


### Encoding
UTF-8.

## Whitespace

No extra whitespace in these places:

- Inside parentheses, braces or brackets

    ```javascript
    $('div');   // Yes
    $( 'div' ); // No
    ```

- Before a comma

    ```javascript
    console.log(x, y);  // Yes
    console.log(x , y); // No
    ```

## Conditional statements

Add spacing around a not operator (`!`) to make it stand out.

```javascript
// No
if (!_.isUndefined(myVar)) {
  ...
}

// Yes
if ( ! _.isUndefined(myVar)) {
  ...
}
```


## Comments

Add them when necessary in explaining code that isn't easily understood. Your code should document itself if it's well factored.

## Variable Declaration

Prefer using a `var` call for each newly created variable.

```javascript
// Yes
var a = 0;
var b = 1;
var c = 2;
```

```javascript
// No
var a = 0
  , b = 1
  , c = 3;
```

Do not use leading commas in object or array assignments

```javascript
var myObj = {
  a = 0,
  b = 1,
  c = 2;
};
```

## Naming Conventions

Use `camelCase` (leading lowercase) to name variables, methods and object properties.

Use `CamelCaps` (leading uppercase) to name all classes.

With constants, use all caps `SNAKE_CASE`.

To denote a "private" method or variable on an object, start with an underscore:

```
_privateMethod: function() {/* ... */}
```

In cases where method calls are being chained and the code does not fit on a single line, each call should be placed on a separate line and
indented by one level (i.e., two spaces), with a leading `.`.

```javascript
$('div').each(function getUniq(div) { return div; })
  .uniq()
  .get(0);
```

## Method Signature

A method signature should have no more than 3 named arguments.

```javascript
var myFunction = function(a, b, c) {/* ... */}; // Yes
var myFunction = function(a, b, c, d) {/* ... */}; // No
```

## Anonymous Functions

Add a function name in the anonymous function to make for useful stack traces

```javascript
myCollection.each(function myMethod(item) {
  item.doSomething();
});
```

However, when in a spec file, please ignore this for the `describe`, `it`, and `beforeEach` calls.

## Method Statements

Methods should be as concise as possible.  The maximum number of statements in a method
should not exceed 7.
