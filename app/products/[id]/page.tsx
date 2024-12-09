interface IParams {
  id: string
}

const ProductDetailsPage = ( { params: { id } }: { params: IParams }) => {
  return <h1>Product ID: { id }  </h1>
}

export default ProductDetailsPage