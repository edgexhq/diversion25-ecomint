"use server";

import prisma from "@/lib/prisma";

export async function getTrees() {
    const trees = await prisma.tree.findMany();

    return trees;
}

export async function getTreeById(id: string) {
    const tree = await prisma.tree.findUnique({
        where: {
            id: id
        }
    });

    return tree;
}
