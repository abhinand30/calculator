export default function TraditionalList() {
    const items = Array.from({ length: 10000 }, (_, i) => `Item ${i + 1}`)

    return (
        <div style={{ height: '400px', overflowY: 'scroll', border: '1px solid gray' }}>
            {items.map((item) => (
                <div key={item} style={{ padding: 8, borderBottom: '1px solid #ddd' }}>
                    {item}
                </div>
            ))}
        </div>
    )
}

// import FixedSizeList from "react-window"


// export default function VirtualizedList() {
//     const items = Array.from({ length: 10000 }, (_, i) => `Item ${i + 1}`)

//     return (
//         <FixedSizeList
//             height={400}
//             itemCount={1000}
//             itemSize={35}
//             width={300}
//         >
//             {({ index, style }) => (
//                 <div style={style}>Item {index + 1}</div>
//             )}
//         </FixedSizeList>

//     )
// }

