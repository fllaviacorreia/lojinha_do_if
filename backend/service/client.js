import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getAll = async (vendorId) => {
    return prisma.client.findMany({ where: { vendorId } });
};

export const getById = async (id, vendorId) => {
    return prisma.client.findFirst({ where: { id, vendorId } });
};

export const getByEmail = async (email, vendorId) => {
    return prisma.client.findFirst({ where: { email, vendorId } });
};

export const create = async (data, vendorId) => {
    return prisma.client.create({
        data: { ...data, vendorId, status: 'active' }
    });
};

export const update = async (id, data, vendorId) => {
    const client = await getById(id, vendorId);
    if (!client) return null;

    return prisma.client.update({
        where: { id },
        data
    });
};

export const changeStatus = async (id, vendorId) => {
    const client = await getById(id, vendorId);
    if (!client) return null;

    const newStatus = client.status === 'active' ? 'inactive' : 'active';

    return prisma.client.update({
        where: { id },
        data: { status: newStatus }
    });
};
