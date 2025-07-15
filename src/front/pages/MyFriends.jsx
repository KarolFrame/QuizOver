import useGlobalReducer from '../hooks/useGlobalReducer.jsx';
import Lista from '../components/Lista';
import { Button } from '../components/Button.jsx';

export const MyFriends = () => {
    const { store } = useGlobalReducer();
    const myFriendsList = store.profile?.friends ? Object.values(store.profile.friends) : [];
    const transformedFriendsList = myFriendsList
        .sort((a, b) => b.experience_points - a.experience_points)
        .map((user, index) => ({
            position: index + 1,
            id: user.id,
            name: user.user_info?.userName,
            score: user.experience_points,
            avatar: user.user_info?.avatar,
        }));

    console.log("current friend list", myFriendsList);
    return (<>
        <div className="flex flex-col items-center p-4" style={{ zIndex: 10 }}>
            <header className="w-full max-w-md text-center mb-6">
                <h1 className="text-white font-semibold text-4xl mb-2">My Friends</h1>
            </header>
            {transformedFriendsList.length > 0 ? (
                <Lista entries={transformedFriendsList} />
            ) : (
                <p className="text-white">You don’t have any friends yet :(</p>
            )}

            {/*            <div className="flex mt-4 p-3 rounded-lg gap-5 justify-between bg-(--color-bg-light) max-w-[80%] md:max-w-[60%] items-center">
                <input
                    type="text"
                    placeholder="Friend's username"
                    className="mb-2 bg-(--color-secondary) text-(--color-white) border border-(--color-bg-light) h-[40px] m-0"
                />
                <div className="flex gap-2">
                    <Button
                        className="rounded text-sm bg-(--color-info) text-(--color-white)"
                        label='Add Friend'
                        variant='accent'
                    />
                </div>
            </div>*/}
        </div>
    </>);
};