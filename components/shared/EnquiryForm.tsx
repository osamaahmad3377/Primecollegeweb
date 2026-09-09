"use client";

import { useId, useRef, useState } from "react";
import { Check, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/shared/FormField";
import { ContentNotice } from "@/components/ui/ContentNotice";
import {
  enquiryTypes,
  submitEnquiry,
  validateEnquiry,
  type EnquiryPayload,
  type FieldErrors,
} from "@/lib/forms";

const EMPTY: EnquiryPayload = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
  source: "contact",
};

interface EnquiryFormProps {
  /** "contact" collects an enquiry type; "application" a program of interest. */
  variant?: "contact" | "application";
  /** Options for the select. Defaults to the standard enquiry types. */
  options?: readonly string[];
  subjectLabel?: string;
}

export function EnquiryForm({
  variant = "contact",
  options = enquiryTypes,
  subjectLabel,
}: EnquiryFormProps) {
  const [values, setValues] = useState<EnquiryPayload>({
    ...EMPTY,
    source: variant,
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const formId = useId();
  const summaryRef = useRef<HTMLDivElement>(null);

  const label =
    subjectLabel ??
    (variant === "application" ? "Program of interest" : "Enquiry type");

  function update<K extends keyof EnquiryPayload>(key: K, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
    /* Clear a field's error as soon as the visitor starts correcting it. */
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const found = validateEnquiry(values);
    setErrors(found);

    if (Object.values(found).some(Boolean)) {
      /* Move focus to the summary so screen reader users hear the problem. */
      summaryRef.current?.focus();
      return;
    }

    setStatus("sending");
    const result = await submitEnquiry(values);
    setStatus(result.ok ? "done" : "idle");
  }

  if (status === "done") {
    return (
      <div
        role="status"
        className="border border-ink/12 bg-cream px-6 py-12 text-center sm:px-10"
      >
        <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-navy">
          <Check aria-hidden="true" strokeWidth={1.5} className="size-6 text-gold-light" />
        </span>
        <h3 className="mt-6 headline text-subtitle text-navy">
          Your details were captured
        </h3>
        <p className="mx-auto mt-3 max-w-[46ch] text-base text-muted">
          Thank you, {values.name.split(" ")[0] || "there"}.
        </p>
        <div className="mx-auto mt-8 max-w-[52ch] text-left">
          <ContentNotice>
            <strong className="font-semibold text-navy">
              This form is not yet connected.
            </strong>{" "}
            Nothing has been sent to the college and no one has received your
            message. The submission endpoint must be connected before this site
            goes live. In the meantime, please contact the college directly.
          </ContentNotice>
        </div>
        <button
          type="button"
          onClick={() => {
            setValues({ ...EMPTY, source: variant });
            setStatus("idle");
          }}
          className="mt-8 text-xs font-semibold uppercase tracking-[0.14em] text-navy underline decoration-gold underline-offset-4 hover:text-gold-deep"
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  const errorList = Object.entries(errors).filter(([, value]) => Boolean(value));

  return (
    <form onSubmit={onSubmit} noValidate className="w-full">
      {/* Error summary — the standard accessible pattern for form errors. */}
      <div
        ref={summaryRef}
        tabIndex={-1}
        role={errorList.length ? "alert" : undefined}
        className={errorList.length ? "mb-8 border-l-2 border-red-700 bg-red-50 py-4 pl-5 pr-4" : "sr-only"}
      >
        {errorList.length ? (
          <>
            <p className="text-sm font-semibold text-red-800">
              There{" "}
              {errorList.length === 1
                ? "is 1 problem"
                : `are ${errorList.length} problems`}{" "}
              with your enquiry
            </p>
            <ul className="mt-2 space-y-1">
              {errorList.map(([field, message]) => (
                <li key={field}>
                  <a
                    href={`#${formId}-${field}`}
                    className="text-sm text-red-800 underline underline-offset-4"
                  >
                    {message}
                  </a>
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <FormField
          id={`${formId}-name`}
          label="Full name"
          required
          error={errors.name}
        >
          {(props) => (
            <input
              {...props}
              type="text"
              name="name"
              autoComplete="name"
              value={values.name}
              onChange={(e) => update("name", e.target.value)}
            />
          )}
        </FormField>

        <FormField
          id={`${formId}-email`}
          label="Email address"
          required
          error={errors.email}
        >
          {(props) => (
            <input
              {...props}
              type="email"
              name="email"
              autoComplete="email"
              inputMode="email"
              value={values.email}
              onChange={(e) => update("email", e.target.value)}
            />
          )}
        </FormField>

        <FormField id={`${formId}-phone`} label="Phone" error={errors.phone}>
          {(props) => (
            <input
              {...props}
              type="tel"
              name="phone"
              autoComplete="tel"
              inputMode="tel"
              value={values.phone}
              onChange={(e) => update("phone", e.target.value)}
            />
          )}
        </FormField>

        <FormField
          id={`${formId}-subject`}
          label={label}
          required
          error={errors.subject}
        >
          {(props) => (
            <select
              {...props}
              name="subject"
              value={values.subject}
              onChange={(e) => update("subject", e.target.value)}
            >
              <option value="">Please choose…</option>
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}
        </FormField>

        <FormField
          id={`${formId}-message`}
          label="Your message"
          required
          error={errors.message}
          className="sm:col-span-2"
        >
          {(props) => (
            <textarea
              {...props}
              name="message"
              rows={6}
              maxLength={2000}
              value={values.message}
              onChange={(e) => update("message", e.target.value)}
              className={`${props.className} resize-y`}
            />
          )}
        </FormField>
      </div>

      <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" size="lg" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send Enquiry"}
          <Send aria-hidden="true" strokeWidth={1.5} className="size-4" />
        </Button>
        <p className="text-sm text-muted">
          We will use your details only to respond to this enquiry. See our{" "}
          <a
            href="/privacy-policy"
            className="text-navy underline decoration-gold underline-offset-4 hover:text-gold-deep"
          >
            Privacy Policy
          </a>
          .
        </p>
      </div>

      <ContentNotice className="mt-8">
        This form is a front-end placeholder. It is not connected to a mail
        service or CRM and does not transmit anything. [CONNECT THE SUBMISSION
        ENDPOINT BEFORE PUBLICATION.]
      </ContentNotice>
    </form>
  );
}
