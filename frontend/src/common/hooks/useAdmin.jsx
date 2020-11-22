import some from "lodash/some";
import { useGammaMe } from "@cthit/react-digit-components";

const authority = "sexit";

function useAdmin() {
    const user = useGammaMe();
    return user != null && some(user.authorities, ["authority", authority]);
}

export default useAdmin;