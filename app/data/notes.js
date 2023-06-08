import fs from "fs/promises";
export async function getStoredNotes() {
  const rawFileContent = await fs.readFile("notes.json", {
    encoding: "utf8",
  });
  const data = JSON.parse(rawFileContent);
  const storedNotes = data.notes ?? [];
  return storedNotes;
}

export async function storeNotes(notes) {
  return await fs.writeFile(
    "notes.json",
    JSON.stringify({ notes: notes || [] })
  );
}
