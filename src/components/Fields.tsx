import React from 'react'

interface FieldsProps {
    field: {
        placeholder?: string;
        label: string;
        name: string;
        type: string;
        required: boolean;
        options?: string[];


    },
    index?: number;
    handleChange: (e: any, index?: number) => void;
    formData: any;
    currentKey: string;
}
const Fields: React.FC<FieldsProps> = ({ field, handleChange, formData, currentKey, index }) => {

    const renderField = () => {
        switch (field.type) {
            case 'text':
            case 'email':
            case 'number':
            case 'tel':
            case 'date':
            case 'file':
                return (<>
                    <p>{field.label}</p>
                    <input className='border-1 w-full p-1 rounded-sm' placeholder={field.placeholder}
                        type={field.type} name={field.name} value={getValue()} onChange={handleChange}
                    />
                </>
                )

            case 'select':
                return (<>
                    <p>{field.label}</p>
                    <select className='border-1 w-full p-1.5 rounded-sm'
                        name={field.name} value={getValue()} onChange={handleChange}>
                        {field.options.map((item) => (
                            <option key={item} value={item}>{item}</option>
                        ))}
                    </select>
                </>

                )
            case 'textarea':
                return (<>
                    <p>{field.label}</p>
                    <textarea className='h-40 w-full border-1 rounded-sm p-1'
                        placeholder={field.placeholder} name={field.name} value={getValue()} onChange={handleChange} />
                </>
                )
            case 'checkbox':
                return (
                    <>
                        <div className='flex gap-2'>
                            {field.label}
                            <input type='checkbox' value={getValue()} onChange={handleChange} />
                        </div>
                    </>
                )

        }
    };
    const getValue = () => {
        if (Array.isArray(formData[currentKey])) {
            return formData[currentKey][index!]?.[field.name] || "";
        }
        return formData[currentKey]?.[field.name] || "";
    };
    console.log()
    return (
        <div key={field.name}>

            {renderField()}
        </div>
    )
}

export default Fields