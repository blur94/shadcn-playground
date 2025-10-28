"use client"

import React from "react"
import { useUncontrolled } from "@mantine/hooks"
import { Input } from "@/components/ui/input"
import { Field, FieldContent, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field"

interface CustomTextInputProps extends Omit<React.ComponentPropsWithoutRef<"input">, "value" | "onChange"> {
  label?: string
  description?: string
  error?: string
  value?: string
  onChange?: (value: string) => void
}

export const CustomTextInput = React.forwardRef<HTMLInputElement, CustomTextInputProps>(
  ({ label, description, error, value, onChange, disabled, required, ...props }, ref) => {
    const [internalValue, setInternalValue] = useUncontrolled({
      value,
      defaultValue: "",
      finalValue: "",
      onChange,
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInternalValue(e.target.value)
    }

    return (
      <Field data-invalid={!!error}>
        {label && <FieldLabel htmlFor={props.id}>{label}</FieldLabel>}
        <Input
          ref={ref}
          value={internalValue}
          onChange={handleChange}
          disabled={disabled}
          aria-invalid={!!error}
          {...props}
        />
        {(description || error) && (
          <FieldContent>
            {description && !error && <FieldDescription>{description}</FieldDescription>}
            {error && <FieldError>{error}</FieldError>}
          </FieldContent>
        )}
      </Field>
    )
  },
)

CustomTextInput.displayName = "CustomTextInput"
