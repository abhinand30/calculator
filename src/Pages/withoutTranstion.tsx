import { useEffect, useState, useTransition } from "react";


const WithoutTransition = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [isPending, startTranstion] = useTransition();

    useEffect(() => {
        fetchApi()
    }, [])
    const fetchApi = async () => {
        try {
            const result = await fetch('https://dummyjson.com/products?limit=100');
            const res = await result.json();

            if (result.ok) {
                setProducts(res.products)
            }
        } catch (error) {
            console.log(error)
        }
    };

    const filtered = products.filter((p) => p.description.toLowerCase().includes(search))

    return (
        <div>
            <h2>Without useTransition</h2>
            <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
            />
            <div>
                {filtered.map((p) => (

                    <div className="h-auto bg-blue-400 text-white mt-5 p-2" key={p.id}>
                        <h5>{p.title}</h5>
                        <p className="text-sm">
                            {p.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default WithoutTransition;