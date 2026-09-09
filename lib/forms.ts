/* ==========================================================================
   FORM PLUMBING
   --------------------------------------------------------------------------
   There is no backend yet. Nothing here transmits data anywhere.

   `submitEnquiry` is the single seam where a real API call belongs. When an
   endpoint exists, replace the body of that function with a fetch to it — the
   forms, validation and UI states will keep working unchanged.
   ========================================================================== */

export interface EnquiryPayload {
  name: string;
  email: string;
  phone: string;
  /** Enquiry type on the contact form, program of interest on the apply form. */
  subject: string;
  message: string;
  /** Which form the submission came from. */
  source: "contact" | "application";
}

export type SubmitResult =
  | { ok: true }
  | { ok: false; message: string };

/**
 * PLACEHOLDER SUBMISSION HANDLER.
 *
 * Deliberately does NOT send the enquiry anywhere, and says so in the UI, so
 * the form can never silently swallow a prospective student's message.
 *
 * To connect a real endpoint:
 *   const res = await fetch(process.env.NEXT_PUBLIC_ENQUIRY_ENDPOINT!, {
 *     method: "POST",
 *     headers: { "Content-Type": "application/json" },
 *     body: JSON.stringify(payload),
 *   });
 *   return res.ok ? { ok: true } : { ok: false, message: "…" };
 */
export async function submitEnquiry(
  payload: EnquiryPayload,
): Promise<SubmitResult> {
  if (process.env.NODE_ENV === "development") {
    console.info("[Prime] Enquiry captured locally (not sent):", payload);
  }

  /* Simulates the latency of a real request so the pending state is visible. */
  await new Promise((resolve) => setTimeout(resolve, 700));

  return { ok: true };
}

export type FieldErrors = Partial<Record<keyof EnquiryPayload, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Client-side validation. When a backend is added this must be repeated
 * server-side — client validation is a usability feature, never a security
 * control.
 */
export function validateEnquiry(payload: EnquiryPayload): FieldErrors {
  const errors: FieldErrors = {};

  if (!payload.name.trim()) {
    errors.name = "Please enter your name.";
  } else if (payload.name.trim().length > 100) {
    errors.name = "Please keep your name under 100 characters.";
  }

  if (!payload.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!EMAIL_PATTERN.test(payload.email.trim())) {
    errors.email = "Please enter a valid email address, for example name@example.com.";
  }

  /* Phone is optional, but if given it should look plausible. */
  if (payload.phone.trim() && !/^[\d\s()+-]{6,20}$/.test(payload.phone.trim())) {
    errors.phone = "Please enter a valid phone number, or leave this blank.";
  }

  if (!payload.subject.trim()) {
    errors.subject = "Please choose an option.";
  }

  if (!payload.message.trim()) {
    errors.message = "Please tell us how we can help.";
  } else if (payload.message.trim().length > 2000) {
    errors.message = "Please keep your message under 2000 characters.";
  }

  return errors;
}

export const enquiryTypes = [
  "General enquiry",
  "Program information",
  "Admissions and applications",
  "International students",
  "Student support",
  "Something else",
] as const;
