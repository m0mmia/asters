export function propsFromProduct(product) {
  return {
    key: product.id,
    href: product?.link?.eu,
    imageUrl: assetUrl(`/images/products/${product.id}.jpg`),
    title: product.name,
    price: `€${product.price.eu}`,
  };
}
