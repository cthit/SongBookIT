import some from "lodash/some";
import { useGammaMe } from "@cthit/react-digit-components";

const authority = "soongbook";

function useAdmin() {
    const user = useGammaMe();
    //const user = null;
    return user != null && some(user.authorities, ["authority", authority]);
}

export default useAdmin;