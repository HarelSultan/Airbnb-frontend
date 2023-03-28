export const useFormRegister = (
    initialState: React.ComponentState,
    cb: (initialState: React.ComponentState) => void
) => {
    const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const field = ev.target.name
        let value: string | number | boolean = ev.target.value
        switch (ev.target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break

            default:
                break
        }
        console.log('didnt return')
        return cb({ ...initialState, [field]: value })
    }

    const register = (field: string, type = '') => {
        console.log(initialState)
        return {
            type,
            name: field,
            id: field,
            onChange: handleChange,
            value: initialState[field],
        }
    }

    return [register]
}
