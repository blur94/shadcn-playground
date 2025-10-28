"use client"

import React from "react"
import { useUncontrolled } from "@mantine/hooks"
import { Input } from "@/components/ui/input"
import { Field, FieldContent, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field"

interface CustomNumberInputProps extends Omit<React.ComponentPropsWithoutRef<"input">, "value" | "onChange" | "type"> {
  label?: string
  description?: string
  error?: string
  value?: number
  onChange?: (value: number) => void
}

export const CustomNumberInput = React.forwardRef<HTMLInputElement, CustomNumberInputProps>(
  ({ label, description, error, value, onChange, disabled, ...props }, ref) => {
    const [internalValue, setInternalValue] = useUncontrolled({
      value,
      defaultValue: 0,
      finalValue: 0,
      onChange,
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const numValue = e.target.value === "" ? 0 : Number.parseFloat(e.target.value)
      if (!isNaN(numValue)) {
        setInternalValue(numValue)
      }
    }

    return (
      <Field data-invalid={!!error}>
        {label && <FieldLabel htmlFor={props.id}>{label}</FieldLabel>}
        <Input
          ref={ref}
          type="number"
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

CustomNumberInput.displayName = "CustomNumberInput"
