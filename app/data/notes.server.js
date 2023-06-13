import { prisma } from "./db.server.js";
export async function addNote({ title, content, userId }) {
  try {
    const note = await prisma.note.create({
      data: {
        title,
        content,
        userId,
      },
    });

    return note;
  } catch (e) {
    throw new Error(e.message);
  }
}
export async function getNotes(userId) {
  try {
    const notes = await prisma.note.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return notes;
  } catch (e) {
    throw new Error(e.message);
  }
}
export async function getNoteById(id) {
  try {
    const note = await prisma.note.findUnique({
      where: {
        id,
      },
    });
    return note;
  } catch (e) {
    throw new Error(e.message);
  }
}
export async function updateNoteById(noteId, noteData) {
  try {
    const note = await prisma.note.update({
      where: {
        id: noteId,
      },
      data: {
        title: noteData.title,
        content: noteData.content,
      },
    });
    return note;
  } catch (e) {
    throw new Error(e.message);
  }
}
export async function deleteNoteById(id) {
  try {
    const note = await prisma.note.delete({
      where: {
        id,
      },
    });
    return note;
  } catch (e) {
    throw new Error(e.message);
  }
}
