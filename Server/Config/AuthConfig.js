export const userRoutes = {
    create: {
        allowedRoles: ['Admin', 'Manager', 'Staff']
    },
    read: {
        allowedRoles: ['Admin', 'Manager', 'Staff', 'User']
    },
    update: {
        allowedRoles: ['Admin', 'Manager', 'Staff']
    },
    delete: {
        allowedRoles: ['Admin', 'Manager']
    }

}

export const serviceRoutes ={
    create: {
        allowedRoles: ['Admin', 'Manager', 'Staff']
    },
    read: {
        allowedRoles: ['Admin', 'Manager', 'Staff', 'User']
    },
    update: {
        allowedRoles: ['Admin', 'Manager', 'Staff']
    },
    delete: {
        allowedRoles: ['Admin', 'Manager']
    }
}

export const categoryRoutes ={
    create: {
        allowedRoles: ['Admin', 'Manager', 'Staff']
    },
    read: {
        allowedRoles: ['Admin', 'Manager', 'Staff', 'User']
    },
    update: {
        allowedRoles: ['Admin', 'Manager', 'Staff']
    },
    delete: {
        allowedRoles: ['Admin', 'Manager']
    }
}

