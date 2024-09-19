import './ProductSpecs.css'

const ProductSpecs = ({ data }) => {
    return (
        <div className="specs-container">
            <div>
                <div>Brand</div>
                <div>{data.brand}</div>
            </div>
            <div>
                <div>Model</div>
                <div>{data.title}</div>
            </div>
            <div>
                <div>Generic Name</div>
                <div>{data.category}</div>
            </div>
            <div>
                <div>Headphone Type</div>
                <div>{data.type}</div>
            </div>
            <div>
                <div>Connectivity</div>
                <div>{data.connectivity}</div>
            </div>
            <div>
                <div>Microphone</div>
                <div>Yes</div>
            </div>
        </div>
    )
}

export default ProductSpecs
