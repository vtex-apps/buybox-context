📢 Use this project, [contribute](https://github.com/vtex-apps/buybox-context) to it or open issues to help evolve it using [Store Discussion](https://github.com/vtex-apps/store-discussion).

# Buybox Context

[<i class="fa-brands fa-github"></i> Source code](https://github.com/vtex-apps/buybox-context)

<!-- DOCS-IGNORE:start -->
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-0-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->
<!-- DOCS-IGNORE:end -->

> ⚠️ This app is no longer maintained by VTEX. This means support and maintenance are no longer provided.

The Buybox Context is a component that enables sorting sellers for products sold by multiple sellers. When Buybox context wraps a Product context, it reorders sellers and sets the new `sellerDefault` on the current product's seller list.

## Configuration

In this section, you first must add the primary instructions that will allow users to use the app's blocks in their store, such as:

1. Adding the app as a theme dependency in the `manifest.json` file;

```json
  "dependencies": {
    "vtexbr.buybox-context": "1.x"
  }
```

> If you want to use the [vtex.seller-selector](https://github.com/vtex-apps/seller-selector) app to boost your development, you can add it as a dependency in the `manifest.json` file
>
> ```json
>    "dependencies": {
>      "vtex.seller-selector": "0.x"
>    }
> ```

2. Wrap a block that uses the [`Product Context`](https://github.com/vtex-apps/product-context) and configure the `sortStrategy` that will be used to sort the sellers.

```json
  "buybox-context": {
    "props": {
      "conditionalStrategy": {
        "sortStrategy": "priceShipping",
      }
      "triggerCepChangeEvent": "sellerSelector"
    },
    "children": [
      ...
    ]
  }
```

Now, you are able to use all the blocks exported by the `buybox-context` app. Check out the full list below:

### `buybox-context` props

| Prop name               | Type     | Description                                                                                                                                                                                                        | Default value |
| ----------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------- |
| `conditionalStrategy` | `object` | Object responsible for providing the sort strategy and custom expressions.                                                                                                                                             | `undefined`   |
| `triggerCepChangeEvent` | `enum` | The Buybox Context depends on the CEP event to get the Sellers of the Product. Depending on context, the Buybox Context is used. You can select what this component will be listening to intercept changes and reorder sellers. | `"orderForm"` |
| `children`              | `array`  | Array with `block` components, that use the `Product Context` to sort sellers.                                                                                                                                     | `null`        |

- `conditionalStrategy` props

| Prop name      | Type     | Description                                                                                                                                                                                                                                                                                                                  | Default value |
| -------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `sortStrategy` | `enum`   | Use to select which sort strategy will be used to sort the sellers. If this prop isn't informed, nothing will be done.                                                                                                                                                                                                       | `undefined`   |
| `expression`   | `string` | Custom expression based on a math expression, with predefined [`variables`](#custom-expression-variables). The lowest value resulting from this expression will be positioned at the top of the seller's list. For more details about how to create expressions, click [here](https://github.com/silentmatt/expr-eval#readme). | `undefined`   |

- `sortStrategy` enum:
  | Prop name | Type | Description |
  | --------- | -------- | ----------- |
  | `price` | `string` | Sort sellers **only product price**. The sellers at the top of the list will have the lowest prices. |
  | `priceShipping` | `string` | Sort sellers by **product price + shipping price**. The lower of these two values will be placed at the top of the seller's list. |
  | `customExpression` | `string` | Sort sellers by a custom expression based on a math expression, with predefined [`variables`](#custom-expression-variables). The lowest value resulting from this expression will be positioned at the top of the seller's list. For more details about how to create expressions, click [here](https://github.com/silentmatt/expr-eval#readme) |
  | `protocol` | `string` | Sort sellers using a protocol defined on [buybox-graphql](https://github.com/vtex-apps/buybox-graphql). This protocol defines the contract for receiving and responding with the sorted data. For that to work, a resolver for this contract must be implemented. The [buybox-resolver](https://github.com/vtex-apps/buybox-resolver) was created as an example of that implementation. |

- `triggerCepChangeEvent` enum:
  | Prop name | Type | Description |
  | --------- | -------- | ----------- |
  | `orderForm` | `string` | Used for listening [`useOrderForm()`](https://github.com/vtex-apps/order-manager#orderform-orderform) changes, to get sellers and logistics info to sort seller list with new shipping values. |
  | `sellerSelector` | `string` | Used for listening [`useSellerContext()`]() changes, to get sellers and logistics info to sort seller list with new shipping values. |

- `children` array: Array with `block` components

> The `sortStrategy` and `triggerCepChangeEvent` can be changed using Site Editor.

### Custom expression variables

| Variable                   | Entity   | Description                     |
| -------------------------- | -------- | ------------------------------- |
| `productPrice`             | Product  | Product price                   |
| `productSpotPrice`         | Product  | Product spot price              |
| `productAvailableQuantity` | Product  | Product available quantity      |
| `minShippingPrice`         | Shipping | Cheapest shipping price         |
| `maxShippingPrice`         | Shipping | Most expensive shipping price   |
| `minShippingEstimate`      | Shipping | Minimum estimated delivery time |
| `maxShippingEstimate`      | Shipping | Maximum estimated delivery time |

### `seller-body.buybox` props

| Prop name  | Type    | Description                                                                                                                                                                          | Default value |
| ---------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------- |
| `children` | `array` | Array with `block` components. See [seller-sellector](https://github.com/vtex-apps/seller-selector#advanced-configuration) for more information. | `null`        |

- `children` array: Array with `block` components.

## Dependences

- [vtex.product-context](https://github.com/vtex-apps/product-context)
- [vtex.order-manager](https://github.com/vtex-apps/order-manager)
- [vtex.seller-selector](https://github.com/vtex-apps/seller-selector)
- [expr-eval](https://github.com/silentmatt/expr-eval)

## Modus Operandi

### Product Page

On the product page, you can add the `buybox-context` where it makes sense to select the Buybox winner. In the example below, `flex-layout.col#right-col` is the block that contains product values and conditions. See below:

```json
{
  ...
  "flex-layout.row#product-main": {
    "children": [
      "flex-layout.col#stack",
      "flex-layout.col#right-col"
    ]
  }
  ...
}
```

After adding the `buybox-context` in this example, the new code will be like below:

```diff
{
  ...
  "flex-layout.row#product-main": {
    "children": [
      "flex-layout.col#stack",
-     "flex-layout.col#right-col"
+     "vtex.buybox-context:buybox-context#product-col"
    ]
  },
+ "vtex.buybox-context:buybox-context#product-col": {
+   "props": {
+     "conditionalStrategy": {
+       "sortStrategy": "priceShipping"
+     },
+     "triggerCepChangeEvent": "orderForm"
+   },
+   "children": [
+     "flex-layout.col#right-col"
+   ]
+ },
  ...
}
```

> By default, the prop `triggerCepChangeEvent` value is `orderForm`, which makes this prop optional.

### Sellers

With [seller-selector](https://github.com/vtex-apps/seller-selector) and `buybox-context` installed in your theme, you can create or edit a file in `store/blocks/sellers/sellers.jsonc` and add the code below:

```json
{
  "store.sellers": {
    "blocks": ["vtex.seller-selector:seller-table"]
  },
  "vtex.seller-selector:seller-table": {
    "children": [
      "vtex.seller-selector:seller-simulate-shipping",
      "vtex.seller-selector:seller-head",
      "buybox-context"
    ]
  },
  "buybox-context": {
    "props": {
      "conditionalStrategy": {
        "sortStrategy": "priceShipping"
      },
      "triggerCepChangeEvent": "sellerSelector"
    },
    "children": ["seller-body.buybox"]
  },
  "seller-body.buybox": {
    "children": ["vtex.seller-selector:seller-row"]
  }
}
```

That way, you will have a page similar to this:
![image](https://user-images.githubusercontent.com/17439470/133501110-e143b472-1b58-4ee8-8759-8096ca32df0c.png)

> To have the full behaviour using `seller-body.buybox`, it will be necessary to set the `triggerCepChangeEvent` as `sellerSelector` props on `buybox-context`. Because the default value for this parameter is `orderForm`, but on this page we usually use the `seller-simulate-shipping` to calculate shipping

## Customization

In order to apply CSS customizations in this and other blocks, follow the instructions given in the recipe on [Using CSS Handles for store customization](https://vtex.io/docs/recipes/style/using-css-handles-for-store-customization).

| CSS Handles  |
| ------------ |
| `sellerList` |

<!-- DOCS-IGNORE:start -->

## Contributors ✨

Thanks goes to these wonderful people:

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind are welcome!

<!-- DOCS-IGNORE:end -->

**Upcoming documentation:**

- [Feature/brpa 352 sort by expression](https://github.com/vtex-apps/buybox-context/pull/5)
- [add a conditional field expression](https://github.com/vtex-apps/buybox-context/pull/6)
- [add productSpotPrice and productAvailableQuantity variables](https://github.com/vtex-apps/buybox-context/pull/7)
- [add shipping estimate as variable](https://github.com/vtex-apps/buybox-context/pull/8)
