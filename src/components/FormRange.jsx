import { useState } from "react"
import { formatPrice } from "../utils";

//Custom range field
const FormRange = ({ label, name, size, price }) => {
    //Declaring range field attributes.
    const step = 1000;
    const maxPrice = 100000;
    //State variable to set current selected price.
    const [selectedPrice, setSelectedPrice] = useState(price || maxPrice);

    return (
        <div className="form-control">
            <label htmlFor={name} className="label cursor-pointer"><span className="label-text capitalize">{label}</span><span>{formatPrice(selectedPrice)}</span></label>
            <input type="range" name={name} id={name} className={`range range-primary ${size}`} step={step} min={0} max={maxPrice} value={selectedPrice} onChange={(e) => setSelectedPrice(e.target.value)} />
            <div className="w-full flex justify-between text-xs px-2 mt-2">
                <span className="font-bold text-md">0</span>
                <span className="font-bold text-md">Max : {formatPrice(maxPrice)}</span>
            </div>
        </div>
    )
}

export default FormRange