import actions from "./actions";
import methods from "./methods";

const auth: ApiItem<IAuthActions, IAuthMethods> = {
    actions,
    methods
};

export default auth;