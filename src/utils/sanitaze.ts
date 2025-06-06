export function sanitizeComment(comment: any) {
    return {
        ...comment,
        user: comment.user
            ? {
                ...comment.user,
                password: undefined
            }
            : undefined
    }
}
