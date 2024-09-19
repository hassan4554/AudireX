import { useNavigate } from 'react-router-dom';
import Products from '../Utilities/productsData'
import { useEffect } from 'react'
import HandleCartBtn from '../Utilities/handleCart'
import './RelatedProducts.css'

const RelatedProducts = ({ data }) => {
  const navigate = useNavigate();
  const category = data.category;

  let newArr = Products.filter(product => product.category == category).filter(product => product.title != data.title);
  newArr = newArr.length > 3 ? newArr.slice(0, 3) : newArr

  useEffect(() => {

  }, [])

  const handleImageClick = (id) => {
    navigate(`/product-details/${id}`);
  }

  return (
    <>
      <div className="related-products-container">
        <div className="related-products-heading">Related Products</div>
        <div className="related-products-listing">
          {
            newArr.map((item) => {
              return (
                <div className="product-card" key={item.id}>
                  <figure className="card-figure" onClick={() => { handleImageClick(item.id) }}>
                    <img src={item.images[0]} alt={item.title} className="card-img" />
                  </figure>
                  <div className="card-title">{item.title}</div>
                  <p className="card-info">{item.info}</p>
                  <div className="gap"></div>
                  <div className="seperator"></div>
                  <div className="gap"></div>
                  <div className="card-price">
                    <div className="fn-price">Rs. {item.finalPrice.toLocaleString('en-IN')}</div>
                    <div className="og-price line-through">Rs. {item.originalPrice.toLocaleString('en-IN')}</div>
                  </div>
                  <HandleCartBtn item={item} />
                </div>
              )
            })
          }
        </div>
      </div>
    </>
  )
}

export default RelatedProducts

