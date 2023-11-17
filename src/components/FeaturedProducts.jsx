import { SectionTitle, ProductsGrid } from "./index"

//Container component that renders a SectionTitle and the ProductsGrid custom components.
const FeaturedProducts = () => {
    return (
        <div className="pt-24">
            <SectionTitle text='Featured Products' />
            <ProductsGrid />
        </div>
    )
}

export default FeaturedProducts