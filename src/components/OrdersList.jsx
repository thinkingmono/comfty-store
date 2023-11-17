import { useLoaderData } from "react-router-dom"
//dayjs library to format dates.
import day from "dayjs";
import advancedFormat from 'dayjs/plugin/advancedFormat';
day.extend(advancedFormat);


const OrdersList = () => {
    //Destructure orders and meta data from ordersLoader.
    const { orders, meta } = useLoaderData();
    return (
        <div className="mt-8">
            {/*Total orders*/}
            <h4 className="mb-4 capitalize">Total Orders: {meta.pagination.total}</h4>
            {/*Orders list*/}
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/*Table Header*/}
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Products</th>
                            <th>Cost</th>
                            <th className="hidden sm:block">Date</th>
                        </tr>
                    </thead>
                    {/*Orders List*/}
                    <tbody>
                        {/*Map through users orders list*/}
                        {orders.map((order) => {
                            {/*Destructure order parameters from order attributes*/}
                            const { name, address, numItemsInCart, orderTotal, createdAt } = order.attributes;
                            return (
                                //Order row
                                <tr key={order.id}>
                                    <td>{name}</td>
                                    <td>{address}</td>
                                    <td>{numItemsInCart}</td>
                                    <td>{orderTotal}</td>
                                    <td className="hidden sm:block">{day(createdAt).format('hh:mm a - MMM Do, YYYY')}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default OrdersList