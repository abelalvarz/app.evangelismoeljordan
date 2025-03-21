import React from "react";
import { ICustomStepperPanel } from "./CustomStepperPanel";

interface ICustomerStepper {
    children: React.ReactNode;
    index?: number
}

export const CustomStepper = ({ children }: ICustomerStepper) => {
    return (
        <div className='w-full bg-gray-50 mt-5 rounded-md'>
            {React.Children.map(children, (child, index) => {
                if (React.isValidElement<ICustomStepperPanel>(child)) {
                    return React.cloneElement(child, { index: index });
                }
                return child;
            })}
        </div>
    )
}