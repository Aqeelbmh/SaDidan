export async function apiFetch<T>(
  url: string,
  init: RequestInit = {},
): Promise<T> {
  const response = await fetch(url, {
    ...init,
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });

  if (response.status === 401) {
    window.location.href = "/admin/login";
    throw new Error("Your session has expired. Please sign in again.");
  }

  const data = (await response.json().catch(() => null)) as
    | { error?: string }
    | T
    | null;

  if (!response.ok) {
    throw new Error(
      (data && typeof data === "object" && "error" in data && data.error) ||
        "Something went wrong. Please try again.",
    );
  }

  return data as T;
}

export async function compressImage(file: File): Promise<File> {
  const skippable = ["image/gif", "image/svg+xml", "image/avif"];
  if (!file.type.startsWith("image/") || skippable.includes(file.type)) {
    return file;
  }

  try {
    const bitmap = await createImageBitmap(file);
    const maxDimension = 1600;
    const scale = Math.min(
      1,
      maxDimension / Math.max(bitmap.width, bitmap.height),
    );
    const width = Math.max(1, Math.round(bitmap.width * scale));
    const height = Math.max(1, Math.round(bitmap.height * scale));

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");
    if (!context) return file;

    context.drawImage(bitmap, 0, 0, width, height);
    bitmap.close?.();

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", 0.86),
    );
    if (!blob) return file;

    return new File([blob], file.name.replace(/\.[^.]+$/, "") + ".jpg", {
      type: "image/jpeg",
    });
  } catch {
    return file;
  }
}

export async function uploadImageFile(
  file: File,
): Promise<{ id: string; url: string }> {
  const prepared = await compressImage(file);
  const form = new FormData();
  form.append("file", prepared);

  const response = await fetch("/api/images", {
    method: "POST",
    body: form,
  });

  if (response.status === 401) {
    window.location.href = "/admin/login";
    throw new Error("Your session has expired. Please sign in again.");
  }

  const data = (await response.json().catch(() => ({}))) as {
    id?: string;
    url?: string;
    error?: string;
  };

  if (!response.ok || !data.url || !data.id) {
    throw new Error(data.error || "The image could not be uploaded.");
  }

  return { id: data.id, url: data.url };
}

export async function deleteUploadedImage(url: string): Promise<void> {
  if (!url.startsWith("/api/images/")) return;
  const id = url.slice("/api/images/".length);
  if (!id) return;
  await fetch(`/api/images/${id}`, { method: "DELETE" }).catch(() => undefined);
}
