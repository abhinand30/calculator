import React from 'react'

interface TabProps {
    steps: [string, { tabName: string, }][];
    currentTab: number;
}
const Tabs: React.FC<TabProps> = ({ steps, currentTab }) => {
    return (
        <div className="flex flex-col">
            {/* circles + lines */}
            <div className="flex items-center justify-between ml-10">
                {steps.map(([key, value], index) => {
                    const isComplete = currentTab >= index;
                    const isLast = index === steps.length - 1;
                    return (
                        <div key={key} className="flex items-center flex-1">
                            <div className={`size-10 rounded-full flex items-center justify-center border ${isComplete ? "bg-green-500 text-white" : "border-gray-400"}`}>
                                {index + 1}
                            </div>
                            {!isLast && (
                                <div className={`${currentTab - 1 >= index ? "bg-green-500" : "bg-gray-300"} flex-1 h-[2px]  mx-2`}></div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* labels (separate row) */}
            <div className="flex gap-2 mt-3 justify-between ">
                {steps.map(([key, value]) => (
                    <p key={key} className="w-auto text-sm  min-w-32">
                        {value.tabName}
                    </p>
                ))}
            </div>
        </div>

    )
}

export default Tabs