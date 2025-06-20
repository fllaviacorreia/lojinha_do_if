import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getAll = async (vendorId) => {
    return prisma.product.findMany({
        where: { vendorId }
    });
};

export const getById = async (id, vendorId) => {
    return prisma.product.findFirst({
        where: { id, vendorId }
    });
};

export const create = async (data, vendorId) => {
    return prisma.product.create({
        data: {
            ...data,
            vendorId,
            status: 'active'
        }
    });
};

export const update = async (id, data, vendorId) => {
    const product = await getById(id, vendorId);
    if (!product) return null;

    return prisma.product.update({
        where: { id },
        data
    });
};

export const changeStatus = async (id, vendorId) => {
    const product = await getById(id, vendorId);
    if (!product) return null;

    const newStatus = product.status === 'active' ? 'inactive' : 'active';

    return prisma.product.update({
        where: { id },
        data: { status: newStatus }
    });
};
