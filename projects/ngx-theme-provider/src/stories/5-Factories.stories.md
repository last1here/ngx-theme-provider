# Factories

The idea behind factories is to simplify the definition of themes by defining a
method that will process a theme definition and return a modified theme
containing all its properties. This allows you to define a strict set of base
params for your themes and then the factory will extrapolate the rest from them.

## Basic example

First we define a simple definition of the theme properties.

```typescript
interface AppProps {
  primary: string;
  secondary: string;
  destructive: string;
  base: string;
}
```
Then a set of themes that define 

```typescript
import { Theme } from 'ngx-theme-provider';

var lightTheme: Theme<AppProps> = {
  name: 'light',
  properties: {
    primary: '#1a72dc',
    secondary: '#10140f',
    destructive: '#DB2B0C',
    base: '#10140f',
  },
};
var darkTheme: Theme<AppProps> = {
  name: 'dark',
  properties: {
    primary: '#082344',
    secondary: '#10140f',
    destructive: '#701707',
    base: '#10140f',
  },
};
```
The aim

```typescript
function exampleFactory(theme: Theme<AppProps>) {
  return {
    name: theme.name,
    properties: {
      primaryText: isDark(theme.properties.primary) ? '#FFF' : '#111',
      primaryLight: lighten(theme.properties.primary, 10%),
      primaryTransparent: transparentise(theme.properties.primary, 0.5),
      secondaryText: isDark(theme.properties.secondary) ? '#FFF' : '#111',
      destructiveText: isDark(theme.properties.destructive) ? '#FFF' : '#111',
      baseText: isDark(theme.properties.base) ? '#FFF' : '#111',
      ...theme.properties
    }
  } as Theme;
}
```

You'd then pass both the themes and the factories to the
`NgxThemeProviderModule.forRoot`. This will then run the theme through the
factory everytime it needs to generate the css props for the theme.

```typescript
NgxThemeProviderModule.forRoot({
  themes: [lightTheme, darkTheme, extraTheme],
  factory: exampleFactory,
  defaultTheme: 'light',
});
```

## Multiple Factories

There maybe a case for using multiple factories. This is out of scope for the
initial implementation. BUT, this can be implemented fairly simply using
lodashes [flowRight](https://www.npmjs.com/package/lodash.flowright).

```typescript
NgxThemeProviderModule.forRoot({
  themes: [lightTheme],
  factory: flowRight(exampleFactory, exampleFactory2),
  defaultTheme: 'light',
});
```

### Theme params

You can also expand the theme type to provide params

### Caveat

For simple apps with one theme definition you could just call the factory at
theme definition `const lightTheme = factory(configs);`. But by including the
factory in the module makes cases such as loading themes at app start over http
or via json simpler.
