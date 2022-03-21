# rslang
RS Lang Task

# Stack

**1. React.js** - allows build encapsulated components that manage their own state.

**Pros:** 
- Pretty simple syntax
- Virtual Object Model Document
- Repeated use of components
- React developer browser tools
- Huge community
- Permanent support with issues resolving

**Cons:** 
- Focus on the user interface => necessary to integrate additional tools for routing i.e.
- Poor documentation

**2. Styled components** - utilising tagged template literals and the power of CSS, allows you to write actual CSS code to style your components. It also removes the mapping between components and styles.

**Pros:** 
- Reusable – just as the normal React components, you can make small reusable pieces of code and avoid code duplication. Typical use cases are buttons, tables, forms, etc. 
- Writing pure CSS – оne of the biggest advantages of Styled components in comparison to other styling solutions in React. You don’t to use weird syntax and write the CSS as a JavaScript object. Inside the template literals, you write SCSS or plain CSS.  You also avoid the hassle with the media queries – it’s straightforward, just as classic CSS.
- Dynamic styling – By using props you can have dynamic values, which gives you a high level of flexibility by avoiding writing duplicated styles.  
- Out-of-the-box theming support – with ThemeProvider you can create a powerful theme-based architecture while maintaining full control over the styling in the individual component.
- No class name bugs – Styles components generate unique class names for the defined styles. In this way, there is no duplication or unexpected overwriting. 
- Better performance – The library is smart enough to keep track of the components rendered on a page and not load the styling for unused components.

**Cons:** 
- Unusual approach - writing styles in component style.
- Polluting the React DOM – the library adds many levels of nesting, and debugging can get tedious.
- Workarounds required – it`s possible to overengineer app by creating a separated styled component for each DOM element, but that can create conflicts and make your style definitions harder to debug.

**3. Typescript** - is a strict syntactical superset of JavaScript and adds optional static typing to the language.

**Pros:** 
- Strict typing
- Structural typing
- Implicit typing
- Easier to debug
- Quicker development
- Increases overall performance

**Cons:** 
- More initial setup
- Overly complicated typing system
- Required compilation while JS doesn’t

**4. Chart.js** - is an easy way to include animated, interactive graphs on your website.

**Pros:** 
- 9 types of graphs and charts: Line, Linear with Areas, Bar, Doughnut and Pie, Radar, Polar, Bubble and Scatterplot (Scatter) and Mixed Chart Types
- All types of graphs can be customized and animated, and they are all responsive when working on the web
- The functionality can be extended through the use of plugins

**Cons:** 
- Pure library approach that Chart.js represents does not provide data extraction utilities, integrations to different data sources, data collection, transformation (ETL), data warehousing, administration UIs, role management nor configurable interactive widgets, so, for more complex visualization you should prefer other tools.

**5. Axios** - promise based HTTP client for the browser and node.js.

**Pros:** 
- Compatible with some older browsers (ie. IE11)
- Provides Cancelling Request ⇒ that can also be done without Axios using AbortController)
- Very popular third-party library actively supported
- Wrapper / decorator pattern which offers nice and convenient interface

**Cons:** 
- Must be installed and imported (not native in JavaScript)
- Not the standard so it is important to manage the conflict possibilities
- Third-party libraries adds weight/load on the application or website (to be considered)

**6. React router DOM** - this library that allows to use routes in your projects to render multiple pages with SPA.

**7. Git** - distributed version control system designed to handle everything from small to very large projects with speed and efficiency.
