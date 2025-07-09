import { AvatarCreatorQO } from "../components/AvatarCreatorQO"

export const CreateAvatar = () => {
    return (<>
        <AvatarCreatorQO desactivate={() => setCreatingAvatar(false)} />

    </>)
}