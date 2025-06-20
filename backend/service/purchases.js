import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const getAll = async (vendorId) => {
    return prisma.purchase.findMany({
        where: { vendorId },
        include: {
            client: true,
            products: { include: { product: true } }
        }
    });
};

const getById = async (id, vendorId) => {
    return prisma.purchase.findFirst({
        where: { id, vendorId },
        include: {
            client: true,
            products: { include: { product: true } }
        }
    });
};
const create = async (clientId, items, vendorId) => {
    const purchase = await prisma.purchase.create({
        data: {
            clientId,
            vendorId,
            products: {
                create: items.map(item => ({
                    productId: item.productId,
                    quantity: item.quantity
                }))
            },
            status: 'delivered'
        },
        include: { products: true }
    });

    // Reduzir estoque dos produtos
    await Promise.all(
            purchase.products.map(async item => {
                await prisma.product.update({
                    where: { id: item.productId },
                    data: {
                        stock: {
                            decrement: item.quantity
                        }
                    }
                });
            })
        );

    return purchase;
};


const changeStatus = async (id, vendorId, status = 'cancelled', returnProducts = false) => {
    const purchase = await getById(id, vendorId);
    if (!purchase) return null;

    if (status === 'cancelled' && returnProducts) {
        // Devolve os produtos para o estoque
        await Promise.all(
            purchase.products.map(async item => {
                await prisma.product.update({
                    where: { id: item.productId },
                    data: {
                        stock: {
                            increment: item.quantity
                        }
                    }
                });
            })
        );
    }

    return prisma.purchase.update({
        where: { id },
        data: { status }
    });
};


export {
    getAll,
    getById,
    create,
    changeStatus
};
