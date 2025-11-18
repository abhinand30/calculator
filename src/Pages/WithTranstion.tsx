import { useEffect, useState, useTransition } from "react";


const WithTransition = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [filtered, setFiltered] = useState([])
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        fetchApi()
    }, [])
    const fetchApi = async () => {
        try {
            const result = await fetch('https://dummyjson.com/products?limit=1000');
            const res = await result.json();

            if (result.ok) {
                setProducts(res.products);
                setFiltered(res.products);
            }
        } catch (error) {
            console.log(error)
        }
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearch(value)
        startTransition(() => {
            setFiltered(
                products.filter((p) =>
                    p.description.toLowerCase().includes(value.toLowerCase())
                )
            );
        })

    }


    return (
        <div><p>{filtered.length}</p>
            <h2>Without useTransition</h2>
            <input
                value={search}
                onChange={handleSearch}
                placeholder="Search products..."
            />
            {isPending && <p>Loading...</p>}
            <ul style={{ opacity: isPending ? 0.5 : 1 }}>
                {filtered.map((p) => (
                    <li key={p.id}>{p.title}</li>
                ))}
            </ul>
        </div>
    )
}
export default WithTransition;