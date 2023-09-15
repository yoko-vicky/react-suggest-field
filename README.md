# React Suggest Field

![image](./image.gif)

## About the Project

This is a npm package to help you develop an auto-complete suggest field.
You can try it out on this [live storybook demo](https://yocosaka-react-suggest-field.netlify.app/)!

## Built With

- TypeScript
- React

## Live Demo

[Live Demo Link](https://yocosaka-react-suggest-field.netlify.app/)

## Installation

```
$ npm install react-suggest-field
$ yarn add react-suggest-field
```

<!-- ## Props -->

<!--
| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 | -->

## The gist

```jsx
import React from 'react';
import { SimpleFilter, StoreSelectedItems } from 'react-suggest-field';
import 'react-suggest-field/dist/bundle.css';

function App() {
  const originSuggestions = [
  {
    id: 1,
    label: 'Red',
  },
  {
    id: 2,
    label: 'Blue',
  },
  {
    id: 3,
    label: 'Yellow',
  },
  {
    id: 4,
    label: 'Green',
  },
  {
    id: 5,
    label: 'Black',
  },
  {
    id: 6,
    label: 'White',
  },
];
const initialItemsInStore = [
  {
    id: 7,
    label: 'Rainbow',
  },
] as ItemType[];

  return (
    <div style={{
      width: '90%',
      maxWidth: '60rem',
      margin: '3rem auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '4rem'
    }}>
      <StoreSelectedItems
        initialItemsInStore={initialItemsInStore}
        originSuggestions={originSuggestions}
        maxItemLength={5}
        placeholder="Input something to add"
      />
      <SimpleFilter
        originSuggestions={originSuggestions}
        placeholder="Input something to filter"
      />
    </div>
  );
}
```

## Author

👤 **Yoko Saka**

- GitHub: [@yocosaka](https://github.com/yocosaka)
- LinkedIn: [Yoko Saka](https://www.linkedin.com/in/yokosaka)

## Contributing

Contributions, issues, and feature requests are welcome!
Feel free to check the [issues page](../../issues).

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Show your support

Give a ⭐️ if you like this project!

## License

This project is [MIT](./LICENSE) licensed.

## Acknowledgements

- [npmjs](https://www.npmjs.com/)
- [Storybook](https://storybook.js.org/)
- [Rollup](https://rollupjs.org/)
