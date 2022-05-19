import { Link } from "react-router-dom"
import ProductCard from '../product-card/product-card.component'

import './category-preview.styles.scss'

const CategoryPreview = ({ title, products }) => {
    const categoryUrl = `/shop/${title}`;
    return (
        <div className='category-preview-container'>
            <h2>
                <Link className='title' to={categoryUrl}>{title.toUpperCase()}</Link>
            </h2>
            <div className='preview'>
                {products
                    .filter((_, index) => index < 4)
                    .map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
            </div>
        </div>
    )

}

export default CategoryPreview
