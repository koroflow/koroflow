# @koroflow/tailwindcss-transformer

This package is a fork of [@clerk/tailwindcss-transformer](https://github.com/clerk/javascript/blob/main/packages/tailwindcss-transformer/README.md) with added support for tailwind-variants and modified file structure and changed the class prefix.

> [!WARNING]  
> This is an experimental package and breaking changes may occur regularly. Usage at your own risk!

## Features

- All features from the original Clerk transformer
- Added support for tailwind-variants
- Modified file structure for better organization
- Changed class prefix from `cl-` to `kf-`

## Example

Input:

```jsx
export function Example({ flag }) {
  let className = cn('absolute inset-0', flag && 'uppercase');
  return <div className={cn('flex items-center text-sm', className)} />;
}
```

Output:

```jsx
export function Example({ flag }) {
  let className = cn('kf-7601190e', flag && 'kf-d2cf63c7');
  return <div className={cn('kf-f64ae6a6', className)} />;
}
```

```css
.kf-7601190e {
  @apply absolute inset-0;
}

.kf-d2cf63c7 {
  @apply uppercase;
}

.kf-f64ae6a6 {
  @apply flex items-center text-sm;
}
```

```css
.kf-7601190e {
  position: absolute;
  inset: 0;
}

.kf-d2cf63c7 {
  text-transform: uppercase;
}

.kf-f64ae6a6 {
  display: flex;
  align-items: center;
  font-size: 0.875rem;
}
```

## License

This project is licensed under the **GNU General Public License v3.0 (GPL-3.0)**.

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

See [LICENSE](LICENSE.md) for more information.
