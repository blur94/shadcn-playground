"use client";

import React from "react";
import { useUncontrolled } from "@mantine/hooks";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { cn } from "@/lib/utils";

interface RadioOption {
  label: string;
  value: string;
}

interface CustomRadioGroupInputProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "value" | "onChange"> {
  label?: string;
  description?: string;
  error?: string;
  value?: string;
  onChange?: (value: string) => void;
  data: RadioOption[];
  disabled?: boolean;
  orientation?: "vertical" | "horizontal";
  required?: boolean;
}

export const CustomRadioGroupInput = React.forwardRef<
  HTMLDivElement,
  CustomRadioGroupInputProps
>(
  (
    {
      label,
      description,
      error,
      value,
      onChange,
      data,
      disabled,
      id,
      orientation = "vertical",
      className,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useUncontrolled({
      value,
      defaultValue: "",
      finalValue: "",
      onChange,
    });

    return (
      <Field ref={ref} data-invalid={!!error} {...props}>
        {label && <FieldLabel>{label}</FieldLabel>}
        <FieldContent>
          <RadioGroup
            value={internalValue}
            onValueChange={setInternalValue}
            disabled={disabled}
            className={cn(
              orientation === "horizontal"
                ? "flex gap-4"
                : "flex flex-col gap-3",
              className
            )}
          >
            {data.map((option) => (
              <div key={option.value} className="flex items-center gap-2">
                <RadioGroupItem
                  value={option.value}
                  id={`${id}-${option.value}`}
                  disabled={disabled}
                />
                <FieldLabel htmlFor={`${id}-${option.value}`}>
                  {option.label}
                </FieldLabel>
              </div>
            ))}
          </RadioGroup>
          {description && !error && (
            <FieldDescription>{description}</FieldDescription>
          )}
          {error && <FieldError>{error}</FieldError>}
        </FieldContent>
      </Field>
    );
  }
);

CustomRadioGroupInput.displayName = "CustomRadioGroupInput";
