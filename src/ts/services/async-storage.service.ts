export const storageService = {
    query,
    get,
    post,
    put,
    remove,
}

function query<T extends { _id: string }>(entityType: string, delay = 1500): Promise<T[]> {
    const storedEntities = localStorage.getItem(entityType)
    const entities: T[] = storedEntities ? JSON.parse(storedEntities) : []
    return new Promise(resolve => setTimeout(() => resolve(entities), delay))
}

async function get<T extends { _id: string }>(entityType: string, entityId: string): Promise<T> {
    return query<T>(entityType).then(entities => {
        const entity = entities.find(entity => entity._id === entityId)
        if (!entity) {
            throw new Error(`Get failed, cannot find entity with id: ${entityId} in: ${entityType}`)
        }
        return entity
    })
}

async function post<T extends { _id: string }>(entityType: string, newEntity: T): Promise<T> {
    newEntity = { ...newEntity, _id: _makeId() }
    return query<T>(entityType).then(entities => {
        entities.push(newEntity)
        _save(entityType, entities)
        return newEntity
    })
}

async function put<T extends { _id: string }>(entityType: string, updatedEntity: T): Promise<T> {
    updatedEntity = { ...updatedEntity }
    return query<T>(entityType).then(entities => {
        const idx = entities.findIndex(entity => entity._id === updatedEntity._id)
        if (idx < 0) {
            throw new Error(`Update failed, cannot find entity with id: ${updatedEntity._id} in: ${entityType}`)
        }
        entities.splice(idx, 1, updatedEntity)
        _save(entityType, entities)
        return updatedEntity
    })
}

async function remove(entityType: string, entityId: string) {
    return query(entityType).then(entities => {
        const idx = entities.findIndex(entity => entity._id === entityId)
        if (idx < 0) {
            throw new Error(`Remove failed, cannot find entity with id: ${entityId} in: ${entityType}`)
        }
        entities.splice(idx, 1)
        _save(entityType, entities)
    })
}

// Private functions

function _save(entityType: any, entities: any) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}

function _makeId(length = 5) {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}
