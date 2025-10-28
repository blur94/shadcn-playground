"use client";

import { isEmail, isInRange, isNotEmpty, useForm } from "@mantine/form";
import { Button } from "@/components/ui/button";
import {
  CustomTextInput,
  CustomSelectInput,
  CustomCheckboxInput,
  CustomSwitchInput,
  CustomRadioGroupInput,
  CustomFileInput,
  CustomTextareaInput,
  CustomNumberInput,
  CustomDateInput,
} from "@/components/form";

export default function FormExample() {
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      country: "",
      subscribe: false,
      notifications: true,
      role: "",
      avatar: null as File | null,
      bio: "",
      age: 0,
      birthDate: "",
    },
    validate: {
      name: (value) => (!value ? "Name is required" : null),
      email:
        isNotEmpty("Email is required") || isEmail("Invalid email address"),
      country: (value) => (!value ? "Country is required" : null),
      role: (value) => (!value ? "Role is required" : null),
      bio: isNotEmpty("Bio cannot be empty"),
      age:
        isInRange({ min: 1, max: 120 }, "Age must be between 1 and 120") ||
        isNotEmpty("Age is required"),
    },
  });

  const handleSubmit = form.onSubmit((values) => {
    console.log("Form values:", values);
    alert(JSON.stringify(values, null, 2));
  });

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Form Components Example</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Text Input */}
          <CustomTextInput
            id="name"
            label="Full Name"
            placeholder="John Doe"
            description="Enter your full name"
            required
            {...form.getInputProps("name")}
          />

          {/* Email Input */}
          <CustomTextInput
            id="email"
            label="Email"
            type="email"
            placeholder="john@example.com"
            description="We'll never share your email"
            required
            {...form.getInputProps("email")}
          />

          {/* Select Input */}
          <CustomSelectInput
            id="country"
            label="Country"
            placeholder="Select a country"
            searchable
            data={[
              { label: "United States", value: "us" },
              { label: "Canada", value: "ca" },
              { label: "United Kingdom", value: "uk" },
              { label: "Australia", value: "au" },
              { label: "Germany", value: "de" },
              { label: "France", value: "fr" },
            ]}
            required
            {...form.getInputProps("country")}
          />

          {/* Checkbox Input */}
          <CustomCheckboxInput
            id="subscribe"
            label="Subscribe to newsletter"
            description="Get updates about new features"
            {...form.getInputProps("subscribe")}
          />

          {/* Switch Input */}
          <CustomSwitchInput
            id="notifications"
            label="Enable notifications"
            description="Receive push notifications"
            {...form.getInputProps("notifications")}
          />

          {/* Radio Group Input */}
          <CustomRadioGroupInput
            id="role"
            label="Select your role"
            data={[
              { label: "User", value: "user" },
              { label: "Admin", value: "admin" },
              { label: "Moderator", value: "moderator" },
            ]}
            required
            orientation="horizontal"
            {...form.getInputProps("role")}
          />

          {/* File Input */}
          <CustomFileInput
            id="avatar"
            label="Upload Avatar"
            description="PNG, JPG up to 5MB"
            accept="image/*"
            {...form.getInputProps("avatar")}
          />

          {/* Textarea Input */}
          <CustomTextareaInput
            id="bio"
            label="Bio"
            placeholder="Tell us about yourself..."
            description="Maximum 500 characters"
            rows={10}
            {...form.getInputProps("bio")}
          />

          {/* Number Input */}
          <CustomNumberInput
            id="age"
            label="Age"
            placeholder="25"
            min={0}
            max={120}
            {...form.getInputProps("age")}
          />

          {/* Date Input */}
          <CustomDateInput
            id="birthDate"
            label="Birth Date"
            {...form.getInputProps("birthDate")}
          />

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">
              Submit
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
              className="flex-1"
            >
              Reset
            </Button>
          </div>
        </form>

        {/* Documentation */}
        <div className="mt-12 p-6 bg-card rounded-lg border border-border">
          <h2 className="text-xl font-bold mb-4">How It Works</h2>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>
              <strong>useUncontrolled:</strong> Each component uses Mantine's
              useUncontrolled hook to support both controlled and uncontrolled
              modes. This allows the component to work standalone or integrate
              with Mantine's useForm.
            </p>
            <p>
              <strong>Mantine Integration:</strong> The form.getInputProps()
              method spreads value and onChange props directly into the
              components, enabling seamless two-way binding.
            </p>
            <p>
              <strong>Type Safety:</strong> All components are fully typed with
              TypeScript, ensuring proper type inference for values and
              callbacks.
            </p>
            <p>
              <strong>Accessibility:</strong> Components include proper ARIA
              attributes, labels, and error messaging for screen readers and
              keyboard navigation.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
