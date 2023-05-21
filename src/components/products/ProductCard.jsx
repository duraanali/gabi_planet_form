import React from 'react'
import { useParams } from 'react-router-dom'
function ProductCard(props) {

    const params = useParams();
    
    const selectedProduct = props.products.find((product) => product.id === Number(params.id))
   
    return (
        <div className="item-wrapper">
        <div className="item-header">
          <div className="image-wrapper">
            <img src={selectedProduct.image} alt={selectedProduct.title} style={{ height: '400px'}} />
          </div>
          <div className="item-title-wrapper">
            <h2>{selectedProduct.name}</h2>
            <h4>Price: ${selectedProduct.price}</h4>
            <p className="item-description">{selectedProduct.description}</p>
          </div>
        </div>
      </div>
  )
}

export default ProductCard