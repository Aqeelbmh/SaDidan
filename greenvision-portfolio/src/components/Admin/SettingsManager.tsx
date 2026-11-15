"use client";

import { useCallback, useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { SettingsGroupDef, SettingsKey } from "../../lib/sections";
import type { SiteSettings } from "../../lib/types";
import { apiFetch, deleteUploadedImage } from "../../lib/admin-client";
import FieldInput from "./FieldInput";
import Toast, { type ToastState } from "./Toast";
import { ACCENTS, CARD_CLASS } from "./theme";

interface SettingsManagerProps {
  groups: SettingsGroupDef[];
  initial: SiteSettings;
  loadError?: string;
}

export default function SettingsManager({
  groups,
  initial,
  loadError,
}: SettingsManagerProps) {
  const [values, setValues] = useState<Record<string, Record<string, unknown>>>(
    () =>
      Object.fromEntries(
        groups.map((group) => [
          group.key,
          {
            ...(initial[group.key as SettingsKey] as unknown as Record<
              string,
              unknown
            >),
          },
        ]),
      ),
  );
  const [activeKey, setActiveKey] = useState<SettingsKey>(groups[0].key);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);

  const closeToast = useCallback(() => setToast(null), []);
  const activeGroup = useMemo(
    () => groups.find((group) => group.key === activeKey) ?? groups[0],
    [groups, activeKey],
  );
  const accent = ACCENTS[activeGroup.accent];
  const groupValues = values[activeGroup.key] ?? {};

  const updateField = (key: string, value: unknown) => {
    setValues((current) => ({
      ...current,
      [activeKey]: { ...current[activeKey], [key]: value },
    }));
  };

  const save = async (event: React.FormEvent) => {
    event.preventDefault();
    if (saving) return;

    const payload = Object.fromEntries(
      activeGroup.fields.map((field) => [
        field.key,
        groupValues[field.key] ?? "",
      ]),
    );

    setSaving(true);
    try {
      await apiFetch("/api/settings", {
        method: "PUT",
        body: JSON.stringify({ group: activeGroup.key, values: payload }),
      });

      const before = initial[
        activeGroup.key as SettingsKey
      ] as unknown as Record<string, unknown>;
      for (const field of activeGroup.fields) {
        if (field.type !== "image") continue;
        const oldUrl = before?.[field.key];
        if (
          typeof oldUrl === "string" &&
          oldUrl &&
          oldUrl !== payload[field.key]
        ) {
          await deleteUploadedImage(oldUrl);
        }
      }

      setToast({
        kind: "success",
        message: `${activeGroup.label} settings updated and published.`,
      });
    } catch (error) {
      setToast({
        kind: "error",
        message:
          error instanceof Error
            ? error.message
            : "The settings could not be saved.",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <motion.header
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-7"
      >
        <p className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-gold">
          Content · Site-wide
        </p>
        <h1 className="mt-3 font-display text-[2rem] font-semibold leading-tight text-ink sm:text-[2.4rem]">
          Profile &amp; hero
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
          Control the first screen, your contact details and the footer. These
          values also feed the social icons and download links across the site.
        </p>
      </motion.header>

      {loadError && (
        <div className="mb-5 rounded-lg border border-gold/30 bg-gold/10 px-4 py-3 text-sm text-gold-soft">
          {loadError}
        </div>
      )}

      <div className="mb-6 flex flex-wrap gap-2">
        {groups.map((group) => {
          const groupAccent = ACCENTS[group.accent];
          const active = group.key === activeKey;
          return (
            <button
              key={group.key}
              onClick={() => setActiveKey(group.key)}
              className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                active
                  ? `${groupAccent.border} ${groupAccent.bg} ${groupAccent.text}`
                  : "border-line text-muted hover:border-line-strong hover:text-ink"
              }`}
            >
              {group.label}
            </button>
          );
        })}
      </div>

      <form onSubmit={save} className={`${CARD_CLASS} overflow-hidden`}>
        <div className="border-b border-line bg-white/[0.02] px-5 py-4 sm:px-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="flex items-center gap-2 font-display text-[1.05rem] font-semibold text-ink sm:text-[1.15rem]">
                <span className={`h-1.5 w-1.5 rounded-full ${accent.dot}`} />
                {activeGroup.label}
              </h2>
              <p className="mt-1 text-xs text-muted">
                {activeGroup.description}
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 self-start rounded-full border border-line px-3 py-1 font-mono text-[0.58rem] uppercase tracking-[0.18em] text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Live on save
            </span>
          </div>
        </div>

        <div className="grid gap-5 px-5 py-6 sm:grid-cols-2 sm:px-6">
          {activeGroup.fields.map((field) => (
            <div
              key={field.key}
              className={
                field.type === "textarea" || field.type === "image"
                  ? "sm:col-span-2"
                  : ""
              }
            >
              <FieldInput
                field={field}
                value={groupValues[field.key]}
                onChange={(value) => updateField(field.key, value)}
                disabled={saving}
              />
            </div>
          ))}
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-line bg-[rgba(7,14,12,0.55)] px-5 py-4 sm:px-6">
          <button
            type="submit"
            disabled={saving}
            className={`rounded-lg bg-gradient-to-r ${accent.gradient} px-6 py-2.5 text-sm font-semibold text-[#07120f] transition hover:brightness-105 disabled:opacity-60`}
          >
            {saving ? "Saving…" : `Save ${activeGroup.label.toLowerCase()}`}
          </button>
        </div>
      </form>

      <Toast toast={toast} onClose={closeToast} />
    </div>
  );
}
