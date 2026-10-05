// `z` from 'astro:content' is deprecated in Astro 7 (astro check reports
// ts(6385)); it now lives at 'astro/zod'. Same schema, one fewer warning.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    // `reply` is the optional per-post prompt in frontmatter: the sentence that
    // precedes the write-to-me link on the article page. [...slug].astro has
    // always read this, but it had no field here, so zod stripped it and the
    // feature could never fire — `astro check` (npm run check) is what caught
    // it, since `post.data.reply` did not exist on the inferred type.
    reply: z.string().optional(),
    // A post with no description falls back to the layout default, which is the
    // site tagline rather than a summary of the piece. Worth writing one.
    description: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
