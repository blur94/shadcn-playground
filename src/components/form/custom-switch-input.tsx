"use client"

import React from "react"
import { useUncontrolled } from "@mantine/hooks"
import { Switch } from "@/components/ui/switch"
import { Field, FieldContent, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field"

interface CustomSwitchInputProps extends Omit<React.ComponentPropsWithoutRef<"button">, "value" | "onChange"> {
  label?: string
  description?: string
  error?: string
  value?: boolean
  onChange?: (value: boolean) => void
  disabled?: boolean
}

export const CustomSwitchInput = React.forwardRef<HTMLButtonElement, CustomSwitchInputProps>(
  ({ label, description, error, value, onChange, disabled, id, ...props }, ref) => {
    const [internalValue, setInternalValue] = useUncontrolled({
      value,
      defaultValue: false,
      finalValue: false,
      onChange,
    })

    const handleChange = (checked: boolean) => {
      setInternalValue(checked)
    }

    return (
      <Field orientation="horizontal" data-invalid={!!error}>
        <Switch
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
              {description && !error && <FieldDescription>{description}</FieldDescription>}
              {error && <FieldError>{error}</FieldError>}
            </>
          )}
        </FieldContent>
      </Field>
    )
  },
)

CustomSwitchInput.displayName = "CustomSwitchInput"
