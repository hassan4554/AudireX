import './ProductOverview.css'
const ProductOverview = ({ data }) => {
    return (
        <div className="overview-container">
            <h3>The <span className="ov-title">{data.title}</span> {data.info} provides with fabulous sound quality</h3>
            <ul className='ov-list'>
                <li className='ov-item'>Sound Tuned to Perfection</li>
                <li className='ov-item'>Comfortable to Wear</li>
                <li className='ov-item'>Long Hours Playback Time</li>
            </ul>
            <p className="ov-text">Buy the <span className='ov-title'>{data.title}</span> {data.info} which offers you with fabulous music experience by providing you with awesome sound quality that you can never move on from. Enjoy perfect flexibility and mobility with amazing musical quality with these Neckbands giving you a truly awesome audio experience. It blends with exceptional sound quality and a range of smart features for an unrivalled listening experience.</p>
        </div>
    )
}

export default ProductOverview
