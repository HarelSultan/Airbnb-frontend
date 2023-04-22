export const uploadService = {
    uploadImg,
}
function uploadImg(ev: React.ChangeEvent<HTMLInputElement>) {
    const CLOUD_NAME = 'dotasvsuv'
    const UPLOAD_PRESET = 'ps47m5rf'
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
    if (!ev.target.files) return

    const formData = new FormData()
    formData.append('upload_preset', UPLOAD_PRESET)
    formData.append('file', ev.target.files[0])
    console.log(ev)
    return fetch(UPLOAD_URL, {
        method: 'POST',
        body: formData,
    })
        .then(res => res.json())
        .then(res => {
            return res
        })
        .catch(err => console.error(err))
}
