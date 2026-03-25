import { prisma } from '../../lib/prisma';
import { revalidatePath } from 'next/cache';

export async function KreirajPost(title: string) {
    const noviPost = await prisma.post.create({
        data: {
            title,
        },
    });

    if (!noviPost) {
      return {
        success: false,
        error: 'Post nije pronađen'
      };
    }

    revalidatePath('/registracija');
    return {
      success: true,
      data: noviPost
    };
}

export async function UčitajPost() {
    const postovi = await prisma.post.findMany();
    return postovi;
}
