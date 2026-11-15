"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { FieldDef } from "../../lib/sections";
import { uploadImageFile } from "../../lib/admin-client";
import { INPUT_CLASS, LABEL_CLASS } from "./theme";

interface FieldInputProps {
  field: FieldDef;
  value: unknown;
  onChange: (value: unknown) => void;
  disabled?: boolean;
}

function isDisplayableUrl(value: string): boolean {
  return value.startsWith("/") || /^https?:\/\//i.test(value);
}

function ImageField({ value, onChange, disabled }: FieldInputProps) {
  const url = typeof value === "string" ? value : "";
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    setError("");
    setUploading(true);
    try {
      const stored = await uploadImageFile(file);
      onChange(stored.url);
    } catch (uploadError) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "The image could not be uploaded.",
      );
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div>
      {url && isDisplayableUrl(url) ? (
        <div className="overflow-hidden rounded-lg border border-line bg-black/25">
          <div className="relative aspect-[16/9] w-full">
            <Image
              src={url}
              alt=""
              fill
              sizes="(max-width: 640px) 100vw, 560px"
              className="object-cover"
            />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-line px-3 py-2.5">
            <span className="truncate text-[11px] text-muted">{url}</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                disabled={disabled || uploading}
                className="rounded-md border border-line px-3 py-1.5 text-xs font-medium text-ink-soft transition hover:border-accent/50 hover:text-ink disabled:opacity-50"
              >
                {uploading ? "Uploading…" : "Replace"}
              </button>
              <button
                type="button"
                onClick={() => onChange("")}
                disabled={disabled || uploading}
                className="rounded-md border border-red-400/20 px-3 py-1.5 text-xs font-medium text-red-200 transition hover:bg-red-500/10 disabled:opacity-50"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={disabled || uploading}
          className="flex w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-line-strong bg-white/[0.02] px-4 py-8 text-center transition hover:border-accent/50 hover:bg-accent/5 disabled:opacity-50"
        >
          <span className="text-2xl" aria-hidden>
            🖼️
          </span>
          <span className="text-sm font-medium text-ink">
            {uploading ? "Uploading image…" : "Upload an image"}
          </span>
          <span className="text-[11px] text-muted">
            JPG, PNG, WebP or GIF · resized automatically
          </span>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(event) => handleFile(event.target.files?.[0])}
      />

      <input
        type="text"
        value={url}
        onChange={(event) => onChange(event.target.value)}
        placeholder="…or paste an image URL"
        className={`${INPUT_CLASS} mt-2 text-xs`}
        disabled={disabled}
      />

      {error && <p className="mt-2 text-xs text-red-300">{error}</p>}
    </div>
  );
}

export default function FieldInput({
  field,
  value,
  onChange,
  disabled,
}: FieldInputProps) {
  const label = (
    <label className={LABEL_CLASS} htmlFor={`field-${field.key}`}>
      {field.label}
      {field.required && <span className="ml-1 text-gold">*</span>}
    </label>
  );

  const help = field.help ? (
    <p className="mt-1.5 text-[11px] leading-relaxed text-muted/80">
      {field.help}
    </p>
  ) : null;

  if (field.type === "image") {
    return (
      <div>
        {label}
        <ImageField
          field={field}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
        {help}
      </div>
    );
  }

  if (field.type === "textarea") {
    return (
      <div>
        {label}
        <textarea
          id={`field-${field.key}`}
          value={typeof value === "string" ? value : String(value ?? "")}
          onChange={(event) => onChange(event.target.value)}
          rows={field.rows ?? 3}
          required={field.required}
          placeholder={field.placeholder}
          disabled={disabled}
          className={`${INPUT_CLASS} resize-y`}
        />
        {help}
      </div>
    );
  }

  if (field.type === "select") {
    return (
      <div>
        {label}
        <select
          id={`field-${field.key}`}
          value={typeof value === "string" ? value : ""}
          onChange={(event) => onChange(event.target.value)}
          required={field.required}
          disabled={disabled}
          className={`${INPUT_CLASS} appearance-none`}
        >
          {!field.required && <option value="">— None —</option>}
          {field.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {help}
      </div>
    );
  }

  if (field.type === "number") {
    return (
      <div>
        {label}
        <input
          id={`field-${field.key}`}
          type="number"
          value={typeof value === "number" ? value : String(value ?? "")}
          onChange={(event) => onChange(event.target.value)}
          min={field.min}
          max={field.max}
          required={field.required}
          placeholder={field.placeholder}
          disabled={disabled}
          className={INPUT_CLASS}
        />
        {help}
      </div>
    );
  }

  if (field.type === "tags") {
    const text = Array.isArray(value)
      ? value.join(", ")
      : typeof value === "string"
        ? value
        : "";
    return (
      <div>
        {label}
        <input
          id={`field-${field.key}`}
          type="text"
          value={text}
          onChange={(event) => onChange(event.target.value)}
          required={field.required}
          placeholder={field.placeholder ?? "One, Two, Three"}
          disabled={disabled}
          className={INPUT_CLASS}
        />
        {help}
      </div>
    );
  }

  return (
    <div>
      {label}
      <input
        id={`field-${field.key}`}
        type="text"
        value={typeof value === "string" ? value : String(value ?? "")}
        onChange={(event) => onChange(event.target.value)}
        required={field.required}
        placeholder={field.placeholder}
        disabled={disabled}
        className={INPUT_CLASS}
      />
      {help}
    </div>
  );
}
