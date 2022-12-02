

export const deleteUser = async (_id,userRole) => {
    try {
        const res = await fetch(`/api/auth/admin/delete${userRole}/${_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include"
        })
        const data = await res.json();
        if (data.success) {
            alert(data.message)
            window.location.reload()
        }
        else {
            console.log(data.message)
            alert(data.message)
        }
    }
    catch (err) {
        console.log(err)
    }
}