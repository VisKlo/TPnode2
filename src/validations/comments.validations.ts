import { z } from "zod";

export const createCommentValidation = z.object({
  content: z.string()
    .trim()
    .min(1, { message: "Le contenu du commentaire est obligatoire." }),
  movieId: z.string()
    .uuid({ message: "L'ID du film doit être un UUID valide." }),
});
