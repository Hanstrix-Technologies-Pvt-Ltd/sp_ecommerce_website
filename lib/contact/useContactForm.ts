"use client";

import { useCallback, useRef, useState } from "react";
import {
  CONTACT_HONEYPOT_FIELD,
  ContactFormValues,
  ContactFormErrors,
  hasContactFormErrors,
  normalizeFormValues,
  validateContactForm,
} from "./form";

type SubmitStatus = "idle" | "submitting" | "success" | "error";

export function useContactForm() {
  const [values, setValues] = useState<ContactFormValues>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [feedback, setFeedback] = useState<string | null>(null);

  const honeypotRef = useRef("");
  const startedAtRef = useRef(Date.now());

  const onFieldChange = useCallback(
    (field: keyof ContactFormValues) =>
      (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = event.target.value;
        setValues((prev) => ({ ...prev, [field]: value }));

        if (errors[field]) {
          setErrors((prev) => ({ ...prev, [field]: undefined }));
        }

        if (status !== "idle") {
          setStatus("idle");
          setFeedback(null);
        }
      },
    [errors, status],
  );

  const resetForm = useCallback(() => {
    setValues({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
    setErrors({});
    startedAtRef.current = Date.now();
    honeypotRef.current = "";
  }, []);

  const handleSubmit = useCallback(
    async (event?: React.FormEvent<HTMLFormElement>) => {
      event?.preventDefault();
      const normalizedValues = normalizeFormValues(values);
      const validationErrors = validateContactForm(normalizedValues);

      if (hasContactFormErrors(validationErrors)) {
        setErrors(validationErrors);
        setStatus("error");
        setFeedback("Please fix the highlighted fields.");
        return;
      }

      setStatus("submitting");
      setFeedback(null);

      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...normalizedValues,
            honeypot: honeypotRef.current,
            durationMs: Date.now() - startedAtRef.current,
          }),
        });

        const result = (await response.json()) as { success?: boolean; message?: string; errors?: ContactFormErrors };

        if (!response.ok || !result?.success) {
          if (result?.errors) {
            setErrors(result.errors);
          }

          setStatus("error");
          setFeedback(result?.message || "Something went wrong. Please try again.");
          return;
        }

        setStatus("success");
        setFeedback("Thanks! We received your request.");
        resetForm();
      } catch {
        setStatus("error");
        setFeedback("Unable to submit right now. Please try again later.");
      } finally {
        startedAtRef.current = Date.now();
      }
    },
    [resetForm, values],
  );

  return {
    values,
    errors,
    status,
    feedback,
    onFieldChange,
    handleSubmit,
    honeypotName: CONTACT_HONEYPOT_FIELD,
    setHoneypotValue: (value: string) => {
      honeypotRef.current = value;
    },
  };
}
