import _ from 'lodash'
import municipality_home from './EN/Municipality/home';
import municipality_menu from './EN/Municipality/tree-menu';

function Municipality() {
    this.municipality = {
        ...municipality_home,
        ...municipality_menu
    };
}

let en = _.assignIn(
    {},
    new Municipality()
);
export default en
