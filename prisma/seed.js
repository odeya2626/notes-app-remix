const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function seed() {
  try {
    const email = "user@example.com";
    await prisma.user.delete({ where: { email } }).catch(() => {
      // no worries if it doesn't exist yet
    });
    // Create a user
    const hashedPassword = await bcrypt.hash("password", 10);
    const user = await prisma.user.create({
      data: {
        username: "user",
        email: email,
        password: hashedPassword,
      },
    });

    // Create notes associated with the user
    const notesData = [
      { title: "Note 1", content: "Content of Note 1", userId: user.id },
      { title: "Note 2", content: "Content of Note 2", userId: user.id },
    ];

    const createdNotes = await Promise.all(
      notesData.map((note) => prisma.note.create({ data: note }))
    );

    console.log("Seed data created successfully.");
  } catch (error) {
    console.error("Error creating seed data:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
