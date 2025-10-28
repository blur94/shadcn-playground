"use client";

import React from "react";
import { useUncontrolled } from "@mantine/hooks";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";

interface CustomCheckboxInputProps
  extends Omit<
    React.ComponentPropsWithoutRef<"button">,
    "value" | "onChange" | "type"
  > {
  label?: string;
  description?: string;
  error?: string;
  value?: boolean;
  onChange?: (value: boolean) => void;
}

export const CustomCheckboxInput = React.forwardRef<
  HTMLButtonElement,
  CustomCheckboxInputProps
>(
  (
    { label, description, error, value, onChange, disabled, id, ...props },
    ref
  ) => {
    const [internalValue, setInternalValue] = useUncontrolled({
      value,
      defaultValue: false,
      finalValue: false,
      onChange,
    });

    const handleChange = (checked: boolean) => {
      setInternalValue(checked);
    };

    return (
      <Field orientation="horizontal" data-invalid={!!error}>
        <Checkbox
          ref={ref}
          id={id}
          checked={internalValue}
          onCheckedChange={handleChange}
          disabled={disabled}
          aria-invalid={!!error}
          {...props}
        />
        <FieldContent>
          {label && <FieldLabel htmlFor={id}>{label}</FieldLabel>}
          {(description || error) && (
            <>
              {description && !error && (
                <FieldDescription>{description}</FieldDescription>
              )}
              {error && <FieldError>{error}</FieldError>}
            </>
          )}
        </FieldContent>
      </Field>
    );
  }
);

CustomCheckboxInput.displayName = "CustomCheckboxInput";
