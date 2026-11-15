"use client";

import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import type { SectionDef } from "../../lib/sections";
import { apiFetch, deleteUploadedImage } from "../../lib/admin-client";
import FieldInput from "./FieldInput";
import Modal from "./Modal";
import Toast, { type ToastState } from "./Toast";
import { ACCENTS, CARD_CLASS } from "./theme";

export type AdminItem = Record<string, unknown> & { id: string };

interface SectionManagerProps {
  def: SectionDef;
  initialItems: AdminItem[];
  loadError?: string;
}

interface EditorState {
  id: string | null;
  values: Record<string, unknown>;
}

function emptyValues(def: SectionDef): Record<string, unknown> {
  return Object.fromEntries(
    def.fields.map((field) => {
      if (field.type === "tags") return [field.key, []];
      if (field.type === "number") return [field.key, field.min ?? 0];
      if (field.type === "select")
        return [field.key, field.options?.[0]?.value ?? ""];
      return [field.key, ""];
    }),
  );
}

function text(value: unknown): string {
  return typeof value === "string" ? value : String(value ?? "");
}

function displayTitle(item: AdminItem, def: SectionDef): string {
  return text(item[def.titleKey]) || "Untitled";
}

function metaChips(item: AdminItem, def: SectionDef): string[] {
  const subtitle = text(item[def.subtitleKey]);
  const chips: string[] = [];
  if (item.year) chips.push(text(item.year));
  if (item.category && text(item.category) !== subtitle)
    chips.push(text(item.category));
  if (item.track === "education") chips.push("Education");
  if (item.track === "experience") chips.push("Experience");
  return chips;
}

export default function SectionManager({
  def,
  initialItems,
  loadError,
}: SectionManagerProps) {
  const accent = ACCENTS[def.accent];
  const [items, setItems] = useState<AdminItem[]>(initialItems);
  const [editor, setEditor] = useState<EditorState | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<AdminItem | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [reordering, setReordering] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);

  const closeToast = useCallback(() => setToast(null), []);

  const openNew = () => {
    setEditor({ id: null, values: emptyValues(def) });
  };

  const openEdit = (item: AdminItem) => {
    setEditor({
      id: item.id,
      values: { ...emptyValues(def), ...item },
    });
  };

  const updateField = (key: string, value: unknown) => {
    setEditor((current) =>
      current
        ? { ...current, values: { ...current.values, [key]: value } }
        : current,
    );
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!editor || saving) return;

    const payload = Object.fromEntries(
      def.fields.map((field) => [field.key, editor.values[field.key] ?? ""]),
    );

    setSaving(true);
    try {
      const saved = await apiFetch<AdminItem>(
        editor.id
          ? `/api/content/${def.slug}/${editor.id}`
          : `/api/content/${def.slug}`,
        {
          method: editor.id ? "PATCH" : "POST",
          body: JSON.stringify(payload),
        },
      );

      const previous = editor.id
        ? items.find((item) => item.id === editor.id)
        : undefined;

      setItems((current) =>
        editor.id
          ? current.map((item) => (item.id === saved.id ? saved : item))
          : [...current, saved],
      );

      if (previous) {
        for (const field of def.fields) {
          if (field.type !== "image") continue;
          const oldUrl = previous[field.key];
          if (
            typeof oldUrl === "string" &&
            oldUrl &&
            oldUrl !== saved[field.key]
          ) {
            await deleteUploadedImage(oldUrl);
          }
        }
      }

      setEditor(null);
      setToast({
        kind: "success",
        message: editor.id
          ? "Changes saved and published."
          : `New ${def.singular} added.`,
      });
    } catch (error) {
      setToast({
        kind: "error",
        message:
          error instanceof Error
            ? error.message
            : "The item could not be saved.",
      });
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget || deleting) return;
    setDeleting(true);
    try {
      await apiFetch(`/api/content/${def.slug}/${deleteTarget.id}`, {
        method: "DELETE",
      });
      for (const field of def.fields) {
        if (field.type !== "image") continue;
        const url = deleteTarget[field.key];
        if (typeof url === "string") await deleteUploadedImage(url);
      }
      setItems((current) =>
        current.filter((item) => item.id !== deleteTarget.id),
      );
      setToast({ kind: "success", message: `${def.singular} deleted.` });
      setDeleteTarget(null);
    } catch (error) {
      setToast({
        kind: "error",
        message:
          error instanceof Error
            ? error.message
            : "The item could not be deleted.",
      });
    } finally {
      setDeleting(false);
    }
  };

  const move = async (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= items.length || reordering) return;

    const previous = items;
    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    setItems(next);
    setReordering(true);

    try {
      await apiFetch(`/api/content/${def.slug}/reorder`, {
        method: "POST",
        body: JSON.stringify({ ids: next.map((item) => item.id) }),
      });
    } catch (error) {
      setItems(previous);
      setToast({
        kind: "error",
        message:
          error instanceof Error
            ? error.message
            : "The order could not be saved.",
      });
    } finally {
      setReordering(false);
    }
  };

  return (
    <div>
      <motion.header
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
      >
        <div>
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-gold">
            Content · {def.label}
          </p>
          <h1 className="mt-3 font-display text-[2rem] font-semibold leading-tight text-ink sm:text-[2.4rem]">
            Manage {def.label}
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
            {def.description}
          </p>
        </div>
        <button
          onClick={openNew}
          className={`inline-flex items-center justify-center gap-2 self-start rounded-lg bg-gradient-to-r ${accent.gradient} px-5 py-3 text-[0.8rem] font-semibold text-[#07120f] transition hover:brightness-105 sm:self-auto`}
        >
          <span className="text-base leading-none">+</span>
          Add {def.singular}
        </button>
      </motion.header>

      {loadError && (
        <div className="mb-5 rounded-lg border border-gold/30 bg-gold/10 px-4 py-3 text-sm text-gold-soft">
          {loadError}
        </div>
      )}

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 text-[0.7rem] text-muted">
        <span>
          {items.length} {items.length === 1 ? "entry" : "entries"} · use the
          arrows to change the order on the page
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          Changes publish instantly
        </span>
      </div>

      <div className="space-y-3">
        {items.length === 0 && (
          <div
            className={`${CARD_CLASS} flex flex-col items-center justify-center gap-3 border-dashed px-6 py-14 text-center`}
          >
            <span className="text-3xl" aria-hidden>
              ✨
            </span>
            <p className="text-sm font-medium text-ink">
              No {def.label.toLowerCase()} yet
            </p>
            <p className="max-w-sm text-xs text-muted">
              Add your first {def.singular} and it will appear on the public
              site right away.
            </p>
            <button
              onClick={openNew}
              className="mt-1 rounded-md border border-accent/35 px-4 py-2 text-xs font-medium text-accent-soft transition hover:bg-accent/10"
            >
              Add {def.singular}
            </button>
          </div>
        )}

        {items.map((item, index) => {
          const chips = metaChips(item, def);
          return (
            <motion.article
              layout
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`${CARD_CLASS} group flex flex-col gap-4 px-4 py-4 transition hover:border-line-strong sm:flex-row sm:items-center sm:px-5`}
            >
              <div className="flex min-w-0 flex-1 items-center gap-4">
                <span
                  className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg ${accent.bg} font-mono text-[0.7rem] font-semibold ${accent.text}`}
                >
                  {index + 1}
                </span>
                <div className="min-w-0">
                  <h3 className="truncate text-sm font-medium text-ink sm:text-[0.95rem]">
                    {displayTitle(item, def)}
                  </h3>
                  <p className="mt-0.5 truncate text-xs text-muted">
                    {text(item[def.subtitleKey]) || "—"}
                  </p>
                  {chips.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {chips.map((chip, chipIndex) => (
                        <span
                          key={`${chip}-${chipIndex}`}
                          className={`rounded-full ${accent.bg} px-2 py-0.5 text-[10px] font-medium ${accent.softText}`}
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-end gap-1.5 self-end sm:self-center">
                <button
                  onClick={() => move(index, -1)}
                  disabled={index === 0 || reordering}
                  aria-label="Move up"
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-line text-sm text-muted transition hover:border-accent/50 hover:text-ink disabled:opacity-25"
                >
                  ↑
                </button>
                <button
                  onClick={() => move(index, 1)}
                  disabled={index === items.length - 1 || reordering}
                  aria-label="Move down"
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-line text-sm text-muted transition hover:border-accent/50 hover:text-ink disabled:opacity-25"
                >
                  ↓
                </button>
                <button
                  onClick={() => openEdit(item)}
                  className="rounded-md border border-line px-3 py-2 text-xs font-medium text-ink-soft transition hover:border-accent/50 hover:text-ink"
                >
                  Edit
                </button>
                <button
                  onClick={() => setDeleteTarget(item)}
                  className="rounded-md border border-red-400/20 px-3 py-2 text-xs font-medium text-red-200 transition hover:bg-red-500/10"
                >
                  Delete
                </button>
              </div>
            </motion.article>
          );
        })}
      </div>

      <Modal
        open={editor !== null}
        title={
          editor?.id
            ? `Edit ${def.singular}`
            : `Add ${def.singular}`
        }
        subtitle={def.description}
        onClose={() => {
          if (!saving) setEditor(null);
        }}
        size="lg"
        footer={
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setEditor(null)}
              disabled={saving}
              className="rounded-lg border border-line px-4 py-2.5 text-sm font-medium text-ink-soft/70 transition hover:text-ink disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="item-form"
              disabled={saving}
              className={`rounded-lg bg-gradient-to-r ${accent.gradient} px-5 py-2.5 text-sm font-semibold text-[#07120f] transition hover:brightness-105 disabled:opacity-60`}
            >
              {saving ? "Saving…" : editor?.id ? "Save changes" : "Add item"}
            </button>
          </div>
        }
      >
        {editor && (
          <form id="item-form" onSubmit={submit} className="space-y-4">
            {def.fields.map((field) => (
              <FieldInput
                key={field.key}
                field={field}
                value={editor.values[field.key]}
                onChange={(value) => updateField(field.key, value)}
                disabled={saving}
              />
            ))}
          </form>
        )}
      </Modal>

      <Modal
        open={deleteTarget !== null}
        title={`Delete this ${def.singular}?`}
        onClose={() => {
          if (!deleting) setDeleteTarget(null);
        }}
        footer={
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setDeleteTarget(null)}
              disabled={deleting}
              className="rounded-lg border border-line px-4 py-2.5 text-sm font-medium text-ink-soft/70 transition hover:text-ink disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={confirmDelete}
              disabled={deleting}
              className="rounded-lg bg-[#b4553f] px-5 py-2.5 text-sm font-semibold text-[#fdf6f2] transition hover:bg-[#c4644c] disabled:opacity-60"
            >
              {deleting ? "Deleting…" : "Delete permanently"}
            </button>
          </div>
        }
      >
        <p className="text-sm leading-relaxed text-ink-soft/80">
          <span className="font-medium text-ink">
            {deleteTarget ? displayTitle(deleteTarget, def) : ""}
          </span>{" "}
          will be removed from your public site immediately. This cannot be
          undone.
        </p>
        <p className="mt-4 rounded-lg border border-line bg-white/[0.02] px-4 py-3 text-xs leading-relaxed text-muted">
          Tip: if you only want to hide it for now, you could instead edit the
          title to add “(hidden)” and keep the entry.
        </p>
      </Modal>

      <Toast toast={toast} onClose={closeToast} />
    </div>
  );
}
