export const Avatar = () => {

    const user = {
        avatarUrl: "https://preview.redd.it/2ujdyrayf4681.png?width=640&crop=smart&auto=webp&s=bf6569ac16525273d5b44895210f13204c3461ea",
    };

    return (

        <img
            src={user.avatarUrl}
            alt="Avatar"
            className="h-20 w-20 sm:h-24 sm:w-24 rounded-full mb-3"
            style={{
                border: "3px solid var(--color-info)",
                backgroundColor: "var(--color-background)",
            }}
        />
    )
}


