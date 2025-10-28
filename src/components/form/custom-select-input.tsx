"use client"

import React, { useState } from "react"
import { useUncontrolled } from "@mantine/hooks"
import { Field, FieldContent, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"

interface SelectOption {
  label: string
  value: string
}

interface CustomSelectInputProps extends Omit<React.ComponentPropsWithoutRef<"button">, "value" | "onChange"> {
  label?: string
  description?: string
  error?: string
  value?: string
  onChange?: (value: string) => void
  data: SelectOption[]
  searchable?: boolean
  placeholder?: string
  nothingFound?: string
  disabled?: boolean
  required?: boolean
}

export const CustomSelectInput = React.forwardRef<HTMLButtonElement, CustomSelectInputProps>(
  (
    {
      label,
      description,
      error,
      value,
      onChange,
      data,
      searchable = false,
      placeholder = "Select an option",
      nothingFound = "No options found",
      disabled,
      required,
      id,
      className,
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = useUncontrolled({
      value,
      defaultValue: "",
      finalValue: "",
      onChange,
    })

    const [isOpen, setIsOpen] = useState(false)
    const [searchValue, setSearchValue] = useState("")

    const selectedOption = data.find((opt) => opt.value === internalValue)
    const filteredData = searchable
      ? data.filter((opt) => opt.label.toLowerCase().includes(searchValue.toLowerCase()))
      : data

    const handleSelect = (optionValue: string) => {
      setInternalValue(optionValue)
      setIsOpen(false)
      setSearchValue("")
    }

    return (
      <Field data-invalid={!!error}>
        {label && <FieldLabel htmlFor={id}>{label}</FieldLabel>}
        <div className="relative">
          <button
            ref={ref}
            id={id}
            type="button"
            onClick={() => !disabled && setIsOpen(!isOpen)}
            disabled={disabled}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            aria-invalid={!!error}
            className={cn(
              "w-full px-3 py-2 rounded-md border border-input bg-background text-sm",
              "flex items-center justify-between",
              "hover:bg-accent/50 disabled:opacity-50 disabled:cursor-not-allowed",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
              error && "border-destructive",
              className,
            )}
            {...props}
          >
            <span className={cn(!selectedOption && "text-muted-foreground")}>
              {selectedOption?.label || placeholder}
            </span>
            <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
          </button>

          {isOpen && (
            <div className="absolute top-full left-0 right-0 z-50 mt-1 border border-input rounded-md bg-background shadow-md">
              {searchable && (
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="w-full px-3 py-2 border-b border-input text-sm focus:outline-none"
                  autoFocus
                />
              )}
              <div className="max-h-48 overflow-y-auto">
                {filteredData.length > 0 ? (
                  filteredData.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleSelect(option.value)}
                      className={cn(
                        "w-full px-3 py-2 text-left text-sm hover:bg-accent",
                        internalValue === option.value && "bg-primary text-primary-foreground",
                      )}
                    >
                      {option.label}
                    </button>
                  ))
                ) : (
                  <div className="px-3 py-2 text-sm text-muted-foreground">{nothingFound}</div>
                )}
              </div>
            </div>
          )}
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

CustomSelectInput.displayName = "CustomSelectInput"
