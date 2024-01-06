import Cookies from 'js-cookie';
const useCurrentUser = () => {
    console.log(Cookies.get('user'));
    const user = Cookies.get('user') || null;
    const parsedUser = JSON.parse(user);
    return parsedUser;
}

export default useCurrentUser;