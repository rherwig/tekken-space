-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "ControllerLayout" AS ENUM ('GAMEPAD', 'XBOX', 'PLAYSTATION', 'ARCADE', 'HITBOX');

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "handle" TEXT,
    "email" TEXT,
    "name" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "isVirtual" BOOLEAN NOT NULL DEFAULT false,
    "preferences" JSONB NOT NULL DEFAULT '{}',
    "role" "Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Character" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "imageUrl" TEXT,
    "metadata" JSONB NOT NULL DEFAULT '{}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Move" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "notation" TEXT NOT NULL,
    "name" TEXT,
    "notes" TEXT,
    "index" INTEGER NOT NULL DEFAULT 0,
    "metadata" JSONB NOT NULL DEFAULT '{}',
    "aliases" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "isCombo" BOOLEAN NOT NULL DEFAULT false,
    "damage" JSONB NOT NULL DEFAULT '{}',
    "hits" JSONB NOT NULL DEFAULT '{}',
    "properties" JSONB NOT NULL DEFAULT '{}',
    "frames" JSONB NOT NULL DEFAULT '{}',
    "parentId" TEXT,
    "movesListId" TEXT,
    "characterId" TEXT NOT NULL,
    "authorId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Move_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MoveList" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "authorId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MoveList_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "User_handle_key" ON "User"("handle");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Character_name_key" ON "Character"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Character_slug_key" ON "Character"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Move_slug_key" ON "Move"("slug");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Move" ADD CONSTRAINT "Move_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Move"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Move" ADD CONSTRAINT "Move_movesListId_fkey" FOREIGN KEY ("movesListId") REFERENCES "MoveList"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Move" ADD CONSTRAINT "Move_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Move" ADD CONSTRAINT "Move_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MoveList" ADD CONSTRAINT "MoveList_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
