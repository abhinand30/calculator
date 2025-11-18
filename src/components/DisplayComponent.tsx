"use client"

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
} from "recharts"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { Building2, Factory, Trees, TruckIcon, Warehouse } from "lucide-react"
import { JSX } from "react"

type Row = {
    category: string
    total: number
    marker?: number
    [company: string]: number | string | undefined
}


const chartData: Row[] = [
    { category: "Logistics", "Company A": 120, "Company B": 80, "Company C": 250, total: 450, marker: 200 },
    { category: "Commercial", "Company A": 150, "Company D": 225, total: 375, marker: 330 },
    { category: "Industrial", "Company B": 200, "Company C": 180, "Company E": 100, total: 480, marker: 420 },
    { category: "Open Yard", "Company F": 135, "Company A": 100, total: 235, marker: 200 },
]

const rowColor: Record<string, string> = {
    Logistics: "#f5a29f",
    Commercial: "#f8b79a",
    Industrial: "#d9c4e9",
    "Open Yard": "#d9c4e9",
}
const iconMap: Record<string, JSX.Element> = {
    Logistics: <Warehouse className="w-5 h-5 text-[#83764F]" />,
    Commercial: <Building2 className="w-5 h-5 text-gray-600" />,
    Industrial: <Factory className="w-5 h-5 text-gray-600" />,
    "Open Yard": <Trees className="w-5 h-5 text-gray-600" />,
}
const companyKeys = Array.from(
    new Set(chartData.flatMap((d) => Object.keys(d).filter((k) => k !== "category" && k !== "total" && k !== "marker"))),
)

const X_MAX = 600

const dataWithRemaining = chartData.map((d) => ({
    ...d,
    remaining: Math.max(0, X_MAX - (d.total as number)),
}))

function PillSegment(props: any) {
    const { x, y, width, height, payload, fill } = props
    const gap = 0
    const rx = height / 2
    const color = rowColor[payload.category] ?? fill
    const nx = x + gap / 2
    const nw = Math.max(0, width - gap)
    if (nw <= 0) return null
    return <rect x={nx} y={y} width={nw} height={height} rx={rx} ry={rx} fill={color} />
}

function RemainingSegment(props: any) {
    const { x, y, width, height } = props
    const gap = 8
    const rx = height / 2
    const nx = x + gap / 2
    const nw = Math.max(0, width - gap)
    if (nw <= 0) return null
    return <rect x={nx} y={y} width={nw} height={height} rx={rx} ry={rx} fill="url(#diagonalHatch)" />
}

export default function ApplicationsByPlotsChart() {
    return (
        <Card className="p-2 w-xl">
            <CardHeader className="pb-2">
                <CardTitle className="text-balance">Applications by Plots</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-auto">
                    <ChartContainer
                        className="w-full"
                        config={{ total: { label: "Total", color: "hsl(var(--foreground))" } }}
                    >
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={dataWithRemaining}
                                layout="vertical"
                                margin={{ top: 12, right: 32, left: 16, bottom: 12 }}
                            >
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
                                </defs>

                                {/* vertical grid like screenshot */}
                                <CartesianGrid strokeDasharray="10 10" horizontal={false} />

                                <XAxis
                                    type="number"
                                    domain={[0, X_MAX]}
                                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                                />
                                <YAxis
                                    dataKey="category"
                                    type="category"
                                    tick={({ x, y, payload }) => (
                                        <g transform={`translate(${x},${y})`}>
                                            {iconMap[payload.value]}
                                            <text
                                                x={24}
                                                y={5}
                                                textAnchor="start"
                                                className="fill-gray-800 font-medium text-sm"
                                            >
                                                {payload.value}
                                            </text>
                                        </g>
                                    )}
                                    width={120}
                                />

                                <Tooltip
                                    cursor={{ fill: "transparent" }}
                                    content={
                                        <ChartTooltipContent
                                            labelFormatter={(v, p) => (p && p[0] && p[0].payload?.category) || ""}
                                        //   valueFormatter={(v, name) => `${v}`}
                                        />
                                    }
                                />

                                <Bar dataKey="total" barSize={0} fill="transparent" className="flex justify-items-end fill-foreground font-semibold">
                                    <LabelList
                                        dataKey="total"
                                        position="right"

                                        formatter={(v: any) => (typeof v === "number" ? v.toString() : v)}
                                    />
                                </Bar>
                                {companyKeys.map((companyKey) => (
                                    <Bar
                                        key={companyKey}
                                        dataKey={companyKey}
                                        stackId="a"
                                        barSize={20}

                                        fill="#ddd"
                                        shape={<PillSegment />}
                                        isAnimationActive={true}
                                    />
                                ))}

                                <Bar
                                    dataKey="remaining"
                                    stackId="a"
                                    barSize={20}
                                    fill="url(#diagonalHatch)"
                                    shape={<RemainingSegment />}
                                    isAnimationActive={false}
                                />



                                {dataWithRemaining.map((row) =>
                                    typeof row.marker === "number" ? (
                                        <ReferenceDot
                                            key={row.category}
                                            x={row.marker}
                                            y={row.category}
                                            r={10}
                                            fill="white"
                                            stroke={rowColor[row.category] ?? "#e5e7eb"}
                                            strokeWidth={3}
                                        />
                                    ) : null,
                                )}
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </div>
            </CardContent>
        </Card>
    )
}
