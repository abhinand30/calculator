import { useDebounce } from '@/hooks/useDebounce';
import { useEffect, useState } from 'react'

const Search = () => {
    const [users, setUsers] = useState([]);
    const [query, setQuery] = useState('');
    // const [loading, setLoading] = useState(false);
    const debouncedQuery = useDebounce(query, 500)
    useEffect(() => {
        if (!debouncedQuery) {
            setUsers([]);
            return;
        }
        fetchData()
    }, [debouncedQuery])
    const fetchData = async () => {
        try {
            const result = await fetch(`https://api.github.com/search/users?q=${debouncedQuery}`);
            if (result.ok) {
                const res = await result.json();
                setUsers(res.items)
                console.log(res)
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <input name={query} onChange={(e) => setQuery(e.target.value)} className='h-8 w-30 border-1 p-1' />
            <div>
                {users.map((user, index) => (
                    <div key={index}>
                        <p>{user.login}</p>
                        <p>{user.organizations_url}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Search