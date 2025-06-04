import { InferSelectModel, InferInsertModel } from "drizzle-orm"
import { movies } from "../schemas"

export type Movie = InferSelectModel<typeof movies>

export type NewMovie = InferInsertModel<typeof movies>