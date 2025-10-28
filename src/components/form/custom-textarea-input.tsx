"use client"

import React from "react"
import { useUncontrolled } from "@mantine/hooks"
import { Textarea } from "@/components/ui/textarea"
import { Field, FieldContent, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field"

interface CustomTextareaInputProps extends Omit<React.ComponentPropsWithoutRef<"textarea">, "value" | "onChange"> {
  label?: string
  description?: string
  error?: string
  value?: string
  onChange?: (value: string) => void
}

export const CustomTextareaInput = React.forwardRef<HTMLTextAreaElement, CustomTextareaInputProps>(
  ({ label, description, error, value, onChange, disabled, ...props }, ref) => {
    const [internalValue, setInternalValue] = useUncontrolled({
      value,
      defaultValue: "",
      finalValue: "",
      onChange,
    })

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setInternalValue(e.target.value)
    }

    return (
      <Field data-invalid={!!error}>
        {label && <FieldLabel htmlFor={props.id}>{label}</FieldLabel>}
        <Textarea
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

CustomTextareaInput.displayName = "CustomTextareaInput"
