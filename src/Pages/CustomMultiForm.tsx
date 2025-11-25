import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';

import customForm from '../data/form.json'


// type FormKeys = keyof typeof customForm.form;
type FormDataType = {
    [key: string]: Array<{ [field: string]: string | File | null }> | { [field: string]: string | File | null }
};
type ErrorType = {
    [key: string]: Array<{ [field: string]: string }> | { [field: string]: string }
};
interface TabProps {
    steps: [string, { tabName: string, }][];
    currentTab: number;
};

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
const CustomMultiForm = () => {
    const [currentTab, setCurrentTab] = useState<number>(0);
    const [formData, setFormData] = useState<FormDataType>({});
    const [errors, setErrors] = useState<ErrorType>({})
    const steps = Object.entries(customForm.form);
    const [currentKey, currentForm] = steps[currentTab];
    const isLastKey = currentTab >= Object.keys(customForm.form).length - 1
    const handleNext = () => {
        if (isLastKey) return;
        if (isValidate()) return;
        setCurrentTab((prev) => prev + 1);
        console.log(formData);

    }

    const handlePrev = () => {
        if (currentTab > 0) {
            setCurrentTab((prev) => prev - 1)
        }

    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        index?: number
    ) => {
        const { name, value, type } = e.target;

        const isFile = type === "file";
        const file = isFile ? (e.target as HTMLInputElement).files?.[0] || null : null;

        // If repeatable section (like education)
        if (currentForm.repeatable) {
            setFormData((prev) => {
                const items = Array.isArray(prev[currentKey]) ? prev[currentKey] : [{}];

                const updatedItem = {
                    ...items[index || 0],
                    [name]: isFile ? file : value,
                };

                items[index || 0] = updatedItem;

                return {
                    ...prev,
                    [currentKey]: [...items],
                };
            });

            return;
        }

        // Normal non-repeatable case
        setFormData((prev) => ({
            ...prev,
            [currentKey]: {
                ...(prev[currentKey] || {}),
                [name]: isFile ? file : value,
            },
        }));
    };


    const isValidate = () => {
        const newErrors: any = {};

        const isRepeatable = currentForm.repeatable;
        const fields = currentForm.fields;
        const formFields = formData[currentKey]; // data of current step

        fields.forEach((item) => {
            if (!item.required) return;

            // ---------- CASE 1: REPEATABLE FIELDS ----------
            if (isRepeatable) {
                const repeatArray = formFields[item.name]; // array of objects

                if (!Array.isArray(repeatArray) || repeatArray.length === 0) {
                    newErrors[item.name] = `${item.name} is required`;
                    return;
                }

                // validate each row inside repeatable list
                repeatArray.forEach((row: any, index: number) => {
                    if (!row[item.name] || row[item.name].toString().trim() === "") {
                        if (!newErrors[item.name]) newErrors[item.name] = {};
                        newErrors[item.name][index] = `${item.name} is required`;
                    }
                });

            } else {
                // ---------- CASE 2: NORMAL FIELDS ----------
                const value = formFields[item.name];

                if (value === undefined || value.toString().trim() === "") {
                    newErrors[item.name] = `${item.name} is required`;
                }
            }
        });

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    console.log(currentKey, 'currentKey');
    console.log(errors, 'errors');
    return (
        <div className='h-auto form-container mt-10'>
            <Tabs currentTab={currentTab} steps={steps} />

            <form className='mt-5'>

                {currentForm.repeatable ? (formData[currentKey]?.map((item, index) => (
                    <div key={index}>
                        <h2 className='text-2xl font-bold'>{currentForm.tabName}</h2>

                        <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            {currentForm.fields.map((field) => (
                                <Fields
                                    key={field.name}
                                    field={field}
                                    handleChange={(e) => handleChange(e, index)}
                                    formData={formData}
                                    currentKey={currentKey}
                                    index={index}
                                    errors={errors}
                                />
                            ))}
                        </div>
                    </div>
                ))
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {currentForm.fields.map((field) => (
                            <Fields
                                key={field.name}
                                field={field}
                                handleChange={handleChange}
                                formData={formData}
                                currentKey={currentKey}
                                errors={errors}
                            />
                        ))}
                    </div>
                )}
                {currentForm.repeatable && (
                    <div className='flex justify-end'>
                        <button
                            type='button'
                            className='btn bg-green-400 mt-5'
                            onClick={() => {
                                setFormData((prev) => ({
                                    ...prev,
                                    [currentKey]: [
                                        ...(prev[currentKey] || []),
                                        {}
                                    ]
                                }));
                            }}
                        >
                            <PlusCircle /> Add
                        </button>
                    </div>
                )}
                <div className='flex justify-between mt-5'>
                    <button type='button' disabled={currentTab == 0} className={`${currentTab == 0 ? 'bg-gray-300' : 'bg-black'} btn`} onClick={() => handlePrev()}>
                        prev
                    </button>
                    {isLastKey ? (
                        <button type='submit' className={`btn bg-blue-500`} >
                            Submit
                        </button>
                    ) : (
                        <button type='button' className={`btn bg-blue-500`} onClick={() => handleNext()}>
                            Next
                        </button>
                    )}

                </div>
            </form>

        </div>
    )
}

export default CustomMultiForm;



const Fields: React.FC<FieldsProps> = ({ field, handleChange, formData, currentKey, index, errors }) => {

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
                    <p>{getError()}</p>
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
    const getError = () => {
        if (Array.isArray(errors[currentKey])) {
            return errors[currentKey][index!]?.[field.name] || "";
        }
        return errors[currentKey]?.[field.name] || "";
    };

    console.log()
    return (
        <div key={field.name}>
            {renderField()}
        </div>
    )
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