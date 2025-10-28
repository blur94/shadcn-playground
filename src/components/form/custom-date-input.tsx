"use client"

import React from "react"
import { useUncontrolled } from "@mantine/hooks"
import { Input } from "@/components/ui/input"
import { Field, FieldContent, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field"

interface CustomDateInputProps extends Omit<React.ComponentPropsWithoutRef<"input">, "value" | "onChange" | "type"> {
  label?: string
  description?: string
  error?: string
  value?: string
  onChange?: (value: string) => void
}

export const CustomDateInput = React.forwardRef<HTMLInputElement, CustomDateInputProps>(
  ({ label, description, error, value, onChange, disabled, ...props }, ref) => {
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
          type="date"
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

CustomDateInput.displayName = "CustomDateInput"
