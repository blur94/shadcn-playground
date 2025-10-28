"use client"

import React from "react"
import { useUncontrolled } from "@mantine/hooks"
import { Field, FieldContent, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field"
import { cn } from "@/lib/utils"
import { Upload } from "lucide-react"

interface CustomFileInputProps extends Omit<React.ComponentPropsWithoutRef<"input">, "value" | "onChange" | "type"> {
  label?: string
  description?: string
  error?: string
  value?: File | null
  onChange?: (file: File | null) => void
  disabled?: boolean
}

export const CustomFileInput = React.forwardRef<HTMLInputElement, CustomFileInputProps>(
  ({ label, description, error, value, onChange, disabled, id, className, ...props }, ref) => {
    const [internalValue, setInternalValue] = useUncontrolled({
      value,
      defaultValue: null,
      finalValue: null,
      onChange,
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] || null
      setInternalValue(file)
    }

    return (
      <Field data-invalid={!!error}>
        {label && <FieldLabel htmlFor={id}>{label}</FieldLabel>}
        <div
          className={cn(
            "relative border-2 border-dashed rounded-md p-6 text-center",
            "hover:bg-accent/50 transition-colors",
            disabled && "opacity-50 cursor-not-allowed",
            error ? "border-destructive" : "border-input",
            className,
          )}
        >
          <input
            ref={ref}
            id={id}
            type="file"
            onChange={handleChange}
            disabled={disabled}
            aria-invalid={!!error}
            className="absolute inset-0 opacity-0 cursor-pointer"
            {...props}
          />
          <div className="flex flex-col items-center gap-2 pointer-events-none">
            <Upload className="h-8 w-8 text-muted-foreground" />
            <div className="text-sm">
              {internalValue ? (
                <p className="font-medium text-foreground">{internalValue.name}</p>
              ) : (
                <>
                  <p className="font-medium text-foreground">Click to upload or drag and drop</p>
                  <p className="text-xs text-muted-foreground">{props.accept || "Any file type"}</p>
                </>
              )}
            </div>
          </div>
        </div>
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

CustomFileInput.displayName = "CustomFileInput"
