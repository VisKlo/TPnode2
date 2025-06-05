ALTER TABLE "comments" DROP CONSTRAINT "comments_movie_id_movies_id_fk";
--> statement-breakpoint
ALTER TABLE "comments" DROP CONSTRAINT "comments_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "comments" ADD COLUMN "movieId" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "comments" ADD COLUMN "userId" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "comments" ADD CONSTRAINT "comments_movieId_movies_id_fk" FOREIGN KEY ("movieId") REFERENCES "public"."movies"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comments" ADD CONSTRAINT "comments_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comments" DROP COLUMN "movie_id";--> statement-breakpoint
ALTER TABLE "comments" DROP COLUMN "user_id";