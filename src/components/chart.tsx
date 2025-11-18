import {
    BarChart,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    LabelList,
    ReferenceDot,
    Cell,
} from "recharts"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Building2, Factory, Trees, Warehouse } from "lucide-react"
import { JSX, useState } from "react"

type Row = {
    category: string
    total: number
    marker?: number
    [company: string]: number | string | undefined
}

const chartData: Row[] = [
    { category: "Logistics", "Company A": 120, "Company B": 80, "Company C": 250, total: 450 },
    { category: "Commercial", "Company A": 150, "Company D": 225, total: 375 },
    { category: "Industrial", "Company B": 200, "Company C": 180, "Company E": 100, total: 480 },
    { category: "Open Yard", "Company F": 135, "Company A": 100, total: 235 },
]

const rowColor: Record<string, string> = {
    Logistics: "#f5a29f",
    Commercial: "#f8b79a",
    Industrial: "#d9c4e9",
    "Open Yard": "#c084fc",
}



const iconMap: Record<string, JSX.Element> = {
    Logistics: <Warehouse width={15} className="text-[#83764F] z-10" />,
    Commercial: <Building2 width={15} className="text-[#83764F]" />,
    Industrial: <Factory width={15} className="text-[#83764F]" />,
    "Open Yard": <Trees width={15} className="text-[#83764F]" />,
}

const companyKeys = Array.from(
    new Set(
        chartData.flatMap((d) =>
            Object.keys(d).filter((k) => !["category", "total"].includes(k))
        )
    )
)

const X_MAX = 600

const dataWithRemaining = chartData.map((d) => ({
    ...d,
    remaining: Math.max(0, X_MAX - (d.total as number)),
}))

function PillSegment(props: any) {
    const { x, y, width, height, fill } = props
    const rx = height / 2
    return (
        <rect x={x} y={y} width={width} height={height} rx={rx} ry={rx} fill={fill} />
    )
}

function RemainingSegment(props: any) {
    const { x, y, width, height } = props
    const rx = height / 2
    return (
        <rect x={x} y={y} width={width} height={height} rx={rx} ry={rx} fill="url(#diagonalHatch)" />
    )
}

export default function ApplicationsByPlotsChart() {
    const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)
    const [hoveredKey, setHoveredKey] = useState<string | null>(null)

    return (
        <Card className="py-2 w-xl" onMouseLeave={() => { setHoveredKey(null); setHoveredCategory(null) }}>
            <CardHeader className="p-2">
                <CardTitle className="text-balance">Applications by Plots</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width={500} height={400} className={"px-0"}>
                    <BarChart data={dataWithRemaining} layout="vertical">
                        <defs>
                            <pattern
                                id="diagonalHatch"
                                width="8"
                                height="8"
                                patternUnits="userSpaceOnUse"
                                patternTransform="rotate(-45)"
                            >
                                <line x1="0" y1="0" x2="0" y2="8" stroke="#d4d4d8" strokeWidth="2" />
                            </pattern>
                            <div className="text-black">hshsh</div>
                        </defs>


                        <CartesianGrid strokeDasharray="5 5" horizontal={false} />
                        <XAxis type="number" domain={[0, X_MAX]} axisLine={false} tickLine={false} />
                        <YAxis dataKey="null" type="category" axisLine={false} tickLine={false} />
                        {/* Actual totals (collapsed mode) */}
                        {!hoveredCategory && (
                            <Bar
                                dataKey="total"
                                barSize={20}
                                stackId="companies"
                                shape={<PillSegment />}
                                isAnimationActive={false}
                                onMouseEnter={(data) => setHoveredCategory(data.category)}
                            >
                                {dataWithRemaining.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={rowColor[entry.category]} />
                                ))}
                                <LabelList
                                    dataKey="category"
                                    position="top"
                                    content={({ x, y, value }) => {
                                        if (!value) return null

                                        return (
                                            <g transform={`translate(${x},${y})`} >
                                                <foreignObject x={-20} y={-10} width={40} height={40} className=" flex items-center justify-center ">
                                                    <div className="rounded-full bg-[#F5F2E6] p-1 flex items-center justify-center size-8">
                                                        {iconMap[value]}
                                                    </div>
                                                </foreignObject>
                                                <text
                                                    x={25}
                                                    y={12}
                                                    textAnchor="start"
                                                    className="fill-foreground text-sm font-semibold"
                                                >
                                                    {value}
                                                </text>

                                            </g>
                                        )
                                    }}
                                />

                                <LabelList
                                    dataKey="total"
                                    position="right"
                                    className="fill-foreground text-sm font-semibold"
                                />
                            </Bar>
                        )}
                        <Tooltip
                            // position={{ y: -50 }}
                            cursor={{ fill: "transparent" }}
                            content={({ active, payload }) => {
                                if (!active || !payload) return null

                                // if (hoveredCategory && hoveredKey) {
                                const hoveredData = payload?.find((p) => p.dataKey === hoveredKey)
                                if (!hoveredData) return null
                                return (
                                    <div className="bg-[#852534] text-white border rounded-xl text-xs shadow p-5 text-center" >
                                        <div>{hoveredKey}</div>
                                        <div className="font-bold">{hoveredData.value}</div>
                                    </div>
                                )
                                // }
                            }}
                        />
                        {/* Breakdown per company on hover */}
                        {hoveredCategory &&
                            companyKeys.map((companyKey) => (
                                <Bar
                                    key={companyKey}
                                    dataKey={companyKey}
                                    stackId="companies"
                                    barSize={20}
                                    shape={<PillSegment />}
                                    isAnimationActive={false}
                                    onMouseEnter={() => setHoveredKey(companyKey)}
                                    onMouseLeave={() => setHoveredKey(null)}
                                >
                                    {dataWithRemaining.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={rowColor[entry.category]}
                                            fillOpacity={
                                                entry.category === hoveredCategory
                                                    ? hoveredKey === null || hoveredKey === companyKey
                                                        ? 1
                                                        : 0.7
                                                    : 0.3
                                            }
                                        />
                                    ))}
                                </Bar>
                            ))}
                        <Bar
                            dataKey="remaining"
                            barSize={20}
                            fill="url(#diagonalHatch)"
                            isAnimationActive={false}
                            stackId="companies"
                        />

                        {/* Reference marker */}
                        {dataWithRemaining.map((row) =>
                            typeof row.marker === "number" ? (
                                <ReferenceDot
                                    key={row.category}
                                    x={row.total}
                                    y={row.category}
                                    r={8}
                                    strokeWidth={3}
                                />
                            ) : null
                        )}
                    </BarChart>

                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}