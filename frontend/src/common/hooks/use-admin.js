import some from "lodash/some";
import { useGammaMe } from "@cthit/react-digit-components";

function useAdmin() {
    const authority = window.ENV.REACT_APP_GAMMA_ADMIN_AUTHORITY;
    const user = useGammaMe();
    return user != null && some(user.authorities, ["authority", authority]);
}

export default useAdmin;
