-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Question" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "question" TEXT NOT NULL,
    "extraDescription" TEXT,
    "isMultipleChoise" BOOLEAN NOT NULL DEFAULT false,
    "quizId" INTEGER NOT NULL,
    "isSoftDelete" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Question_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Question" ("extraDescription", "id", "isMultipleChoise", "question", "quizId") SELECT "extraDescription", "id", "isMultipleChoise", "question", "quizId" FROM "Question";
DROP TABLE "Question";
ALTER TABLE "new_Question" RENAME TO "Question";
CREATE TABLE "new_QuestionAnswer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "answer" TEXT NOT NULL,
    "questionId" INTEGER NOT NULL,
    "isSoftDelete" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "QuestionAnswer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_QuestionAnswer" ("answer", "id", "questionId") SELECT "answer", "id", "questionId" FROM "QuestionAnswer";
DROP TABLE "QuestionAnswer";
ALTER TABLE "new_QuestionAnswer" RENAME TO "QuestionAnswer";
CREATE TABLE "new_QuestionOption" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "option" TEXT NOT NULL,
    "questionId" INTEGER NOT NULL,
    "isSoftDelete" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "QuestionOption_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_QuestionOption" ("id", "option", "questionId") SELECT "id", "option", "questionId" FROM "QuestionOption";
DROP TABLE "QuestionOption";
ALTER TABLE "new_QuestionOption" RENAME TO "QuestionOption";
CREATE TABLE "new_Quiz" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "languageId" INTEGER NOT NULL,
    "isSoftDelete" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Quiz_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Quiz" ("description", "id", "languageId", "slug", "title") SELECT "description", "id", "languageId", "slug", "title" FROM "Quiz";
DROP TABLE "Quiz";
ALTER TABLE "new_Quiz" RENAME TO "Quiz";
CREATE UNIQUE INDEX "Quiz_title_key" ON "Quiz"("title");
CREATE UNIQUE INDEX "Quiz_slug_key" ON "Quiz"("slug");
CREATE TABLE "new_Language" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "culture" TEXT NOT NULL,
    "iconUrl" TEXT NOT NULL,
    "displayText" TEXT NOT NULL,
    "isSoftDelete" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Language" ("culture", "displayText", "iconUrl", "id") SELECT "culture", "displayText", "iconUrl", "id" FROM "Language";
DROP TABLE "Language";
ALTER TABLE "new_Language" RENAME TO "Language";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
