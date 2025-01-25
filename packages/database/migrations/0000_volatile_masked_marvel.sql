DO $$ BEGIN
 CREATE TYPE "public"."role" AS ENUM('admin', 'user');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."character_difficulty" AS ENUM('beginner', 'easy', 'intermediate', 'hard', 'challenge');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "account" (
	"access_token" text,
	"expires_at" integer,
	"id_token" text,
	"provider" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"refresh_token" text,
	"scope" text,
	"session_state" text,
	"token_type" text,
	"type" text NOT NULL,
	"userId" text NOT NULL,
	CONSTRAINT "account_provider_providerAccountId_pk" PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "authenticator" (
	"counter" integer NOT NULL,
	"credentialBackedUp" boolean NOT NULL,
	"credentialDeviceType" text NOT NULL,
	"credentialID" text NOT NULL,
	"credentialPublicKey" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"transports" text,
	"userId" text NOT NULL,
	CONSTRAINT "authenticator_userId_credentialID_pk" PRIMARY KEY("userId","credentialID"),
	CONSTRAINT "authenticator_credentialID_unique" UNIQUE("credentialID")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"created_at" timestamp DEFAULT now() NOT NULL,
	"email" text NOT NULL,
	"emailVerified" timestamp,
	"github_id" text,
	"handle" text,
	"id" text PRIMARY KEY NOT NULL,
	"image" text,
	"is_pro" boolean DEFAULT false NOT NULL,
	"is_virtual" boolean DEFAULT false NOT NULL,
	"name" text,
	"role" "role" DEFAULT 'user' NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "user_github_id_unique" UNIQUE("github_id"),
	CONSTRAINT "user_handle_unique" UNIQUE("handle")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session" (
	"expires" timestamp NOT NULL,
	"sessionToken" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "characters" (
	"created_at" timestamp DEFAULT now() NOT NULL,
	"id" text PRIMARY KEY NOT NULL,
	"image_url" text,
	"name" text NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "character_meta" (
	"archetypes" text[] DEFAULT ARRAY[]::text[] NOT NULL,
	"character_id" varchar(128),
	"cons" text[] DEFAULT ARRAY[]::text[] NOT NULL,
	"difficulty" "character_difficulty",
	"id" varchar(128) PRIMARY KEY NOT NULL,
	"pros" text[] DEFAULT ARRAY[]::text[] NOT NULL,
	"title" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "move_lists" (
	"author_id" text,
	"character_id" varchar(128),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"id" varchar(128) PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "moves" (
	"character_id" varchar(128),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"damage_hits" integer[] DEFAULT ARRAY[]::integer[],
	"frames_on_block_lower" text,
	"frames_on_block_properties" text[] DEFAULT ARRAY[]::text[],
	"frames_on_block_raw" text,
	"frames_on_block_tech" text,
	"frames_on_block_upper" text,
	"frames_on_counter_lower" text,
	"frames_on_counter_properties" text[] DEFAULT ARRAY[]::text[],
	"frames_on_counter_raw" text,
	"frames_on_counter_tech" text,
	"frames_on_counter_upper" text,
	"frames_on_hit_lower" text,
	"frames_on_hit_properties" text[] DEFAULT ARRAY[]::text[],
	"frames_on_hit_raw" text,
	"frames_on_hit_tech" text,
	"frames_on_hit_upper" text,
	"frames_on_startup_lower" text,
	"frames_on_startup_properties" text[] DEFAULT ARRAY[]::text[],
	"frames_on_startup_raw" text,
	"frames_on_startup_tech" text,
	"frames_on_startup_upper" text,
	"hit_levels" text[] DEFAULT ARRAY[]::text[],
	"id" varchar(128) PRIMARY KEY NOT NULL,
	"is_combo" boolean DEFAULT false NOT NULL,
	"move_list_id" varchar(128),
	"name" text,
	"notation" text NOT NULL,
	"notes" text[] DEFAULT ARRAY[]::text[],
	"specials" text[] DEFAULT ARRAY[]::text[],
	"state_key" text,
	"state_raw" text,
	"updated_at" timestamp
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "authenticator" ADD CONSTRAINT "authenticator_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "character_meta" ADD CONSTRAINT "character_meta_character_id_characters_id_fk" FOREIGN KEY ("character_id") REFERENCES "public"."characters"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "move_lists" ADD CONSTRAINT "move_lists_author_id_user_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "move_lists" ADD CONSTRAINT "move_lists_character_id_characters_id_fk" FOREIGN KEY ("character_id") REFERENCES "public"."characters"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "moves" ADD CONSTRAINT "moves_character_id_characters_id_fk" FOREIGN KEY ("character_id") REFERENCES "public"."characters"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "moves" ADD CONSTRAINT "moves_move_list_id_move_lists_id_fk" FOREIGN KEY ("move_list_id") REFERENCES "public"."move_lists"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
