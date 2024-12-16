import React, { useState } from "react";
import { useForm } from "react-hook-form";
import FormItem from "./FormItem";
import CustomButton from "./CustomButton";

export default function Form({
    formProps: { fields, formClassName },
    defaultValues,
    submit,
    btnText,
    textColor
}) {
    const { control, handleSubmit } = useForm({ defaultValues });
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = (data) => {
        setIsLoading(true);
        submit(data, setIsLoading);
    };

    return (
        <>
            {fields.map((field, index) => (
                <FormItem formField={field} formControl={control} key={index} textColor={textColor} />
            ))}
            <CustomButton
                text={btnText}
                spinner={isLoading}
                onClick={handleSubmit(onSubmit)}
            />
        </>
    );
}
