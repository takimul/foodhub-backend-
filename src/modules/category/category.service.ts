import { prisma } from "../../lib/prisma";
import slugify from "slugify";

export const CategoryService = {
  async create(name: string) {
    const slug = slugify(name, { lower: true, strict: true });

    return prisma.category.create({
      data: {
        name,
        slug
      }
    });
  },

  async getAll() {
    return prisma.category.findMany({
      orderBy: { name: "asc" }
    });
  },

  async update(id: string, name: string) {
    const slug = slugify(name, { lower: true, strict: true });

    return prisma.category.update({
      where: { id },
      data: { name, slug }
    });
  },

  async delete(id: string) {
    return prisma.category.delete({
      where: { id }
    });
  }
};