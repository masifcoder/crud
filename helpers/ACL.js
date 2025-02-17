

const EDITOR_ALLOWED_ACTIONS = ['create', 'edit', 'delete'];
const USER_ALLOWED_ACTIONS = ['create', 'edit', 'delete'];
const ADMIN_ALLOWED_ACTIONS = ['create', 'edit', 'delete'];

const canDo = (role, action) => {

    if (role == 'editor' && EDITOR_ALLOWED_ACTIONS.includes(action)) {
        return true;

    } else {
        return false;
    } 

}


module.exports = canDo;